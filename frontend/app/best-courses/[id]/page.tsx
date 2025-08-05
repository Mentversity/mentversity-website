'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CourseHero from '@/components/courseDetail/CourseHero';
import KeyFeatures from '@/components/courseDetail/KeyFeatures';
import CourseSyllabus from '@/components/courseDetail/CourseSyllabus';
import { ALL_COURSES, CourseDetailType } from '@/data/courses';
import PromocodeModal from '@/components/PromocodeModal';
import { BookOpen, ChevronLeft, Loader2 } from 'lucide-react';

const CourseDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ type: string; message: string } | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(true);

  // ---- Promocode Modal State ----
  const [promoModalOpen, setPromoModalOpen] = useState(false);
  const [finalCoursePrice, setFinalCoursePrice] = useState<number | null>(null);
  const [appliedCode, setAppliedCode] = useState<string | null>(null);

  const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}`;

  // Load Razorpay script dynamically and check login status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setNotLoggedIn(!token);
    };

    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => {
        setRazorpayScriptLoaded(true);
        console.log('Razorpay SDK loaded.');
      };
      script.onerror = () => {
        console.error('Failed to load Razorpay SDK');
        setRazorpayScriptLoaded(false);
        setPaymentStatus({ type: 'error', message: 'Payment gateway could not be loaded. Please try again later.' });
      };
      document.body.appendChild(script);

      return () => {
        if (document.body.contains(script)) {
          document.body.removeChild(script);
        }
      };
    };

    checkLoginStatus();
    const cleanupRazorpay = loadRazorpayScript();

    return () => {
      cleanupRazorpay();
    };
  }, []);

  // Fetch course data
  useEffect(() => {
    if (id) {
      const foundCourse = ALL_COURSES.find(c => c.slug === id);
      setCourse(foundCourse || null);
      setLoadingCourse(false);
    } else {
      setLoadingCourse(false);
    }
  }, [id]);

  // Modal apply callback
  const handlePromoApply = (discountedPrice: number, code: string | null) => {
    setFinalCoursePrice(discountedPrice);
    setAppliedCode(code);
    setPromoModalOpen(false);
  };

  // ---- ENROLL & PAYMENT HANDLING ----
  const handleEnrollNow = () => {
    if (notLoggedIn) {
      setPaymentStatus({ type: 'error', message: 'Please log in or sign up to enroll in this course.' });
      router.push('/login');
      return;
    }
    // Open promocode modal
    setPromoModalOpen(true);
    setPaymentStatus(null);
    setFinalCoursePrice(null); // reset applied code and price before use
    setAppliedCode(null);
  };

  const handleProceedToPayment = async () => {
    if (!razorpayScriptLoaded || !course) {
      setPaymentStatus({ type: 'error', message: 'Payment system not ready or course data missing.' });
      return;
    }

    setPaymentProcessing(true);
    setPaymentStatus(null);

    const token = localStorage.getItem('token');
    if (!token) {
      setPaymentStatus({ type: 'error', message: 'Authentication required. Please log in.' });
      setPaymentProcessing(false);
      router.push('/login');
      return;
    }

    // --- FINAL PAYMENT AMOUNT & CODE ---
    const amountToPay = finalCoursePrice != null ? finalCoursePrice : course.price;

    try {
      // Step 1: Create an order on your backend
      const orderResponse = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.title,
          amount: amountToPay, // Amount in rupees
          promocode: appliedCode || null,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        throw new Error(orderData.message || `Failed to create order on backend. Status: ${orderResponse.status}`);
      }

      const { orderId, amount, currency, key, order: backendOrder } = orderData.data;

      // Step 2: Open Razorpay checkout modal
      const options = {
        key: key,
        amount: amount, // paise
        currency: currency,
        name: 'Mentversity',
        description: `Enrollment for ${course.title}`,
        image: '/logo1.png',
        order_id: orderId,
        handler: async function (response: any) {
          // Step 3: Verify payment on your backend
          try {
            const verifyResponse = await fetch(`${BACKEND_URL}/api/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            });

            const verifyData = await verifyResponse.json();

            if (verifyResponse.ok) {
              setPaymentStatus({ type: 'success', message: 'Payment successful! Redirecting to your course dashboard...' });
              setTimeout(() => router.push('/dashboard'), 2000);
            } else {
              throw new Error(verifyData.message || 'Payment verification failed on backend.');
            }
          } catch (verifyError: any) {
            setPaymentStatus({ type: 'error', message: `Payment successful but verification failed: ${verifyError.message}. Please contact support.` });
          }
        },
        prefill: {
          name: '',
          email: '',
          contact: '',
        },
        notes: {
          courseId: course.id,
          courseTitle: course.title,
          userId: backendOrder.user,
          promocode: appliedCode || "", // Pass applied promocode if any
        },
        theme: {
          color: '#00C896',
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        setPaymentStatus({ type: 'error', message: `Payment failed: ${response.error.description || 'Unknown error'}. Please try again.` });
      });
      rzp1.open();
    } catch (error: any) {
      setPaymentStatus({ type: 'error', message: error.message || 'An unexpected error occurred during payment.' });
    } finally {
      setPaymentProcessing(false);
    }
  };

  if (loadingCourse) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center text-white text-2xl font-['Inter',_sans-serif]">
        <Loader2 className="animate-spin mr-3" size={28} /> Loading course details...
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center text-white text-2xl font-['Inter',_sans-serif] px-4 text-center">
        <h2 className="font-['Sora',_sans-serif] text-4xl font-bold text-[#00C896] mb-4">Course Not Found</h2>
        <p className="text-gray-300 text-lg mb-8">The course you are looking for does not exist or has been removed.</p>
        <Link
          href="/courses"
          className="bg-[#00C896] text-black px-8 py-3 rounded-xl font-bold text-lg
                     transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#00C896]/30"
        >
          Browse All Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar />
      <PromocodeModal
        open={promoModalOpen}
        onClose={() => setPromoModalOpen(false)}
        coursePrice={course.price}
        onApply={handlePromoApply}
      />

      <main className="flex-grow pt-[70px] lg:pt-[90px]">
        <CourseHero course={course} />

        {/* Call to Action section */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B132B]">
          <div className="max-w-4xl mx-auto text-center bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
            <h2 className="font-['Sora',_sans-serif] text-3xl sm:text-4xl font-bold text-white mb-6">
              Ready to <span className="text-[#00C896]">Start Learning</span>?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Enroll in the {course.title} today and transform your career!
            </p>
            {paymentStatus && (
              <div className={`p-4 rounded-lg text-sm mb-4 ${
                paymentStatus.type === 'success' ? 'bg-green-500/20 text-green-300 border border-green-500' : 'bg-red-500/20 text-red-300 border border-red-500'
              }`}>
                {paymentStatus.message}
              </div>
            )}
            {/* Show button flows */}
            {/* After promocode modal, show proceed-to-payment with final price */}
            {finalCoursePrice !== null ? (
              <button
                onClick={handleProceedToPayment}
                disabled={paymentProcessing}
                className="bg-[#00C896] text-black px-10 py-4 rounded-xl font-bold text-lg
                          transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#00C896]/30
                          inline-flex items-center justify-center gap-2
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </>
                ) : (
                  <>
                    Proceed to Payment for ₹{finalCoursePrice.toLocaleString('en-IN')} <BookOpen size={20} />
                  </>
                )}
              </button>
            ) : (
              <button
                onClick={handleEnrollNow}
                disabled={!razorpayScriptLoaded || paymentProcessing || notLoggedIn}
                className="bg-[#00C896] text-black px-10 py-4 rounded-xl font-bold text-lg
                          transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#00C896]/30
                          inline-flex items-center justify-center gap-2
                          disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paymentProcessing ? (
                  <>
                    <Loader2 className="animate-spin" size={20} /> Processing...
                  </>
                ) : notLoggedIn ? (
                  <>
                    Login to Enroll <BookOpen size={20} />
                  </>
                ) : (
                  <>
                    Enroll Now for ₹{course.price.toLocaleString('en-IN')} <BookOpen size={20} />
                  </>
                )}
              </button>
            )}
          </div>
        </section>

        {/* Course Description */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B132B]">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl mb-16">
              <h2 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-6">Course Overview</h2>
              <p className="text-gray-300 text-base leading-relaxed">
                {course.longDescription}
              </p>
            </div>
          </div>
        </section>

        <KeyFeatures course={course} />
        <CourseSyllabus course={course} />
      </main>
      <Footer />
    </div>
  );
};

export default CourseDetailPage;
