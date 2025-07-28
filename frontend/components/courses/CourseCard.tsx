import React from 'react';
import Link from 'next/link';
import { Star, DollarSign, Clock, BookOpen, TrendingUp, IndianRupee } from 'lucide-react';
import { CourseType } from '../../data/courses'; // Adjust path as needed

interface CourseCardProps {
  course: CourseType;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl
                    transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl flex flex-col h-full relative overflow-hidden"> {/* Added relative and overflow-hidden for badge positioning */}
      <img
        src={course.image}
        alt={course.title}
        className="w-full h-48 object-cover rounded-xl mb-4 border border-gray-600"
      />
      
      {/* Updated 60% OFF Circular Star Badge */}
      <div className="absolute top-4 right-4 bg-[#FF4C4C] text-white w-20 h-20 rounded-full flex flex-col items-center justify-center z-10 shadow-lg border-2 border-white transform rotate-6">
        <Star size={24} className="text-white fill-current mb-1" /> {/* Star icon */}
        <span className="text-sm font-bold">60% OFF</span>
      </div>

      <div className="flex justify-between items-center mb-2">
        <span className="bg-[#39FF14]/20 text-[#00C896] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
          {course.category}
        </span>
        {course.isPopular && (
          <span className="bg-[#E4FF1A]/20 text-[#E4FF1A] text-xs font-bold px-3 py-1 rounded-full">
            Popular
          </span>
        )}
      </div>
      <h3 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-2 leading-snug flex-grow">
        {course.title}
      </h3>

      <div className="flex items-center justify-between text-gray-300 text-sm mb-4">
        <div className="flex items-center gap-1">
          <Star size={16} className="text-[#E4FF1A] fill-current" />
          <span>{course.rating} ({course.reviews})</span>
        </div>
        <div className="flex items-center gap-1">
          <Clock size={16} className="text-[#00FFFF]" />
          <span>{course.duration}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-baseline gap-2"> {/* Adjusted gap for prices */}
          {/* Original Price (Strikethrough) */}
          {course.originalPrice && course.originalPrice > course.price && (
            <div className="flex items-center gap-1 text-gray-400 line-through text-lg">
              <IndianRupee size={16} />
              <span>{course.originalPrice.toLocaleString('en-IN')}</span>
            </div>
          )}
          {/* Offer Price */}
          <div className="flex items-baseline gap-1">
            <IndianRupee size={20} className="text-[#00C896]" />
            <span className="font-['Sora',_sans-serif] text-2xl font-bold text-[#00C896]">
              {course.price.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
        <span className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
          {course.level}
        </span>
      </div>

      <Link
        href={`/best-courses/${course.slug}`} // Example link to a course detail page
        className="w-full bg-[#00C896] text-black font-bold text-lg py-3 px-4 rounded-xl text-center
                   transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon
                   flex items-center justify-center gap-2"
      >
        Enroll Now <BookOpen size={20} />
      </Link>
    </div>
  );
};

export default CourseCard;
 