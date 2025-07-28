'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Mail, Lock, User as UserIcon, Loader2 } from 'lucide-react' // Renamed User to UserIcon to avoid conflict
import Footer from '@/components/Footer' // Assuming this path is correct
import Navbar from '@/components/Navbar' // Assuming this path is correct

// Firebase imports for client-side authentication
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

// Initialize Firebase App (using global config from Canvas environment)
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

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('') // State for error messages
  const [loading, setLoading] = useState(false) // State for loading indicator
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '', // Frontend validation only
    agreeToTerms: false // Frontend validation only
  })

  const BACKEND_URL = 'http://localhost:5000'; // Your backend URL

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('') // Clear previous errors
    setLoading(true)

    if (formData.password !== formData.confirmPassword) {
      setErrorMessage('Passwords do not match!')
      setLoading(false)
      return
    }
    if (!formData.agreeToTerms) {
      setErrorMessage('Please agree to the terms and conditions.')
      setLoading(false)
      return
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setErrorMessage('Account created successfully! Redirecting to login...');
        // In a real app, you might store the token and redirect to dashboard
        // For now, let's just redirect to login after a short delay
        setTimeout(() => {
          window.location.href = '/login'; // Redirect to login page
        }, 2000);
      } else {
        setErrorMessage(data.message || 'Registration failed. Please try again.');
        if (data.errors && data.errors.length > 0) {
          setErrorMessage(data.errors.map((err: any) => err.msg).join(', '));
        }
      }
    } catch (error) {
      console.error('Network error during registration:', error);
      setErrorMessage('Network error. Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  const handleGoogleSignUp = async () => {
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
        setErrorMessage('Google signup/login successful! Redirecting...');
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
    const { name, value, type, checked } = e.target
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    })
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#0B132B] font-['Inter',_sans-serif]">
      <Navbar /> {/* Include the Navbar component */}

      <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12 pt-28 lg:pt-32"> {/* Added pt to account for fixed navbar */}
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <h2 className="font-['Sora',_sans-serif] text-3xl font-bold text-white mb-2 leading-tight">Create Your Account</h2>
            <p className="text-gray-300 text-lg font-medium">Start your learning journey today</p>
          </div>

          {/* Sign Up Form Container (Glassmorphism) */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errorMessage && (
                <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-lg text-sm text-center">
                  {errorMessage}
                </div>
              )}

              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
                    placeholder="Enter your full name"
                    disabled={loading}
                  />
                </div>
              </div>

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
                    placeholder="Create a password"
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

              {/* Confirm Password Field */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Confirm Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full pl-10 pr-10 py-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
                    placeholder="Confirm your password"
                    disabled={loading}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white transition-colors duration-200"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label={showConfirmPassword ? 'Hide confirm password' : 'Show confirm password'}
                    disabled={loading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start">
                <input
                  id="agreeToTerms"
                  name="agreeToTerms"
                  type="checkbox"
                  required
                  checked={formData.agreeToTerms}
                  onChange={handleChange}
                  className="h-5 w-5 text-[#00C896] focus:ring-[#00C896] border-gray-700 rounded-md bg-white/10 cursor-pointer transition-colors duration-200 mt-0.5"
                  disabled={loading}
                />
                <label htmlFor="agreeToTerms" className="ml-3 block text-base text-gray-300 leading-relaxed">
                  I agree to the{' '}
                  <Link href="#" className="text-[#00C896] hover:text-[#00FFFF] font-semibold transition-colors duration-200">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-[#00C896] hover:text-[#00FFFF] font-semibold transition-colors duration-200">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button (Primary CTA) */}
              <button
                type="submit"
                className="w-full bg-[#00C896] text-black font-bold text-lg py-3 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg hover:shadow-[#00C896]/30 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:ring-offset-2 focus:ring-offset-[#0B132B]
                           flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
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

              {/* Google Sign Up (Auth Button Style) */}
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-white/5 border border-[#00FFFF] text-white font-semibold text-lg py-3 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon hover:border-[#FACC15] flex items-center justify-center gap-3"
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

            {/* Login Link */}
            <div className="mt-8 text-center">
              <p className="text-gray-300 text-base">
                Already have an account?{' '}
                <Link href="/login" className="text-[#00C896] hover:text-[#00FFFF] font-bold transition-colors duration-200">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer /> {/* Include the Footer component */}
    </div>
  )
}
