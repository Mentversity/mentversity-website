'use client'

import React from 'react';
import { UserCircle, Mail, Briefcase, Calendar } from 'lucide-react'; // Added Briefcase, Calendar for potential future fields

const ProfileInfo = ({ user }) => {
  if (!user) {
    return <div className="text-gray-400 text-center">No user data available.</div>;
  }

  // Helper to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  console.log('User profile data:', user); // Debugging line
  return (
    <div className="space-y-8">
      <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-4">
        My Profile
      </h2>

      <div className="flex flex-col items-center justify-center mb-8">
        {user.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.name || 'User Profile'}
            className="h-32 w-32 rounded-full object-cover border-4 border-[#00C896] shadow-lg mb-4"
          />
        ) : (
          <UserCircle className="h-32 w-32 text-[#00C896] mb-4" />
        )}
        <h3 className="font-['Poppins',_sans-serif] text-3xl font-bold text-white mb-2">{user.name || 'User'}</h3>
        <p className="text-gray-400 text-lg font-medium capitalize">{user.role || 'Student'}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Email */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Mail size={24} className="text-[#00FFFF]" />
            <span className="font-['Poppins',_sans-serif] text-xl font-semibold text-white">Email</span>
          </div>
          <p className="text-gray-300 text-lg">{user.email}</p>
        </div>

        {/* Role */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Briefcase size={24} className="text-[#FACC15]" />
            <span className="font-['Poppins',_sans-serif] text-xl font-semibold text-white">Role</span>
          </div>
          <p className="text-gray-300 text-lg capitalize">{user.role || 'N/A'}</p>
        </div>

        {/* Member Since */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={24} className="text-[#00C896]" />
            <span className="font-['Poppins',_sans-serif] text-xl font-semibold text-white">Member Since</span>
          </div>
          <p className="text-gray-300 text-lg">{formatDate(user.createdAt)}</p>
        </div>

        {/* Last Login (assuming your User model has a lastLogin field) */}
        <div className="bg-white/5 backdrop-blur-md rounded-xl p-6 border border-gray-700 shadow-md">
          <div className="flex items-center gap-3 mb-3">
            <Calendar size={24} className="text-[#60A5FA]" />
            <span className="font-['Poppins',_sans-serif] text-xl font-semibold text-white">Last Login</span>
          </div>
          <p className="text-gray-300 text-lg">{formatDate(user.lastLogin)}</p>
        </div>
      </div>

      {/* Edit Profile Button (Future functionality) */}
      <div className="text-center mt-10">
        <button
          className="bg-[#00C896] text-black px-8 py-3 rounded-xl font-bold text-lg
                     transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#00C896]/30
                     disabled:opacity-50 disabled:cursor-not-allowed"
          disabled // Disable for now as edit functionality is not built
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileInfo;
