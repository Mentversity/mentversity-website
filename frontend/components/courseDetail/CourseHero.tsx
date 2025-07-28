import React from 'react';
import Link from 'next/link';
import { Star, DollarSign, Clock, BookOpen, TrendingUp, Users, Award, CalendarDays, ChevronLeft, IndianRupee, IndianRupeeIcon } from 'lucide-react';
import { CourseDetailType } from './CourseData'; // Adjust path as needed

interface CourseHeroProps {
  course: CourseDetailType;
}

const CourseHero: React.FC<CourseHeroProps> = ({ course }) => {
  return (
    <section className="relative bg-[#0B132B] pt-8 pb-16 lg:pt-16 lg:pb-24 font-['Inter',_sans-serif]">
      {/* Background overlay for image */}
      <div className="absolute inset-0 z-0 opacity-20" style={{ backgroundImage: `url(${course.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-[#0B132B] via-[#1E1E1E] to-[#0B132B] opacity-80"></div>

      {/* Back Navigation - Moved here and updated for breadcrumb style */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10"> {/* Ensure z-index is high enough */}
        <Link
          href="/best-courses"
          className="inline-flex items-center text-gray-300 hover:text-[#00C896] transition-colors duration-200
                     bg-white/5 border border-gray-700 hover:border-[#00FFFF] rounded-full px-4 py-2 text-base font-medium
                     shadow-md hover:shadow-neon-sm"
        >
          <ChevronLeft size={20} className="mr-2" /> Courses
        </Link>
        <span className="text-gray-400 mx-2 text-base">/</span>
        <span className="text-white text-base font-semibold">{course.title}</span>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content: Course Details */}
          <div className="text-center lg:text-left">
            <span className="bg-[#39FF14]/20 text-[#00C896] text-sm font-bold px-4 py-1.5 rounded-full uppercase tracking-wide mb-4 inline-block">
              {course.category}
            </span>
            <h1 className="font-['Sora',_sans-serif] text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              {course.title}
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-6 max-w-2xl lg:mx-0 mx-auto font-medium">
              {course.description}
            </p>

            {/* Instructor & Rating */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-8">
              <div className="flex items-center gap-2 bg-white/5 rounded-full px-4 py-2 border border-gray-700">
                <Star size={18} className="text-[#E4FF1A] fill-current" />
                <span className="font-['Sora',_sans-serif] text-lg font-bold text-white">{course.rating}</span>
                <span className="text-gray-400 text-sm">({course.reviews} reviews)</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 mb-8">
              <div className="flex items-center gap-2 text-gray-300">
                <Clock size={20} className="text-[#00FFFF]" />
                <span className="font-medium">{course.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <TrendingUp size={20} className="text-[#00FFFF]" />
                <span className="font-medium">{course.level} Level</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Award size={20} className="text-[#00FFFF]" />
                <span className="font-medium">Certification</span>
              </div>
            </div>

            {/* Price & CTA */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex items-baseline gap-2">
                <IndianRupee size={28} className="text-[#00C896]" />
                <span className="font-['Sora',_sans-serif] text-4xl font-bold text-[#00C896]">
                  {course.price.toLocaleString('en-IN')}
                </span>
                <span className="text-gray-400 text-lg">INR</span>
              </div>
            </div>
          </div>

          {/* Right Content: Course Image / Video Placeholder */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="w-full max-w-lg bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-gray-700 shadow-xl overflow-hidden">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-auto object-cover rounded-xl border border-gray-600 shadow-lg"
              />
              {/* Optional: Play button overlay for video */}
              {/* <div className="absolute inset-0 flex items-center justify-center">
                <button className="bg-white/20 backdrop-blur-sm p-4 rounded-full text-white hover:bg-white/40 transition-colors">
                  <Play size={48} fill="currentColor" />
                </button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CourseHero;
