"use client"
import React from "react";
import Head from "next/head";
import ReactMarkdown from "react-markdown";
import { agenticAIContent, PageContent, ContentSection } from "@/data/aicontent";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

interface PageProps {
  params: { slug: string };
}

// Helper to render nested sections recursively
const renderSections = (sections: ContentSection[]) => {
  return sections.map((section) => (
    <section
      id={section.id}
      key={section.id}
      className="mb-12 bg-white rounded-lg shadow-lg p-6"
    >
      {/* Section Title */}
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">
        {section.title}
      </h2>

      {/* Section Content with Markdown */}
      {section.content.map((para, idx) => (
        <div
          key={idx}
          className="prose prose-gray max-w-none mb-4 text-gray-800 leading-relaxed"
        >
          <ReactMarkdown>{para}</ReactMarkdown>
        </div>
      ))}

      {/* Render image only if section.image exists */}
      {"image" in section && section.image && (
        <div className="my-6">
          <img
            src={section.image}
            alt={section.title}
            className="w-full rounded-lg shadow-md"
          />
        </div>
      )}

      {/* Recursive Subsections */}
      {section.subsections && renderSections(section.subsections)}
    </section>
  ));
};

export default function Page({ params }: PageProps) {
  const content: PageContent = agenticAIContent; // You can switch dynamically by slug later

  return (
    <>
      <Head>
        <title>{content.title} | Mentversity</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="keywords" content={content.metaKeywords.join(", ")} />
      </Head>

      <div className="min-h-screen bg-[#F5F7FA] font-sans text-gray-900">
        <Navbar />

        {/* Hero Section */}
        <header className="text-center py-16 px-4 md:px-16 bg-white shadow-md">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900">
            {content.hero.title}
          </h1>
          <h2 className="text-2xl md:text-3xl text-[#00C896] mb-6">
            {content.hero.subtitle}
          </h2>
          <p className="text-lg md:text-xl max-w-4xl mx-auto text-gray-700">
            {content.hero.description}
          </p>
        </header>

        {/* Main Content Layout */}
        <main className="max-w-7xl mx-auto px-4 md:px-16 pb-16 grid grid-cols-1 md:grid-cols-12 gap-8 mt-8">
          {/* Table of Contents */}
          <aside className="md:col-span-3 sticky top-24 self-start hidden md:block">
            <nav className="bg-white p-4 rounded-lg border border-gray-300 shadow-sm">
              <h2 className="text-2xl font-semibold mb-4 text-gray-900">
                Table of Contents
              </h2>
              <ul className="list-disc list-inside text-gray-700">
                {content.tableOfContents.map((item) => (
                  <li key={item.id} className="mb-2">
                    <a
                      href={`#${item.id}`}
                      className="hover:text-[#00C896] font-medium"
                    >
                      {item.title}
                    </a>
                    {item.subsections && (
                      <ul className="ml-4 list-disc list-inside mt-1">
                        {item.subsections.map((sub) => (
                          <li key={sub.id}>
                            <a
                              href={`#${sub.id}`}
                              className="hover:text-[#00C896]"
                            >
                              {sub.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Page Content */}
          <div className="md:col-span-9 space-y-12">
            {renderSections(content.sections)}

            {/* FAQ Section */}
            <section id="faq" className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Frequently Asked Questions
              </h2>
              {content.faq.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-lg border border-gray-300 shadow-sm"
                >
                  <h3 className="font-semibold text-xl mb-2 text-gray-900">
                    {faq.question}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              ))}
            </section>

            {/* Related Topics */}
            <section id="related-topics" className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
                Related Topics
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {content.relatedTopics.map((topic) => (
                  <a
                    key={topic.title}
                    href={topic.link}
                    className="block p-6 bg-white rounded-lg border border-gray-300 hover:bg-[#00C896]/20 transition shadow-sm"
                  >
                    <h3 className="font-semibold text-lg mb-2 text-gray-900">
                      {topic.title}
                    </h3>
                    <p className="text-gray-700">{topic.description}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
