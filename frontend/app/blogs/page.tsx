'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown'; // Import ReactMarkdown
import { Search, SlidersHorizontal, ArrowRight, BookOpen, ChevronRight } from 'lucide-react';

// --- BlogListItem Component ---
// This replaces BlogCard and uses a list-style layout with ReactMarkdown.
const BlogListItem = ({ title, subtitle, slug, heroDescription, categories }) => {
  // Ensure the link correctly points to the dynamic page path.
  // Assuming the dynamic page component lives at /blogs/[slug]
  const targetLink = `/blogs/${slug}`; 

  return (
    <div className="border-b border-gray-200 last:border-b-0 py-6">
      <Link
        href={targetLink}
        className="block group transition-all duration-300 p-4 -mx-4 rounded-lg hover:bg-gray-50"
        aria-label={`Read article: ${title}`}
      >
        {/* Categories / Metadata */}
        {categories && categories.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="text-xs font-semibold px-2 py-0.5 bg-[#00C896]/10 text-[#00C896] rounded"
              >
                {category}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-2xl font-bold mb-1 text-gray-900 group-hover:text-[#00C896] transition-colors line-clamp-2">
          {title}
        </h3>
        
        {/* Subtitle */}
        {subtitle && (
          <p className="text-base text-gray-700 font-medium mb-3 line-clamp-1">
            {subtitle}
          </p>
        )}
        
        {/* Description with ReactMarkdown */}
        <div className="prose prose-lg prose-indigo max-w-none text-gray-600 line-clamp-3 mb-4">
          <ReactMarkdown>{heroDescription || "A short description of the blog post content..."}</ReactMarkdown>
        </div>

        {/* Read More Link */}
        <div className="flex items-center text-[#00C896] font-semibold text-sm">
          Continue Reading
          <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </Link>
    </div>
  );
};

// --- Blog Listing Page Component ---
const BlogListingPage = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [categories, setCategories] = useState([]); // List of unique categories

  // Function to fetch blog posts
  useEffect(() => {
    const fetchPages = async () => {
      setLoading(true);
      try {
        // API call to fetch pages list
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages`);
        if (!res.ok) throw new Error('Failed to fetch pages');
        const data = await res.json();
        
        // Prepare data structure for the listing component
        const blogData = data.data.pages.map(p => ({
            id: p._id,
            title: p.title,
            subtitle: p.subtitle,
            slug: p.slug,
            heroDescription: p.heroDescription, // Content for markdown
            categories: p.categories || [],
        }));

        setPages(blogData);

        // Extract and set unique categories
        const allCategories = blogData.flatMap(p => p.categories).filter(Boolean);
        const uniqueCategories = ['All', ...new Set(allCategories)];
        setCategories(uniqueCategories);

      } catch (err) {
        console.error('Error fetching pages:', err);
        setPages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  // Filtered and Searched Posts logic
  const filteredPages = useMemo(() => {
    return pages.filter(page => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      
      const matchesSearch = page.title.toLowerCase().includes(lowerCaseSearchTerm) ||
                            (page.heroDescription && page.heroDescription.toLowerCase().includes(lowerCaseSearchTerm)) ||
                            (page.subtitle && page.subtitle.toLowerCase().includes(lowerCaseSearchTerm));
      
      const matchesCategory = selectedCategory === 'All' || page.categories.includes(selectedCategory);

      return matchesSearch && matchesCategory;
    });
  }, [pages, searchTerm, selectedCategory]);

  // --- Dynamic SEO Meta Tags ---
  const seoTitle = 'All Blogs and Articles | Mentversity';
  const seoDescription = 'Explore all the latest articles, tutorials, and insights on Data Science, AI, and Technology from Mentversity.';
  // IMPORTANT: Ensure the canonical URL points to the correct route for the blog list.
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/blogs`; 

  return (
    <>
      <Head>
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonicalUrl} />
        {/* Add Open Graph and Twitter tags similarly */}
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
        <Navbar />

        {/* Hero Section */}
        <header className="py-20 px-4 md:px-16 bg-white border-b border-gray-100 shadow-inner">
          <div className="max-w-7xl mx-auto text-center">
            <BookOpen size={64} className="mx-auto text-[#00C896] mb-4" />
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 text-gray-900 leading-tight">
              Mentversity Blog
            </h1>
            <h2 className="text-2xl md:text-3xl text-[#00C896] font-medium mb-8">
              Articles & Tutorials on Data Science and AI
            </h2>
            <p className="text-xl max-w-5xl mx-auto text-gray-600 font-light">
              Deep dive into the latest technologies, trends, and career advice in the world of data.
            </p>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 md:px-8 pb-20 mt-12">
          
          {/* Search and Filter Bar */}
          <div className="mb-10 p-6 bg-white rounded-xl shadow-lg border border-gray-100 flex flex-col md:flex-row gap-6 items-center">
            
            {/* Search Input */}
            <div className="relative w-full md:w-2/3">
              <input
                type="text"
                placeholder="Search articles by title, description, or subtitle..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-4 focus:ring-[#00C896]/50 focus:border-[#00C896] transition duration-200 text-lg"
              />
              <Search size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {/* Category Filter */}
            <div className="relative w-full md:w-1/3">
              <SlidersHorizontal size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 z-10 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:ring-4 focus:ring-[#00C896]/50 focus:border-[#00C896] transition duration-200 text-lg cursor-pointer"
              >
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              <ChevronRight size={16} className="absolute right-4 top-1/2 transform -translate-y-1/2 rotate-90 text-gray-400 pointer-events-none" />
            </div>

          </div>

          {/* Blog List Container */}
          {loading ? (
            <div className="min-h-[40vh] flex flex-col items-center justify-center bg-white p-10 rounded-xl shadow-lg">
              <svg
                className="animate-spin h-8 w-8 text-[#00C896]"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
              <p className="mt-4 text-lg">Fetching latest articles...</p>
            </div>
          ) : filteredPages.length > 0 ? (
            // Changed from a grid to a simple div for list structure
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 divide-y divide-gray-100">
              {filteredPages.map(page => (
                // Use the new BlogListItem component
                <BlogListItem key={page.id} {...page} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white p-10 rounded-xl shadow-lg">
              <h3 className="text-2xl font-semibold mb-3">No Articles Found 😔</h3>
              <p className="text-gray-600">
                Try adjusting your search query or filter settings.
              </p>
            </div>
          )}

        </main>

        <Footer />
      </div>
    </>
  );
};

export default BlogListingPage;