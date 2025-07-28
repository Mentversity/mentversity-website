'use client'

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProfileInfo from '@/components/dashboard/ProfileInfo';
import MyCourses from '@/components/dashboard/MyCourses';
import { Loader2 } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('profile'); // 'profile' or 'my-courses'

  const router = useRouter();
  const BACKEND_URL = 'http://localhost:5000'; // Your backend URL

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        // If no token, redirect to login
        router.push('/login');
        return;
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        const {data} = await response.json();

        if (response.ok) {
          setUser(data.user);
        } else {
          setError(data.message || 'Failed to fetch user profile.');
          localStorage.removeItem('token'); // Clear invalid token
          router.push('/login'); // Redirect to login
        }
      } catch (err) {
        console.error('Network error fetching user profile:', err);
        setError('Network error. Could not load profile.');
        localStorage.removeItem('token'); // Clear token on network error
        router.push('/login'); // Redirect to login
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex items-center justify-center text-white text-2xl font-['Inter',_sans-serif]">
        <Loader2 className="animate-spin mr-3" size={32} /> Loading dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B132B] flex flex-col items-center justify-center text-white text-2xl font-['Inter',_sans-serif] px-4 text-center">
        <h2 className="font-['Sora',_sans-serif] text-4xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-300 text-lg mb-8">{error}</p>
        <button
          onClick={() => router.push('/login')}
          className="bg-[#00C896] text-black px-8 py-3 rounded-xl font-bold text-lg
                     transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-lg hover:shadow-[#00C896]/30"
        >
          Go to Login
        </button>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar />

      <main className="flex-grow pt-20 lg:pt-24 px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1 bg-white/5 backdrop-blur-lg rounded-2xl p-6 border border-gray-700 shadow-xl self-start">
            <h3 className="font-['Sora',_sans-serif] text-2xl font-bold text-white mb-6">Dashboard</h3>
            <nav>
              <ul>
                <li className="mb-3">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-colors duration-200
                                ${activeTab === 'profile' ? 'bg-[#00C896] text-black shadow-lg shadow-[#00C896]/30' : 'text-gray-300 hover:bg-white/10 hover:text-white'}`}
                  >
                    Profile
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content Area */}
          <section className="lg:col-span-3 bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
            {activeTab === 'profile' && <ProfileInfo user={user} />}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
