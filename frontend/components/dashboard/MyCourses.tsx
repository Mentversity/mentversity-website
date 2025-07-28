'use client'

import React from 'react';
import Link from 'next/link';
import { BookOpen, PlayCircle, Clock, Award } from 'lucide-react';

// Mock data for enrolled courses (replace with API call later)
const MOCK_ENROLLED_COURSES = [
  {
    id: 'web-dev-mastery',
    title: 'Web Development Mastery',
    category: 'Development',
    progress: 75,
    instructor: 'Jane Doe',
    thumbnail: 'https://placehold.co/400x250/0B132B/00C896?text=Web+Dev',
    link: '/courses/web-dev-mastery', // Link to actual course detail page
    lastAccessed: '2025-07-20T10:00:00Z',
  },
  {
    id: 'data-science-pro',
    title: 'Data Science Professional',
    category: 'Data Science',
    progress: 40,
    instructor: 'John Smith',
    thumbnail: 'https://placehold.co/400x250/0B132B/00FFFF?text=Data+Science',
    link: '/courses/data-science-pro',
    lastAccessed: '2025-07-18T14:30:00Z',
  },
  {
    id: 'ux-ui-design',
    title: 'UX/UI Design Fundamentals',
    category: 'Design',
    progress: 90,
    instructor: 'Alice Johnson',
    thumbnail: 'https://placehold.co/400x250/0B132B/FACC15?text=UX/UI',
    link: '/courses/ux-ui-design',
    lastAccessed: '2025-07-22T09:15:00Z',
  },
];

const MyCourses = ({ user }) => {
  // In a real application, you would fetch user's enrolled courses from your backend
  // using user.id and potentially a dedicated API endpoint like /api/users/{userId}/courses
  const enrolledCourses = MOCK_ENROLLED_COURSES; // Using mock data for now

  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="space-y-8">
      <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
        My Enrolled Courses
      </h2>

      {enrolledCourses.length === 0 ? (
        <div className="text-center py-10 bg-white/5 rounded-xl border border-gray-700">
          <p className="text-gray-300 text-lg mb-4">You haven't enrolled in any courses yet.</p>
          <Link
            href="/courses"
            className="bg-[#00C896] text-black px-6 py-2 rounded-xl font-bold text-md
                       transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#00C896]/30"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {enrolledCourses.map((course) => (
            <div
              key={course.id}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl
                         transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon-sm"
            >
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-40 object-cover rounded-xl mb-4 border border-gray-600"
              />
              <h3 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-2">{course.title}</h3>
              <p className="text-gray-400 text-sm mb-4">Instructor: {course.instructor}</p>

              {/* Progress Bar */}
              <div className="mb-4">
                <div className="flex justify-between items-center text-gray-300 text-sm mb-1">
                  <span>Progress</span>
                  <span className="font-semibold text-[#00C896]">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-[#00C896] h-full rounded-full"
                    style={{ width: `${course.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                <div className="flex items-center gap-1">
                  <Clock size={16} />
                  <span>Last Accessed: {formatDate(course.lastAccessed)}</span>
                </div>
              </div>

              <Link
                href={course.link}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#00FFFF]/10 border border-[#00FFFF] text-[#00FFFF] font-bold py-2 px-4 rounded-xl
                           transition-all duration-300 ease-in-out hover:bg-[#00FFFF]/20 hover:shadow-lg hover:shadow-[#00FFFF]/30"
              >
                <PlayCircle size={20} /> Continue Learning
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
