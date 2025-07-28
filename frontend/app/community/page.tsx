'use client'

import React from 'react';
import Navbar from '@/components/Navbar'; // Adjust path if necessary
import Footer from '@/components/Footer'; // Adjust path if necessary
import CommunityHeader from '@/components/community/CommunityHeader';
import DiscussionCard from '@/components/community/DiscussionCard';
import StudyGroupCard from '@/components/community/StudyGroupCard';
import ResourceCard from '@/components/community/ResourceCard';
import CommunityAnnouncements from '@/components/community/CommunityAnnouncements';
import FeaturedSuccessStory from '@/components/community/FeaturedSuccessStory';
import {
  MOCK_DISCUSSION_POSTS,
  MOCK_STUDY_GROUPS,
  MOCK_RESOURCES,
  MOCK_ANNOUNCEMENTS,
  MOCK_SUCCESS_STORIES
} from '@/components/community/CommunityData'; // Adjust path as needed
import Link from 'next/link';

const CommunityPage = () => {
  // For demonstration, we'll pick the first success story
  const featuredStory = MOCK_SUCCESS_STORIES[0];

  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar /> {/* Global Navbar */}

      <main className="flex-grow pt-[70px] lg:pt-[90px] py-12 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24">
          {/* Community Page Header */}
          <CommunityHeader />

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left Column: Discussions & Announcements */}
            <div className="lg:col-span-2 space-y-12">
              {/* Discussion Forums */}
              <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white leading-tight tracking-tighter">
                    Latest <span className="text-[#39FF14]">Discussions</span>
                  </h2>
                  <Link
                    href="/community/discussions"
                    className="text-[#00FFFF] hover:text-[#39FF14] font-semibold transition-colors duration-200 text-base"
                  >
                    View All
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {MOCK_DISCUSSION_POSTS.slice(0, 4).map(post => ( // Show first 4 discussions
                    <DiscussionCard key={post.id} post={post} />
                  ))}
                </div>
              </section>

              {/* Announcements */}
              <section>
                <CommunityAnnouncements announcements={MOCK_ANNOUNCEMENTS} />
              </section>
            </div>

            {/* Right Column: Study Groups, Resources, Success Story */}
            <div className="lg:col-span-1 space-y-12">
              {/* Study Groups */}
              <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white leading-tight tracking-tighter">
                    Study <span className="text-[#39FF14]">Groups</span>
                  </h2>
                  <Link
                    href="/community/groups"
                    className="text-[#00FFFF] hover:text-[#39FF14] font-semibold transition-colors duration-200 text-base"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-6">
                  {MOCK_STUDY_GROUPS.slice(0, 2).map(group => ( // Show first 2 study groups
                    <StudyGroupCard key={group.id} group={group} />
                  ))}
                </div>
              </section>

              {/* Community Resources */}
              <section>
                <div className="flex justify-between items-center mb-8">
                  <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white leading-tight tracking-tighter">
                    Community <span className="text-[#39FF14]">Resources</span>
                  </h2>
                  <Link
                    href="/community/resources"
                    className="text-[#00FFFF] hover:text-[#39FF14] font-semibold transition-colors duration-200 text-base"
                  >
                    View All
                  </Link>
                </div>
                <div className="space-y-6">
                  {MOCK_RESOURCES.slice(0, 2).map(resource => ( // Show first 2 resources
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              </section>

              {/* Featured Success Story */}
              {featuredStory && (
                <section>
                  <FeaturedSuccessStory story={featuredStory} />
                </section>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer /> {/* Global Footer */}
    </div>
  );
};

export default CommunityPage;
