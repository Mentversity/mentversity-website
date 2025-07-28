import React from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactInfo = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {/* Email Card */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
        <div className="p-3 rounded-full bg-[#00FFFF]/20 border border-[#00FFFF]/50 mb-4"> {/* Accent Aqua */}
          <Mail size={28} className="text-[#00FFFF]" />
        </div>
        <h4 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-2">Email Us</h4>
        <p className="text-gray-300 text-base font-medium mb-2">We're here to help!</p>
        <a href="mailto:contact@mentversity.com" className="text-[#00C896] hover:text-[#E4FF1A] font-semibold transition-colors duration-200">
          contact@mentversity.com
        </a>
      </div>

      {/* Phone Card */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
        <div className="p-3 rounded-full bg-[#00C896]/20 border border-[#00C896]/50 mb-4"> {/* Primary Green */}
          <Phone size={28} className="text-[#00C896]" />
        </div>
        <h4 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-2">Call Us</h4>
        <p className="text-gray-300 text-base font-medium mb-2">Mon-Fri, 9 AM - 5 PM IST</p>
        <a href="tel:+918657983413" className="text-[#00C896] hover:text-[#E4FF1A] font-semibold transition-colors duration-200">
          +91 8657983413
        </a>
      </div>

      {/* Address Card */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
        <div className="p-3 rounded-full bg-[#E4FF1A]/20 border border-[#E4FF1A]/50 mb-4"> {/* Accent Yellow */}
          <MapPin size={28} className="text-[#E4FF1A]" />
        </div>
        <h4 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-2">Visit Us</h4>
        <p className="text-gray-300 text-base font-medium mb-2">Our main office location</p>
        <p className="text-[#00C896] font-semibold text-center text-base">
          Mumbai<br/> Maharashtra, India
        </p>
      </div>

      {/* Working Hours Card (Example) */}
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md flex flex-col items-center text-center transition-all duration-300 ease-in-out hover:scale-[1.02]">
        <div className="p-3 rounded-full bg-[#A1FFCE]/20 border border-[#A1FFCE]/50 mb-4"> {/* Secondary Lime */}
          <Clock size={28} className="text-[#A1FFCE]" />
        </div>
        <h4 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-2">Working Hours</h4>
        <p className="text-gray-300 text-base font-medium mb-2">Dedicated support available</p>
        <p className="text-[#00C896] font-semibold text-base">
          Monday - Friday: 9 AM - 6 PM IST <br/>
          Saturday: 10 AM - 2 PM IST
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
