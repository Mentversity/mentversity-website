import React from 'react';
import { Users } from 'lucide-react';

const CommunityHeader = () => {
  return (
    <div className="text-center py-12 lg:py-16">
      <h1 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
        Join Our <span className="text-[#39FF14]">Community</span>
      </h1>
      <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
        Connect with fellow learners, share knowledge, and grow together on your learning journey.
      </p>
      <div className="mt-8">
        <button
          className="bg-[#39FF14] text-black px-8 py-4 rounded-xl font-bold text-lg
                     transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-neon
                     inline-flex items-center justify-center gap-2"
        >
          <Users size={20} /> Start a Discussion
        </button>
      </div>
    </div>
  );
};

export default CommunityHeader;
