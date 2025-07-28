'use client'

import React, { useState } from 'react';
import { Book, ChevronDown, ChevronUp } from 'lucide-react';
import { CourseDetailType } from './CourseData'; // Adjust path as needed

interface CourseSyllabusProps {
  course: CourseDetailType;
}

const CourseSyllabus: React.FC<CourseSyllabusProps> = ({ course }) => {
  const [openModule, setOpenModule] = useState<number | null>(0); // Open first module by default

  const toggleModule = (index: number) => {
    setOpenModule(openModule === index ? null : index);
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="font-['Sora',_sans-serif] text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tighter mb-4">
            Detailed <span className="text-[#00C896]">Syllabus</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-medium">
            A comprehensive breakdown of what you'll learn in each module.
          </p>
        </div>

        <div className="space-y-4">
          {course.syllabus.map((module, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 shadow-md overflow-hidden
                         transition-all duration-300 ease-in-out"
            >
              <button
                className="flex justify-between items-center w-full p-6 text-left focus:outline-none
                           bg-white/10 hover:bg-white/15 transition-colors duration-200 rounded-t-xl"
                onClick={() => toggleModule(index)}
              >
                <div className="flex items-center gap-4">
                  <Book size={24} className="text-[#00FFFF] flex-shrink-0" />
                  <span className="font-['Poppins',_sans-serif] text-xl font-semibold text-white">
                    {module.module}
                  </span>
                </div>
                {openModule === index ? (
                  <ChevronUp size={24} className="text-gray-300" />
                ) : (
                  <ChevronDown size={24} className="text-gray-300" />
                )}
              </button>

              {openModule === index && (
                <div className="p-6 pt-4 border-t border-gray-800">
                  <ul className="space-y-3">
                    {module.topics.map((topic, topicIndex) => (
                      <li key={topicIndex} className="flex items-start gap-3 text-gray-300 text-base font-medium">
                        <span className="text-[#00C896] flex-shrink-0">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSyllabus;
