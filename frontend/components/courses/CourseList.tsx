import React from 'react';
import CourseCard from './CourseCard';
import { CourseType } from '../../data/courses'; // Adjust path as needed

interface CourseListProps {
  courses: CourseType[];
}

const CourseList: React.FC<CourseListProps> = ({ courses }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-300 text-xl font-medium">No courses found matching your criteria.</p>
        <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export default CourseList;
