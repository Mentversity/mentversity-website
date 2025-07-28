import React from 'react';
import Link from 'next/link';
import { User, Linkedin, Twitter, Globe } from 'lucide-react';
import { CourseDetailType } from './CourseData'; // Adjust path as needed

interface TrainerInfoProps {
  instructor: CourseDetailType['instructor'];
}

const TrainerInfo: React.FC<TrainerInfoProps> = ({ instructor }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['Sora',_sans-serif] text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tighter mb-4">
            Meet Your <span className="text-[#39FF14]">Instructor</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            Learn from industry experts with real-world experience.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl flex flex-col md:flex-row items-center md:items-start gap-8">
          <div className="flex-shrink-0">
            <img
              src={instructor.image}
              alt={instructor.name}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-[#39FF14] shadow-lg"
            />
          </div>
          <div className="text-center md:text-left flex-grow">
            <h3 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-2">{instructor.name}</h3>
            <p className="text-gray-300 text-lg font-medium mb-4">{instructor.title}</p>
            <p className="text-gray-400 text-base leading-relaxed mb-6">
              {instructor.bio}
            </p>
            <div className="flex justify-center md:justify-start space-x-4">
              {instructor.linkedin && (
                <Link
                  href={instructor.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-200"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={28} />
                </Link>
              )}
              {instructor.twitter && (
                <Link
                  href={instructor.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-200"
                  aria-label="Twitter Profile"
                >
                  <Twitter size={28} />
                </Link>
              )}
              {instructor.website && (
                <Link
                  href={instructor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-200"
                  aria-label="Personal Website"
                >
                  <Globe size={28} />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrainerInfo;
