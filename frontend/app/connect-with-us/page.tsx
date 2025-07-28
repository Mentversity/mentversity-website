'use client'

import React from 'react';
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import Footer from '@/components/Footer'; // Adjust path if necessary
import ContactForm from '@/components/connectWithUs/ContactForm';
import ContactInfo from '@/components/connectWithUs/ContactInfo';
import SocialLinks from '@/components/connectWithUs/SocialLinks';

const ConnectWithUs = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar /> {/* Global Navbar */}

      <main className="flex-grow py-12 pt-28 lg:py-20 lg:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              Connect With <span className="text-[#00C896]">Mentversity</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
              Have questions or need support? Reach out to us through any of the channels below.
            </p>
          </div>

          {/* Contact Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left Column: Contact Form */}
            <ContactForm />

            {/* Right Column: Contact Info & Social Links */}
            <div className="space-y-12"> {/* Space between info and social */}
              <ContactInfo />
              <SocialLinks />
            </div>
          </div>
        </div>
      </main>

      <Footer /> {/* Global Footer */}
    </div>
  );
};

export default ConnectWithUs;
