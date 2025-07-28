import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 lg:p-10 border border-gray-700 shadow-xl text-center">
      <h3 className="font-['Poppins',_sans-serif] text-xl sm:text-2xl font-semibold text-white mb-8">Follow Us</h3> {/* Added responsive text size */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-6"> {/* Changed space-x-6 to responsive gap-x and flex-wrap */}
        <Link
          href="#"
          className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                     bg-white/5 p-3 sm:p-4 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm
                     transition-all duration-300 ease-in-out hover:scale-[1.1]" // Adjusted padding for smaller screens
          aria-label="Facebook"
        >
          <Facebook size={24} />
        </Link>
        <Link
          href="#"
          className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                     bg-white/5 p-3 sm:p-4 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm
                     transition-all duration-300 ease-in-out hover:scale-[1.1]"
          aria-label="Twitter"
        >
          <Twitter size={24} />
        </Link>
        <Link
          href="#"
          className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                     bg-white/5 p-3 sm:p-4 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm
                     transition-all duration-300 ease-in-out hover:scale-[1.1]"
          aria-label="LinkedIn"
        >
          <Linkedin size={24} />
        </Link>
        <Link
          href="#"
          className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                     bg-white/5 p-3 sm:p-4 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm
                     transition-all duration-300 ease-in-out hover:scale-[1.1]"
          aria-label="Instagram"
        >
          <Instagram size={24} />
        </Link>
        <Link
          href="#"
          className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                     bg-white/5 p-3 sm:p-4 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm
                     transition-all duration-300 ease-in-out hover:scale-[1.1]"
          aria-label="YouTube"
        >
          <Youtube size={24} />
        </Link>
      </div>
    </div>
  );
};

export default SocialLinks;
