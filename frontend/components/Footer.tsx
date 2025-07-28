import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#0B132B] border-t border-gray-800 font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24"> {/* Increased padding */}
        <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-12 lg:gap-8"> {/* Increased gap */}
          {/* Company Info */}
          <div className="space-y-6"> {/* Increased space */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <img src="/logo1.png" alt="Mentversity Logo" className="h-10 w-auto mr-2 rounded-md" /> 
            </Link>
          </div>
            <p className="text-gray-300 max-w-sm leading-relaxed font-medium"> {/* Adjusted text color, line-height, font-weight */}
              Empowering learners worldwide with cutting-edge skills and career opportunities.
            </p>
            <div className="flex space-x-5 mt-6"> {/* Increased space */}
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                           bg-white/5 p-2 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm" // Glassmorphism-like button
                aria-label="Facebook"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                           bg-white/5 p-2 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm"
                aria-label="Twitter"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                           bg-white/5 p-2 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a 
                href="https://www.instagram.com/mentversity/" 
                className="text-gray-400 hover:text-[#00FFFF] transition-colors duration-300
                           bg-white/5 p-2 rounded-full border border-gray-700 hover:border-[#00FFFF] shadow-sm"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-['Poppins',_sans-serif] font-semibold text-xl mb-6">Quick Links</h3> {/* Larger heading, Poppins font */}
            <ul className="space-y-3"> {/* Increased space */}
              <li><Link href="/best-courses" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Courses</Link></li>
              <li><Link href="/connect-with-us" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Contact</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-['Poppins',_sans-serif] font-semibold text-xl mb-6">Support</h3> {/* Larger heading, Poppins font */}
            <ul className="space-y-3"> {/* Increased space */}
              <li><Link href="#" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Help Center</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Student Portal</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Career Services</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Mentorship</Link></li>
              <li><Link href="#" className="text-gray-300 hover:text-[#00C896] transition-colors duration-200 text-base">Resources</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-['Poppins',_sans-serif] font-semibold text-xl mb-6">Contact Info</h3> {/* Larger heading, Poppins font */}
            <ul className="space-y-4"> {/* Increased space */}
              <li className="flex items-start gap-3 text-gray-300 text-base"> {/* Adjusted text size */}
                <Mail size={20} className="text-[#00C896] flex-shrink-0 mt-0.5" /> {/* Larger icon, align top */}
                <a href="mailto:contact@mentversity.com" className="hover:text-[#00C896] transition-colors duration-200">
                  contact@mentversity.com
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-base">
                <Phone size={20} className="text-[#00C896] flex-shrink-0 mt-0.5" />
                <a href="tel:+918657983413" className="hover:text-[#00C896] transition-colors duration-200">
                  +91 8657983413
                </a>
              </li>
              <li className="flex items-start gap-3 text-gray-300 text-base">
                <MapPin size={20} className="text-[#00C896] flex-shrink-0 mt-0.5" />
                <span>Mumbai, Maharashtra, India</span> {/* Explicitly mentioning Mumbai, India */}
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center text-sm"> {/* Increased top margin, text size */}
          <p className="text-gray-400">
            © {new Date().getFullYear()} Mentversity. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center space-x-6 mt-4 md:mt-0"> {/* Flex-wrap for small screens */}
            <Link href="#" className="text-gray-400 hover:text-[#00C896] transition-colors duration-200">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#00C896] transition-colors duration-200">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-[#00C896] transition-colors duration-200">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer