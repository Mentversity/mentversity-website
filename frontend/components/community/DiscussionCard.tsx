import React from 'react';
import Link from 'next/link';
import { MessageSquare, Eye, Pin } from 'lucide-react';
import { DiscussionPost } from './CommunityData'; // Adjust path as needed

interface DiscussionCardProps {
  post: DiscussionPost;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({ post }) => {
  return (
    <Link href={`/community/discussions/${post.id}`} className="block">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md
                      transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <span className="bg-[#00FFFF]/20 text-[#00FFFF] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
            {post.category}
          </span>
          {post.isPinned && (
            <Pin size={20} className="text-[#E4FF1A] flex-shrink-0" />
          )}
        </div>
        <h3 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white mb-3 leading-snug flex-grow">
          {post.title}
        </h3>
        <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
          <img
            src={post.author.avatar}
            alt={post.author.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
          />
          <span>{post.author.name}</span>
          <span className="mx-1">•</span>
          <span>{post.lastActive}</span>
        </div>
        <div className="flex items-center justify-between text-gray-300 text-sm">
          <div className="flex items-center gap-1">
            <MessageSquare size={16} className="text-[#39FF14]" />
            <span>{post.replies} Replies</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye size={16} className="text-gray-500" />
            <span>{post.views} Views</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default DiscussionCard;
