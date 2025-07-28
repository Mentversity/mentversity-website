import React from 'react';
import { Bell, CalendarDays, Megaphone } from 'lucide-react';
import { Announcement } from './CommunityData'; // Adjust path as needed

interface CommunityAnnouncementsProps {
  announcements: Announcement[];
}

const getIconForAnnouncementType = (type: Announcement['type']) => {
  switch (type) {
    case 'event': return <CalendarDays size={20} className="text-[#00FFFF]" />;
    case 'update': return <Megaphone size={20} className="text-[#39FF14]" />;
    case 'webinar': return <Bell size={20} className="text-[#E4FF1A]" />;
    default: return <Bell size={20} className="text-gray-400" />;
  }
};

const CommunityAnnouncements: React.FC<CommunityAnnouncementsProps> = ({ announcements }) => {
  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
      <h3 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-6 flex items-center gap-3">
        <Bell size={24} className="text-[#39FF14]" /> Latest Announcements
      </h3>
      <div className="space-y-4">
        {announcements.map(announcement => (
          <div key={announcement.id} className="flex items-start gap-4 p-4 bg-white/10 rounded-xl border border-gray-800">
            <div className="flex-shrink-0 mt-1">
              {getIconForAnnouncementType(announcement.type)}
            </div>
            <div>
              <p className="text-gray-300 text-xs uppercase font-semibold mb-1">{announcement.date}</p>
              <h4 className="font-['Poppins',_sans-serif] text-lg font-medium text-white mb-1 leading-snug">
                {announcement.title}
              </h4>
              <p className="text-gray-400 text-sm">{announcement.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityAnnouncements;
