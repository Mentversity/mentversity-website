'use client'

import React, { useState } from 'react';
import { User, Mail, MessageSquare, Send } from 'lucide-react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [statusMessage, setStatusMessage] = useState({ type: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage({ type: '', message: '' }); // Clear previous messages

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatusMessage({ type: 'error', message: 'Please fill in all fields.' });
      return;
    }

    // Simulate form submission
    console.log('Form submitted:', formData);
    setStatusMessage({ type: 'success', message: 'Your message has been sent successfully!' });
    setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form

    // In a real application, you would send this data to an API endpoint
    // try {
    //   const response = await fetch('/api/contact', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData),
    //   });
    //   if (response.ok) {
    //     setStatusMessage({ type: 'success', message: 'Your message has been sent successfully!' });
    //     setFormData({ name: '', email: '', subject: '', message: '' });
    //   } else {
    //     const errorData = await response.json();
    //     setStatusMessage({ type: 'error', message: errorData.message || 'Failed to send message.' });
    //   }
    // } catch (error) {
    //   setStatusMessage({ type: 'error', message: 'An unexpected error occurred.' });
    // }
  };

  return (
    <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 lg:p-10 border border-gray-700 shadow-xl transition-all duration-300 ease-in-out hover:scale-[1.01]">
      <h3 className="font-['Poppins',_sans-serif] text-xl sm:text-2xl font-semibold text-white mb-8 text-center leading-tight">Send us a Message</h3>
      
      {statusMessage.message && (
        <div className={`p-4 rounded-lg text-sm mb-6 text-center ${
          statusMessage.type === 'success' ? 'bg-green-500/20 border border-green-500 text-green-300' : 'bg-red-500/20 border border-red-500 text-red-300'
        }`}>
          {statusMessage.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
            Your Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
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
            />
          </div>
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
            Your Email
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
              placeholder="Enter your email address"
            />
          </div>
        </div>

        {/* Subject Field */}
        <div>
          <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
            Subject
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <input
              id="subject"
              name="subject"
              type="text"
              required
              value={formData.subject}
              onChange={handleChange}
              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200"
              placeholder="What's your message about?"
            />
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            required
            value={formData.message}
            onChange={handleChange}
            className="block w-full p-3 border border-gray-700 rounded-xl bg-white/5 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:border-transparent transition-colors duration-200 resize-y"
            placeholder="Type your message here..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-[#00C896] text-black font-bold text-lg py-3 px-4 rounded-xl transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-neon focus:outline-none focus:ring-2 focus:ring-[#00C896] focus:ring-offset-2 focus:ring-offset-[#0B132B] flex items-center justify-center gap-2"
        >
          Send Message <Send size={20} />
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
