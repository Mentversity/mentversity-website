'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, ArrowRight, UserCircle, LogOut, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(null)
  const [loadingUser, setLoadingUser] = useState(true)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  const router = useRouter()
  const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}`

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token')
      if (!token) {
        setLoadingUser(false)
        return
      }

      try {
        const response = await fetch(`${BACKEND_URL}/api/auth/profile`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        })
        const { data } = await response.json()
        if (response.ok) {
          setUser(data.user)
        } else {
          localStorage.removeItem('token')
          setUser(null)
        }
      } catch (error) {
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setLoadingUser(false)
      }
    }
    fetchUserProfile()

    // Click outside dropdown
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setIsDropdownOpen(false)
    router.push('/')
  }

  return (
    <div className="fixed top-0 left-0 w-full z-50">
      {/* --- Offer Marquee Bar --- */}
      <div className="w-full bg-gradient-to-r from-[#00C896] via-[#10F3DA] to-[#00C896] border-b border-[#0B132B] h-12 relative overflow-hidden">
        {/* Marquee loop */}
        <div className="flex items-center h-12 animate-marquee whitespace-nowrap">
          <span className="font-extrabold text-lg mx-3">
            🔥 60% OFF on all courses! Limited time only! 🔥
          </span>
          <span className="font-extrabold text-lg mx-3">
            🔥 60% OFF on all courses! Limited time only! 🔥
          </span>
          <span className="font-extrabold text-lg mx-3">
            🔥 60% OFF on all courses! Limited time only! 🔥
          </span>
          {/* Add more if you want even longer loops */}
        </div>
      </div>

      {/* --- Navigation Bar --- */}
      <nav className="w-full bg-[#0B132B]/80 backdrop-blur-lg border-b border-gray-800 font-['Inter',_sans-serif]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center">
                <img src="/logo1.png" alt="Mentversity Logo" className="h-10 w-auto mr-2 rounded-md" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link
                  href="/best-courses"
                  className="px-5 py-2 rounded-xl bg-white/10 border border-[#00C896] text-[#00C896] font-bold text-lg
                   transition-all duration-300 ease-in-out hover:bg-[#00C896]/20 hover:shadow-lg hover:shadow-[#00C896]/30"
                >
                  Courses
                </Link>
                <Link href="/connect-with-us" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-lg">
                  Connect
                </Link>
              </div>
            </div>

            {/* Desktop Auth Buttons / User Profile */}
            <div className="hidden md:block">
              {loadingUser ? (
                <div className="flex items-center justify-center w-24">
                  <Loader2 className="animate-spin text-gray-400" size={24} />
                </div>
              ) : user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 text-white focus:outline-none"
                    aria-label="Open user menu"
                  >
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt={user.name || 'User'}
                        className="h-10 w-10 rounded-full object-cover border-2 border-[#00C896]"
                      />
                    ) : (
                      <UserCircle className="h-10 w-10 text-[#00C896]" />
                    )}
                    <span className="font-semibold text-lg md:block">{user.name || user.email}</span>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-[#1A202C] rounded-lg shadow-xl py-2 border border-gray-700">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsDropdownOpen(false)}
                        className="block px-4 py-2 text-gray-300 hover:bg-[#00C896]/20 hover:text-white transition-colors duration-200"
                      >
                        Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-gray-300 hover:bg-red-500/20 hover:text-red-300 transition-colors duration-200 flex items-center gap-2"
                      >
                        <LogOut size={18} /> Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="ml-4 flex items-center space-x-4">
                  <Link
                    href="/login"
                    className="px-5 py-2 rounded-xl bg-transparent border border-[#00FFFF] text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-[#00FFFF]/20 hover:shadow-lg hover:shadow-[#00FFFF]/30 font-medium"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="bg-[#00C896] text-black px-5 py-2 rounded-xl font-bold hover:bg-[#60A5FA] transition-all duration-300 ease-in-out flex items-center"
                  >
                    Sign Up <ArrowRight size={18} className="ml-2" />
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
              >
                {isOpen ? <X size={28} /> : <Menu size={28} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#0B132B]/95 backdrop-blur-lg rounded-lg mt-2">
                {loadingUser ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="animate-spin text-gray-400" size={24} />
                  </div>
                ) : user ? (
                  <>
                    <div className="flex items-center gap-3 px-3 py-2 text-white">
                      {user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt={user.name || 'User'}
                          className="h-10 w-10 rounded-full object-cover border-2 border-[#00C896]"
                        />
                      ) : (
                        <UserCircle className="h-10 w-10 text-[#00C896]" />
                      )}
                      <span className="font-semibold">{user.name || user.email}</span>
                    </div>
                    <Link href="/dashboard" className="block text-gray-300 hover:text-[#00C896] px-3 py-2 text-lg">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left block text-gray-300 hover:text-red-300 px-3 py-2 text-lg flex items-center gap-2"
                    >
                      <LogOut size={20} /> Logout
                    </button>
                    <div className="border-t border-gray-700 pt-4"></div>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-3 py-2 rounded-xl bg-transparent border border-[#00FFFF] text-white backdrop-blur-sm transition-all duration-300 ease-in-out hover:bg-[#00FFFF]/20 hover:shadow-lg hover:shadow-[#00FFFF]/30 font-medium text-center"
                    >
                      Login
                    </Link>
                    <Link
                      href="/signup"
                      className="block bg-[#00C896] text-black px-3 py-2 rounded-xl mt-3 font-bold hover:bg-[#60A5FA] transition-all duration-300 ease-in-out text-center"
                    >
                      Sign Up
                    </Link>
                  </>
                )}

                {/* Mobile Links */}
                <Link
                  href="/best-courses"
                  className="block px-3 py-2 rounded-xl bg-white/10 border border-[#00C896] text-[#00C896] font-bold text-lg
                   transition-all duration-300 ease-in-out hover:bg-[#00C896]/20 hover:shadow-lg hover:shadow-[#00C896]/30 text-center"
                >
                  Courses
                </Link>
                <Link href="/connect-with-us" className="block text-gray-300 hover:text-[#00C896] px-3 py-2 text-lg">
                  Connect
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Global style for the marquee effect */}
      <style jsx global>{`
        @keyframes marquee {
          0% { transform: translateX(0%);}
          100% { transform: translateX(-50%);}
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
          /* Make it as wide as the content for seamless looping */
          width: max-content;
        }
      `}</style>
    </div>
  )
}

export default Navbar
