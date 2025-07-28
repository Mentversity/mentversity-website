import React from 'react';
import { CheckCircle, Info } from 'lucide-react';
import { CourseDetailType } from './CourseData'; // Adjust path as needed

interface KeyFeaturesProps {
  course: CourseDetailType;
}

const KeyFeatures: React.FC<KeyFeaturesProps> = ({ course }) => {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* What You Will Learn */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
          <h3 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <CheckCircle size={24} className="text-[#00C896]" /> What You Will Learn
          </h3>
          <ul className="space-y-4">
            {course.whatYouWillLearn.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-base font-medium">
                <CheckCircle size={20} className="text-[#00FFFF] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Prerequisites */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
          <h3 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-6 flex items-center gap-3">
            <Info size={24} className="text-[#00C896]" /> Prerequisites
          </h3>
          <ul className="space-y-4">
            {course.prerequisites.map((item, index) => (
              <li key={index} className="flex items-start gap-3 text-gray-300 text-base font-medium">
                <Info size={20} className="text-[#A1FFCE] flex-shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default KeyFeatures;
