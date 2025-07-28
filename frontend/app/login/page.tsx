'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, Loader2 } from 'lucide-react'
import Footer from '@/components/Footer' // Assuming this path is correct
import Navbar from '@/components/Navbar' // Assuming this path is correct

// Firebase imports for client-side authentication
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get Firebase Auth instance

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // State for error messages
  const [loading, setLoading] = useState(false) // State for loading indicator
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const BACKEND_URL = `${process.env.NEXT_PUBLIC_API_URL}`; // Your backend URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('') // Clear previous errors
    setLoading(true)

    // Basic validation
    if (!formData.email || !formData.password) {
      setErrorMessage('Please enter both email and password.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('Login successful! Redirecting...');
        // Store the token (e.g., in localStorage)
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or a protected route
        setTimeout(() => {
          window.location.href = '/'; // Example redirect
        }, 1500);
      } else {
        setErrorMessage(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Network error during login:', error);
      setErrorMessage('Network error. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleLogin = async () => {
    setErrorMessage('');
    setLoading(true);

    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken(); // Get Firebase ID Token

      // Send the ID token to your backend for verification and user creation/login
      const response = await fetch(`${BACKEND_URL}/api/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idToken }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('Google login successful! Redirecting...');
        // Store the token (e.g., in localStorage)
        localStorage.setItem('token', data.token);
        // Redirect to dashboard or a protected route
        setTimeout(() => {
          window.location.href = '/'; // Example redirect
        }, 1500);
      } else {
        setErrorMessage(data.message || 'Google authentication failed on server.');
      }
    } catch (error: any) {
      console.error('Google Auth Error:', error);
      if (error.code === 'auth/popup-closed-by-user') {
        setErrorMessage('Google sign-in window closed. Please try again.');
      } else {
        setErrorMessage(error.message || 'An unexpected error occurred during Google sign-in.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar /> {/* Include the Navbar component */}

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-28 lg:pt-32"> {/* Added pt to account for fixed navbar */}
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            {/* Removed the Link component around Mentversity logo, as Navbar handles global branding */}
            <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white mb-2 leading-tight">Welcome Back</h2>
            <p className="text-gray-300 text-lg font-medium">Sign in to continue your learning journey</p>
          </div>

          {/* Login Form Container (Glassmorphism) */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-sm text-center">
                  {errorMessage}
                </div>
              )}

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your email"
                    disabled={loading}
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-5 w-5 text-[#00C896] focus:ring-[#00C896] border-gray-700 rounded-md bg-white/10 cursor-pointer transition-colors duration-200 mt-0.5" // Accent color, rounded-md
                    disabled={loading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-base text-gray-300"> {/* Larger text */}
                    Remember me
                  </label>
                </div>
                <Link href="#" className="text-base text-[#00C896] hover:text-[#00FFFF] font-semibold transition-colors duration-200"> {/* Neon green, hover aqua, font-semibold */}
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button (Primary CTA) */}
              <button
                type="submit"
                className="w-full bg-[#00C896] text-black font-bold text-lg py-3 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00C896]/30 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:ring-offset-2 focus:ring-offset-[#0B132B]
                           flex items-center justify-center gap-2" // Primary CTA style
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Sign In'}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#0B132B] text-gray-400 font-medium">Or continue with</span>
                </div>
              </div>

              {/* Google Sign In (Auth Button Style) */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full bg-white/5 border border-[#00FFFF] text-white font-semibold text-lg py-3 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon hover:border-[#FACC15] flex items-center justify-center gap-3" // Glass background, accent border, hover glow
                disabled={loading}
              >
                {/* Simple 'G' icon with Google-like colors */}
                <div className="w-6 h-6 flex items-center justify-center text-base font-bold"
                     style={{
                        background: 'linear-gradient(to right, #4285F4, #DB4437, #F4B400, #0F9D58)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        color: 'transparent' // Fallback for browsers not supporting text-fill-color
                     }}>
                  G
                </div>
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Continue with Google'}
              </button>
            </form>

            {/* Sign Up Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-base">
                Don't have an account?{' '}
                <Link href="/signup" className="text-[#00C896] hover:text-[#00FFFF] font-bold transition-colors duration-200">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
