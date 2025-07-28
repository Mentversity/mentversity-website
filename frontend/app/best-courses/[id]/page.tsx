'use client'

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Import useRouter and useParams
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import Footer from '@/components/Footer'; // Adjust path if necessary
import CourseHero from '@/components/courseDetail/CourseHero';
import KeyFeatures from '@/components/courseDetail/KeyFeatures';
import CourseSyllabus from '@/components/courseDetail/CourseSyllabus';
import TrainerInfo from '@/components/courseDetail/TrainerInfo'; // Keep import, but remove usage
import { ALL_COURSES, CourseDetailType } from '@/data/courses'; // Import ALL_COURSES (adjust path if needed)
import Link from 'next/link';
import { BookOpen, ChevronLeft, Loader2 } from 'lucide-react'; // Import Loader2 for loading state

const CourseDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const { id } = params; // Get the course ID from the URL query
  const [course, setCourse] = useState<CourseDetailType | null>(null);
  const [loadingCourse, setLoadingCourse] = useState(true);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [razorpayScriptLoaded, setRazorpayScriptLoaded] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<{ type: string; message: string } | null>(null);
  const [notLoggedIn, setNotLoggedIn] = useState(true); // New state to track login status

  const BACKEND_URL = 'http://localhost:5000'; // Your backend URL

  // Load Razorpay script dynamically and check login status on mount
  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem('token');
      setNotLoggedIn(!token); // Set notLoggedIn based on token presence
    };

    const loadRazorpayScript = () => {
      const script = document.createElement('script');
      // Corrected script src to remove markdown link formatting
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

    checkLoginStatus(); // Check login status immediately
    const cleanupRazorpay = loadRazorpayScript(); // Load Razorpay script

    return () => {
      cleanupRazorpay(); // Cleanup function for Razorpay script
    };
  }, []); // Empty dependency array means this runs once on mount

  // Fetch course data
  useEffect(() => {
    if (id) {
      const foundCourse = ALL_COURSES.find(c => c.slug === id); // Assuming 'slug' is used for dynamic routing
      setCourse(foundCourse || null);
      setLoadingCourse(false);
    } else {
      setLoadingCourse(false);
    }
  }, [id]);

  // Handle Enroll Now button click
  const handleEnrollNow = async () => {
    // If not logged in, redirect to login page
    if (notLoggedIn) {
      setPaymentStatus({ type: 'error', message: 'Please log in or sign up to enroll in this course.' });
      router.push('/login');
      return;
    }

    if (!razorpayScriptLoaded || !course) {
      setPaymentStatus({ type: 'error', message: 'Payment system not ready or course data missing.' });
      return;
    }

    setPaymentProcessing(true);
    setPaymentStatus(null); // Clear previous status

    const token = localStorage.getItem('token'); // Re-check token for robustness
    if (!token) { // Should ideally be caught by notLoggedIn check, but good for runtime safety
      setPaymentStatus({ type: 'error', message: 'Authentication required. Please log in.' });
      setPaymentProcessing(false);
      router.push('/login');
      return;
    }

    try {
      // Step 1: Create an order on your backend
      const orderResponse = await fetch(`${BACKEND_URL}/api/payments/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Send JWT token
        },
        body: JSON.stringify({
          courseId: course.id,
          courseName: course.title,
          amount: course.price, // Amount in paise
        }),
      });

      const orderData = await orderResponse.json();
      console.log('Order creation response:', orderData);

      if (!orderResponse.ok) {
        console.error("Backend order creation error details:", orderData);
        throw new Error(orderData.message || `Failed to create order on backend. Status: ${orderResponse.status}`);
      }

      const { orderId, amount, currency, key, order: backendOrder } = orderData.data;

      // Step 2: Open Razorpay checkout modal
      const options = {
        key: key, // Your Razorpay Key ID from backend response
        amount: amount, // Amount in paise
        currency: currency,
        name: 'Mentversity',
        description: `Enrollment for ${course.title}`,
        image: '/logo1.png', // Your logo for the checkout modal
        order_id: orderId, // Order ID from your backend
        handler: async function (response: any) {
          // This function is called when the payment is successful on Razorpay's side
          console.log('Razorpay payment successful response:', response);

          // Step 3: Verify payment on your backend
          try {
            const verifyResponse = await fetch(`${BACKEND_URL}/api/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`, // Send JWT token
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
              console.log('Payment verified by backend:', verifyData);
              // Redirect user to dashboard or course content
              setTimeout(() => router.push('/dashboard'), 2000);
            } else {
              throw new Error(verifyData.message || 'Payment verification failed on backend.');
            }
          } catch (verifyError: any) {
            console.error('Payment verification error:', verifyError);
            setPaymentStatus({ type: 'error', message: `Payment successful but verification failed: ${verifyError.message}. Please contact support.` });
          }
        },
        prefill: {
          name: '', // You can fetch user's name from context/state
          email: '', // You can fetch user's email from context/state
          contact: '', // You can fetch user's contact from context/state
        },
        notes: {
          courseId: course.id,
          courseTitle: course.title,
          userId: backendOrder.user, // Pass your internal user ID
        },
        theme: {
          color: '#00C896', // Razorpay checkout theme color
        },
      };

      const rzp1 = new (window as any).Razorpay(options);
      rzp1.on('payment.failed', function (response: any) {
        console.error('Razorpay payment failed:', response.error);
        setPaymentStatus({ type: 'error', message: `Payment failed: ${response.error.description || 'Unknown error'}. Please try again.` });
      });
      rzp1.open();

    } catch (error: any) {
      console.error('Error during payment process:', error);
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
      <Navbar /> {/* Global Navbar */}

      <main className="flex-grow pt-[70px] lg:pt-[90px]"> {/* Adjust padding top to clear fixed navbar */}


        <CourseHero course={course} />
        
        {/* Call to Action section - Moved up */}
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
            <button
              onClick={handleEnrollNow}
              disabled={!razorpayScriptLoaded || paymentProcessing || notLoggedIn} // Disable if not logged in
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
          </div>
        </section>

        {/* Course Description - Now below the Call to Action */}
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

      <Footer /> {/* Global Footer */}
    </div>
  );
};

export default CourseDetailPage;
