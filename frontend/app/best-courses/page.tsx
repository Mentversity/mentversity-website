'use client'

import React, { useState, useMemo } from 'react';
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import Footer from '@/components/Footer'; // Adjust path if necessary
import CourseFilter from '@/components/courses/CourseFilter';
import CourseList from '@/components/courses/CourseList';
import { ALL_COURSES, CourseType } from '../../data/courses'; // Adjust path as needed

const Courses = () => {
  const [filters, setFilters] = useState({
    search: '',
    category: 'All',
    level: 'All',
    priceRange: 'All',
  });

  // Extract unique categories and levels from ALL_COURSES
  const categories = useMemo(() => {
    const uniqueCategories = new Set(ALL_COURSES.map(course => course.category));
    return Array.from(uniqueCategories);
  }, []);

  const levels = useMemo(() => {
    const uniqueLevels = new Set(ALL_COURSES.map(course => course.level));
    return Array.from(uniqueLevels);
  }, []);

  const filteredCourses = useMemo(() => {
    return ALL_COURSES.filter(course => {
      // Filter by search term
      const matchesSearch = course.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                            course.instructor.toLowerCase().includes(filters.search.toLowerCase()) ||
                            course.description.toLowerCase().includes(filters.search.toLowerCase());

      // Filter by category
      const matchesCategory = filters.category === 'All' || course.category === filters.category;

      // Filter by level
      const matchesLevel = filters.level === 'All' || course.level === filters.level;

      // Filter by price range
      const matchesPriceRange = (() => {
        if (filters.priceRange === 'All') return true;
        const [minStr, maxStr] = filters.priceRange.split('-');
        const minPrice = parseInt(minStr.replace('₹', '').replace(',', ''));
        if (maxStr === '+') {
          return course.price >= minPrice;
        }
        const maxPrice = parseInt(maxStr.replace('₹', '').replace(',', ''));
        return course.price >= minPrice && course.price <= maxPrice;
      })();

      return matchesSearch && matchesCategory && matchesLevel && matchesPriceRange;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar /> {/* Global Navbar */}

      <main className="flex-grow py-12 pt-28 lg:py-20 lg:pt-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-12 lg:space-y-16">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tighter mb-4">
              Explore Our <span className="text-[#00C896]">Courses</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
              Discover a wide range of career-driven certification courses designed to boost your skills.
            </p>
          </div>

          {/* Course Filters */}
          <CourseFilter
            onFilterChange={handleFilterChange}
            categories={categories}
            levels={levels}
          />

          {/* Course List */}
          <CourseList courses={filteredCourses} />
        </div>
      </main>

      <Footer /> {/* Global Footer */}
    </div>
  );
};

export default Courses;
