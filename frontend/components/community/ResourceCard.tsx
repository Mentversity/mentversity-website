import React from 'react';
import Link from 'next/link';
import { Link as LinkIcon, ThumbsUp, FileText, Tool, Video, FolderOpen } from 'lucide-react';
import { Resource } from './CommunityData'; // Adjust path as needed

interface ResourceCardProps {
  resource: Resource;
}

const getIconForResourceType = (type: Resource['type']) => {
  switch (type) {
    case 'Article': return <FileText size={20} className="text-[#00FFFF]" />;
    case 'Tool': return <Tool size={20} className="text-[#E4FF1A]" />;
    case 'Video': return <Video size={20} className="text-red-500" />;
    case 'Project': return <FolderOpen size={20} className="text-purple-400" />;
    default: return <LinkIcon size={20} className="text-gray-400" />;
  }
};

const ResourceCard: React.FC<ResourceCardProps> = ({ resource }) => {
  return (
    <a href={resource.link} target="_blank" rel="noopener noreferrer" className="block">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md
                      transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white leading-snug flex-grow">
            {resource.title}
          </h3>
          {getIconForResourceType(resource.type)}
        </div>
        <div className="flex items-center gap-3 text-gray-400 text-sm mb-4">
          <img
            src={resource.sharedBy.avatar}
            alt={resource.sharedBy.name}
            className="w-8 h-8 rounded-full object-cover border-2 border-gray-600"
          />
          <span>Shared by {resource.sharedBy.name}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {resource.tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between text-gray-300 text-sm mt-auto">
          <span className="bg-[#39FF14]/20 text-[#39FF14] text-xs font-bold px-3 py-1 rounded-full">
            {resource.type}
          </span>
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} className="text-[#E4FF1A] fill-current" />
            <span>{resource.likes} Likes</span>
          </div>
        </div>
      </div>
    </a>
  );
};

export default ResourceCard;
