import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CourseFilterProps {
  onFilterChange: (filters: {
    search: string;
    category: string;
    level: string;
    priceRange: string;
  }) => void;
  categories: string[];
  levels: string[];
}

const CourseFilter: React.FC<CourseFilterProps> = ({ onFilterChange, categories, levels }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLevel, setSelectedLevel] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    onFilterChange({
      search: e.target.value,
      category: selectedCategory,
      level: selectedLevel,
      priceRange: selectedPriceRange,
    });
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    onFilterChange({
      search,
      category: e.target.value,
      level: selectedLevel,
      priceRange: selectedPriceRange,
    });
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLevel(e.target.value);
    onFilterChange({
      search,
      category: selectedCategory,
      level: e.target.value,
      priceRange: selectedPriceRange,
    });
  };

  const handlePriceRangeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPriceRange(e.target.value);
    onFilterChange({
      search,
      category: selectedCategory,
      level: selectedLevel,
      priceRange: selectedPriceRange,
    });
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl">
      <h3 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-6 flex items-center gap-3">
        <SlidersHorizontal size={24} className="text-[#00C896]" /> Filter Courses
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search courses..."
            value={search}
            onChange={handleSearchChange}
            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
          />
        </div>

        {/* Category Filter */}
        <div className="relative">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            // Added bg-gray-800 and text-white for options visibility
            className="block w-full pl-3 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
          >
            <option value="All" className="bg-gray-800 text-white">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat} className="bg-gray-800 text-white">{cat}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>

        {/* Level Filter */}
        <div className="relative">
          <select
            value={selectedLevel}
            onChange={handleLevelChange}
            // Added bg-gray-800 and text-white for options visibility
            className="block w-full pl-3 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
          >
            <option value="All" className="bg-gray-800 text-white">All Levels</option>
            {levels.map(level => (
              <option key={level} value={level} className="bg-gray-800 text-white">{level}</option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>

        {/* Price Range Filter */}
        <div className="relative">
          <select
            value={selectedPriceRange}
            onChange={handlePriceRangeChange}
            // Added bg-gray-800 and text-white for options visibility
            className="block w-full pl-3 pr-10 py-3 border border-gray-700 rounded-xl bg-gray-800 text-white appearance-none focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
          >
            <option value="All" className="bg-gray-800 text-white">All Prices</option>
            <option value="0-1000" className="bg-gray-800 text-white">₹0 - ₹1,000</option>
            <option value="1001-3000" className="bg-gray-800 text-white">₹1,001 - ₹3,000</option>
            <option value="3001-5000" className="bg-gray-800 text-white">₹3,001 - ₹5,000</option>
            <option value="5001+" className="bg-gray-800 text-white">₹5,001+</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
            <ChevronDown size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFilter;
