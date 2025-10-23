'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReactMarkdown from 'react-markdown';
import { useParams } from 'next/navigation';
import { ChevronRight, X } from 'lucide-react';

// --- ImageModal Component ---
const ImageModal = ({ src, alt, onClose }) => {
  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative p-4 max-w-7xl max-h-[90vh] transition-all duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-3xl font-bold p-2 bg-gray-800/50 rounded-full hover:bg-gray-700 transition"
          aria-label="Close"
        >
          <X size={28} />
        </button>
        <img
          src={src}
          alt={alt}
          className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
        />
        {alt && (
          <p className="mt-4 text-center text-white text-lg font-medium">{alt}</p>
        )}
      </div>
    </div>
  );
};

/**
 * Utility function to recursively extract headings for TOC.
 */
const extractTocItems = (sections, depth = 0) => {
  if (!sections) return [];
  return sections.flatMap(section => {
    const items = [];
    if (section.heading && section.id) {
      items.push({ id: section.id, title: section.heading, depth });
    }
    if (section.subsections) {
      items.push(...extractTocItems(section.subsections, depth + 1));
    }
    return items;
  });
};

/**
 * Render the main content sections.
 */
const renderSections = (sections, onImageClick) =>
  sections.map((section) => {
    const contentArray = Array.isArray(section.content)
      ? section.content
      : [section.content].filter(Boolean);

    return (
      <section
        key={section.id || Math.random()}
        id={section.id}
        className="mb-10 bg-white rounded-xl shadow-lg border border-gray-100 p-8 md:p-10 transition-all hover:shadow-xl"
      >
        {section.heading && (
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6 text-gray-900 border-b pb-3 border-gray-100">
            {section.heading}
          </h2>
        )}

        {contentArray.map((para, idx) => (
          <div
            key={idx}
            className="prose prose-lg prose-indigo max-w-none mb-6 text-gray-700 leading-relaxed"
          >
            <ReactMarkdown>{para}</ReactMarkdown>
          </div>
        ))}

        {section.image && (
          <div className="my-8">
            <button
              onClick={() => onImageClick(section.image, section.heading || 'Section Image')}
              className="cursor-pointer block w-full focus:outline-none focus:ring-4 focus:ring-[#00C896]/50 rounded-xl"
              aria-label={`View full image for ${section.heading || 'section'}`}
            >
              <img
                src={section.image}
                alt={section.heading || 'Section Image'}
                className="w-full h-auto max-h-[400px] object-cover rounded-xl shadow-2xl border-4 border-[#00C896]/10 transition-transform duration-300 hover:scale-[1.01]"
              />
              <p className="text-center text-sm text-gray-500 mt-2 hover:text-[#00C896]">
                Click to view full image
              </p>
            </button>
          </div>
        )}

        {section.subsections && (
          <div className="mt-8 pt-6 border-t border-gray-200">
            {renderSections(section.subsections, onImageClick)}
          </div>
        )}
      </section>
    );
  });

const DynamicPage = () => {
  const params = useParams();
  const { slug } = params;
  const [page, setPage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [modalImage, setModalImage] = useState({ src: null, alt: null });

  const handleImageClick = (src, alt) => setModalImage({ src, alt });
  const handleCloseModal = () => setModalImage({ src: null, alt: null });

  const tocItems = useMemo(() => {
    if (!page || !page.sections) return [];
    return extractTocItems(page.sections);
  }, [page]);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/pages/${slug}`);
        if (!res.ok) throw new Error('Page not found');
        const data = await res.json();
        console.log(data.data.page)
        setPage(data.data.page);
      } catch (err) {
        console.error('Error fetching page:', err);
        setPage(null);
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPage();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F5F7FA] text-gray-900">
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
        <p className="mt-4 text-lg">Loading page content...</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F7FA] text-gray-900">
        <h1 className="text-3xl font-bold text-red-600">404 - Page Not Found</h1>
      </div>
    );
  }

  // --- Dynamic SEO Meta Tags ---
  const seoTitle = page.title || `${page.title} | Mentversity`;
  const seoDescription = page.metaDescription || page.subtitle || page.heroDescription || 'Explore insights from Mentversity.';
  const seoKeywords = page.metaKeywords?.join(', ') || 'Mentversity, Data Science, AI, Courses, Education, Learning';
  const seoImage = page.heroImage || page.image || '/default-og-image.jpg';
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;

  return (
    <>
      <Head>
        {/* Primary Meta Tags */}
        <title>{seoTitle}</title>
        <meta name="title" content={seoTitle} />
        <meta name="description" content={seoDescription} />
        <meta name="keywords" content={seoKeywords} />
        <link rel="canonical" href={canonicalUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={seoTitle} />
        <meta property="og:description" content={seoDescription} />
        <meta property="og:image" content={seoImage} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:site_name" content="Mentversity" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seoTitle} />
        <meta name="twitter:description" content={seoDescription} />
        <meta name="twitter:image" content={seoImage} />
      </Head>

      <div className="min-h-screen bg-[#F8FAFC] text-gray-900">
        <Navbar />

        {/* Hero Section */}
        <header className="py-20 px-4 md:px-16 bg-white border-b border-gray-100 shadow-inner">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl lg:text-7xl font-extrabold mb-4 text-gray-900 leading-tight">
              {page.title}
            </h1>
            {page.subtitle && (
              <h2 className="text-2xl md:text-3xl text-[#00C896] font-medium mb-8">
                {page.subtitle}
              </h2>
            )}
            {page.heroDescription && (
              <p className="text-xl max-w-5xl mx-auto text-gray-600 font-light">
                {page.heroDescription}
              </p>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 md:px-8 pb-20 grid grid-cols-1 md:grid-cols-12 gap-12 mt-12">
          {/* Table of Contents */}
          {tocItems.length > 0 && (
            <aside className="md:col-span-3">
              <nav className="sticky top-24 bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
                <h2 className="text-2xl font-bold mb-5 text-gray-900 border-b pb-3">
                  In This Article
                </h2>
                <ul className="space-y-3 text-gray-700">
                  {tocItems.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        className="flex items-center hover:text-[#00C896] hover:underline"
                        style={{ paddingLeft: `${item.depth * 15}px` }}
                      >
                        <ChevronRight size={16} className="mr-2 text-[#00C896]" />
                        {item.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
          )}

          {/* Main Page Content */}
          <div className={`space-y-12 ${tocItems.length > 0 ? 'md:col-span-9' : 'md:col-span-12'}`}>
            {page.sections && renderSections(page.sections, handleImageClick)}

            {/* FAQ */}
            {page.faq?.length > 0 && (
              <>
                <div className="w-full h-px bg-gray-200" />
                <section
                  id="faq"
                  className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <h2 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-3 border-[#00C896]">
                    🤔 Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {page.faq.map((faq, idx) => (
                      <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                        <h3 className="font-bold text-xl mb-2 text-gray-900 flex items-center">
                          <span className="text-2xl text-[#00C896] mr-3">?</span>
                          {faq.question}
                        </h3>
                        <p className="text-gray-700 pl-5">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Related Topics */}
            {page.relatedTopics?.length > 0 && (
              <>
                <div className="w-full h-px bg-gray-200" />
                <section
                  id="related-topics"
                  className="space-y-8 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                >
                  <h2 className="text-4xl font-extrabold mb-8 text-gray-900 border-b pb-3 border-[#00C896]">
                    🔗 Related Topics
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {page.relatedTopics.map((topic) => (
                      <a
                        key={topic.title}
                        href={topic.link}
                        className="block p-6 bg-[#F8FAFC] rounded-xl border border-gray-200 hover:bg-[#00C896]/10 transition-all duration-300 shadow-sm hover:shadow-lg transform hover:-translate-y-1"
                      >
                        <h3 className="font-bold text-xl mb-2 text-gray-900">{topic.title}</h3>
                        <p className="text-gray-700 text-sm line-clamp-2">{topic.description}</p>
                        <span className="mt-3 inline-block text-[#00C896] font-medium text-sm">
                          Read More &rarr;
                        </span>
                      </a>
                    ))}
                  </div>
                </section>
              </>
            )}
          </div>
        </main>

        <Footer />
      </div>

      {/* Image Modal */}
      <ImageModal src={modalImage.src} alt={modalImage.alt} onClose={handleCloseModal} />
    </>
  );
};

export default DynamicPage;
