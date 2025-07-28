"use client"
import React from 'react';

// Define the animation keyframes within a <style> tag or a global CSS file
// For this example, we'll embed it for simplicity.
// In a real project, consider adding this to your global.css or tailwind.config.js
// for better maintainability.
const MarqueeStyles = () => (
  <style jsx>{`
    @keyframes scroll-left {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    @keyframes scroll-right {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(0%);
      }
    }

    .animate-scroll-left {
      animation: scroll-left var(--scroll-duration) linear infinite;
    }

    .animate-scroll-right {
      animation: scroll-right var(--scroll-duration) linear infinite;
    }

    /* Pause on hover effect */
    .marquee-container:hover .animate-scroll-left,
    .marquee-container:hover .animate-scroll-right {
      animation-play-state: paused;
    }
  `}</style>
);

const Trust = () => {
  // IMPORTANT:
  // 1. You MUST find and download the official SVG or PNG logos for these companies.
  //    Search their official websites (e.g., "Razorpay press kit", "Nykaa brand assets").
  // 2. Place the downloaded logo files in your public/logos/ directory.
  // 3. Update the logoUrl paths below to match the actual file names and extensions.
  const partners = [
    { name: "Razorpay", logoUrl: "/logos/razorpay.svg" },
    { name: "CRED", logoUrl: "/logos/cred.svg" },
    { name: "Meesho", logoUrl: "/logos/meesho.svg" },
    { name: "PhonePe", logoUrl: "/logos/phonepe.svg" },
    { name: "Nykaa", logoUrl: "/logos/nykaa.svg" },
    { name: "Byju's", logoUrl: "/logos/byjus.svg" }, // Still good to include major EdTech
    { name: "Groww", logoUrl: "/logos/groww.svg" },
    { name: "Delhivery", logoUrl: "/logos/delhivery.svg" },
  ];

  // Duplicate partners for a seamless infinite scroll effect
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-0 bg-[#0B132B] font-['Inter',_sans-serif] overflow-hidden">
      <MarqueeStyles /> {/* Inject the CSS for marquee animation */}
      <div className="max-w-7xl mx-auto text-center mb-16 lg:mb-24">
        <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
          Trusted by students who now work at leading organizations like:
        </p>
      </div>

      {/* Marquee Container */}
      <div
        className="relative flex overflow-x-hidden py-8 // Increased padding for visibility
                   marquee-container" // Class to apply hover pause
        style={{ '--scroll-duration': '60s' }} // Custom property for animation duration
      >
        <div className="flex whitespace-nowrap animate-scroll-left">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={index}
              className="mx-6 lg:mx-8 // Increased spacing between logos
                         bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-md
                         flex flex-col items-center justify-center w-[150px] h-[100px] // Fixed size for consistency
                         flex-shrink-0 // Prevent items from shrinking
                         transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-lg group"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} Logo`}
                  className="max-w-full max-h-full object-contain filter grayscale opacity-70
                              group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
              <p className="text-white text-sm font-semibold text-center group-hover:text-[#39FF14] transition-colors duration-300">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
        {/* We duplicate the content to ensure a seamless loop.
            This second div effectively scrolls in as the first one scrolls out. */}
        <div className="flex whitespace-nowrap animate-scroll-left absolute top-0 left-full">
          {duplicatedPartners.map((partner, index) => (
            <div
              key={`duplicate-${index}`} // Use a different key for duplicates
              className="mx-6 lg:mx-8
                         bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-gray-700 shadow-md
                         flex flex-col items-center justify-center w-[150px] h-[100px]
                         flex-shrink-0
                         transition-all duration-300 ease-in-out hover:scale-[1.05] hover:shadow-lg group"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-2">
                <img
                  src={partner.logoUrl}
                  alt={`${partner.name} Logo`}
                  className="max-w-full max-h-full object-contain filter grayscale opacity-70
                              group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
              <p className="text-white text-sm font-semibold text-center group-hover:text-[#39FF14] transition-colors duration-300">
                {partner.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;