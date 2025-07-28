
import React from 'react';
import Link from 'next/link';
import { Trophy, Quote } from 'lucide-react';
import { SuccessStory } from './CommunityData'; // Adjust path as needed

interface FeaturedSuccessStoryProps {
  story: SuccessStory;
}

const FeaturedSuccessStory: React.FC<FeaturedSuccessStoryProps> = ({ story }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl text-center">
      <h3 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-6 flex items-center justify-center gap-3">
        <Trophy size={24} className="text-[#E4FF1A]" /> Success Story
      </h3>
      <img
        src={story.author.image}
        alt={story.author.name}
        className="w-24 h-24 rounded-full object-cover border-4 border-[#39FF14] mx-auto mb-4 shadow-lg"
      />
      <h4 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-1">{story.author.name}</h4>
      <p className="text-gray-400 text-sm mb-4">Completed: {story.author.courseCompleted}</p>
      <div className="relative p-4 bg-white/10 rounded-xl border border-gray-800 mb-6">
        <Quote size={32} className="text-gray-600 absolute top-2 left-2 opacity-50" />
        <p className="text-gray-300 text-base italic leading-relaxed">"{story.quote}"</p>
        <Quote size={32} className="text-gray-600 absolute bottom-2 right-2 rotate-180 opacity-50" />
      </div>
      <Link
        href={story.link}
        className="bg-white/5 border border-white text-white px-6 py-3 rounded-xl font-semibold text-base
                   transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon hover:border-[#00FFFF]
                   inline-flex items-center justify-center gap-2"
      >
        Read Full Story
      </Link>
    </div>
  );
};

export default FeaturedSuccessStory;
