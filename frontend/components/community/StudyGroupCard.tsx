import React from 'react';
import Link from 'next/link';
import { Users, BookOpen, CheckCircle, XCircle } from 'lucide-react';
import { StudyGroup } from './CommunityData'; // Adjust path as needed

interface StudyGroupCardProps {
  group: StudyGroup;
}

const StudyGroupCard: React.FC<StudyGroupCardProps> = ({ group }) => {
  return (
    <Link href={`/community/groups/${group.id}`} className="block">
      <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-md
                      transition-all duration-300 ease-in-out hover:scale-[1.01] hover:shadow-xl flex flex-col h-full">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-['Poppins',_sans-serif] text-xl font-semibold text-white leading-snug flex-grow">
            {group.name}
          </h3>
          {group.isActive ? (
            <span className="bg-green-500/20 text-green-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <CheckCircle size={14} /> Active
            </span>
          ) : (
            <span className="bg-red-500/20 text-red-400 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
              <XCircle size={14} /> Inactive
            </span>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4 flex-grow">{group.description}</p>
        
        <div className="flex items-center gap-2 text-gray-300 text-sm mb-3">
          <BookOpen size={16} className="text-[#00FFFF]" />
          <span>Course: {group.course}</span>
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-sm mb-4">
          <Users size={16} className="text-[#39FF14]" />
          <span>{group.members} Members</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {group.tags.map(tag => (
            <span key={tag} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <button
          className="w-full bg-white/5 border border-white text-white px-6 py-3 rounded-xl font-semibold text-base
                     transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon hover:border-[#00FFFF]"
        >
          View Group
        </button>
      </div>
    </Link>
  );
};

export default StudyGroupCard;
