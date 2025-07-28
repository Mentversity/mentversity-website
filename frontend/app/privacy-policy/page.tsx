import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const PrivacyPolicy = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] text-gray-300 font-['Inter',_sans-serif]">
      <Navbar />

      <main className="flex-grow pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-lg rounded-2xl p-8 lg:p-12 border border-gray-700 shadow-xl">
          <h1 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl font-bold text-white text-center mb-8 leading-tight">
            Privacy <span className="text-[#00C896]">Policy</span>
          </h1>
          <p className="text-center text-gray-400 mb-12">
            Last Updated: July 28, 2025
          </p>

          <section className="space-y-8 text-lg leading-relaxed">
            <p>
              At Mentversity, your privacy matters to us. This page explains how we handle the personal information you share with us when you visit our website, use our platform, or sign up for our courses. We’re committed to being clear and honest about how we collect, use, and protect your data.
            </p>
            <p>
              By using our website at <a href="https://www.mentversity.com" className="text-[#00FFFF] hover:underline">www.mentversity.com</a>, you agree to the practices described in this Privacy Policy.
            </p>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">1. What We Collect</h2>
              <p>We collect different types of information so we can offer you a smooth and personalized experience:</p>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Personal Details</h3>
              <p>When you sign up, join a course, or contact us, we may ask for:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your name and email address</li>
                <li>Phone number</li>
                <li>Payment details (securely handled through Razorpay or similar services)</li>
                <li>Your Google profile photo if you log in via Google</li>
                <li>Any additional info you choose to provide, like feedback or questions</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Activity on Our Platform</h3>
              <p>We also automatically collect some data when you interact with our site:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Which courses you’ve enrolled in and your progress</li>
                <li>Quiz scores and submitted assignments</li>
                <li>Pages you visit and how long you stay on them</li>
                <li>Your device type, browser, IP address, and other technical info</li>
                <li>Search terms or referral links that brought you to our site</li>
              </ul>

              <h3 className="text-xl font-semibold text-white mt-6 mb-2">Conversations with Us</h3>
              <p>We keep records of your chats, emails, and messages sent via forms for support or inquiries.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">2. How We Use Your Information</h2>
              <p>Here’s how we use the data we collect:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>To give you access to our courses and features</li>
                <li>To process payments and send receipts or invoices</li>
                <li>To improve your learning experience and personalize the platform</li>
                <li>To better understand how you use our website and what we can do better</li>
                <li>To create new features, tools, and educational content</li>
                <li>To stay in touch with you regarding support, updates, and promotions</li>
                <li>To send security alerts, reminders, or technical notices</li>
                <li>To identify and prevent fraudulent or suspicious activity</li>
                <li>To comply with legal requirements</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">3. When We Share Your Info</h2>
              <p>We only share your information in specific situations:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>With trusted service providers like payment processors or hosting platforms</li>
                <li>When required by law or legal authorities</li>
                <li>If we’re involved in a company merger or acquisition</li>
                <li>With your permission, for any other purpose you agree to</li>
                <li>With our affiliated companies that follow this same Privacy Policy</li>
              </ul>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">4. How We Keep Your Data Safe</h2>
              <p>We use standard security practices to protect your data. While no system is completely foolproof, we work hard to prevent unauthorized access, hacking, or loss of your personal information.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">5. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>View the personal data we’ve collected about you</li>
                <li>Ask us to correct or update inaccurate information</li>
                <li>Request that we delete your data, in some cases</li>
                <li>Restrict how we use or share your data</li>
                <li>Object to certain uses of your data</li>
                <li>Ask us to send your data to another service provider</li>
              </ul>
              <p className="mt-4">To exercise these rights, get in touch with us using the contact details at the bottom of this page.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">6. Cookies and Tracking</h2>
              <p>We use cookies and similar tools to understand how you use our site and improve your experience. You can choose to disable cookies in your browser settings, but some features may not work properly if you do.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">7. External Links</h2>
              <p>Our site may link to other websites we don’t control. We’re not responsible for how those sites handle your data, so make sure to check their privacy policies before sharing anything.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">8. Children’s Privacy</h2>
              <p>We don’t knowingly collect personal data from anyone under the age of 13. If you believe we have accidentally gathered information about a child, please contact us right away and we’ll remove it.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">9. Updates to This Policy</h2>
              <p>We may make changes to this Privacy Policy over time. If we do, we’ll post the updated version here and update the "Last Updated" date. We recommend checking this page occasionally to stay informed.</p>
            </div>

            <div>
              <h2 className="font-['Poppins',_sans-serif] text-3xl font-semibold text-[#00FFFF] mb-4">10. Contact Us</h2>
              <p>If you have any questions, concerns, or feedback about this Privacy Policy, reach out to us:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email: <a href="mailto:info@mentversity.com" className="text-[#00FFFF] hover:underline">info@mentversity.com</a></li>
                <li>Contact page: <a href="https://www.mentversity.com/connect-with-us" className="text-[#00FFFF] hover:underline">www.mentversity.com/connect-with-us</a></li>
              </ul>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
