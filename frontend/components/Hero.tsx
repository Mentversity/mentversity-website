import { Play, Star, TrendingUp, ArrowRight } from 'lucide-react' // Added ArrowRight for consistency
import Link from 'next/link'

const Hero = () => {
  return (
    <section className="relative pt-24 pb-16 lg:py-32 flex items-center justify-center overflow-hidden bg-[#0B132B] font-['Inter',_sans-serif]">
      {/* Background Gradient Effect (Subtle, as per design suggestion of soft gradients) */}
      <div className="absolute inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B132B] via-[#1E1E1E] to-[#0B132B]"></div>
        {/* Subtle radial gradients for depth - these classes (animate-blob, animation-delay-XXXX) assume keyframes are defined in global CSS */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A1FFCE] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#FAFFD1] rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-[#00FFFF] rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <h1 className="font-['Sora',_sans-serif] text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#ffffff] to-[#ffffff]">
              Learn Skills. <br />
              <span className="text-[#00C896]">Launch Careers.</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed mb-10 max-w-2xl lg:mx-0 mx-auto font-medium">
              India's fastest-growing learning hub. Dive into <span className="text-[#00FFFF] font-semibold">career-driven learning</span> and succeed with <span className="text-[#E4FF1A] font-semibold">industry experts</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              {/* Primary CTA Button */}
              <Link
                href="/best-courses"
                className="bg-[#00C896] text-black px-8 py-4 rounded-xl font-bold text-lg
                           transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-neon
                           flex items-center justify-center min-w-[200px]"
              >
                Browse Courses <ArrowRight size={20} className="ml-3" />
              </Link>
              {/* Secondary CTA Button
              <button
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-white text-white font-semibold text-lg
                           transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-neon hover:border-[#00FFFF]
                           min-w-[200px]"
              >
                <Play size={20} />
                Watch Demo
              </button> */}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 lg:gap-10 pt-12 justify-center lg:justify-start">
              {/* Stat Card 1: Learners */}
              <div className="text-center px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 shadow-md
                          transition-all duration-300 ease-in-out hover:scale-[1.03] min-w-[150px]">
                <div className="font-['Sora',_sans-serif] text-4xl md:text-5xl font-bold text-[#00C896] leading-none">
                  1000+
                </div>
                <div className="text-gray-300 text-base mt-2 font-medium">Learners</div>
              </div>
              {/* Stat Card 2: Courses */}
              {/* <div className="text-center px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 shadow-md
                          transition-all duration-300 ease-in-out hover:scale-[1.03] min-w-[150px]">
                <div className="font-['Sora',_sans-serif] text-4xl md:text-5xl font-bold text-[#00C896] leading-none">
                  500+
                </div>
                <div className="text-gray-300 text-base mt-2 font-medium">Courses</div>
              </div> */}
              {/* Stat Card 3: Success Rate */}
              <div className="text-center px-6 py-4 bg-white/5 backdrop-blur-lg rounded-xl border border-gray-700 shadow-md
                          transition-all duration-300 ease-in-out hover:scale-[1.03] min-w-[150px]">
                <div className="font-['Sora',_sans-serif] text-4xl md:text-5xl font-bold text-[#00C896] leading-none">
                  95%
                </div>
                <div className="text-gray-300 text-base mt-2 font-medium">Success Rate</div>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image/Statistics Box */}
          <div className="relative flex justify-center lg:justify-end py-10">
            {/* Main Image/Stats Container */}
            <div className="w-full max-w-md bg-white/5 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-gray-700 shadow-xl
                        transition-all duration-300 ease-in-out hover:scale-[1.02]">
              {/* Main Image (Placeholder) */}
              <img
                src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Mentversity Mentorship Session"
                className="rounded-xl mb-6 shadow-lg border border-gray-600 object-cover w-full h-auto aspect-video"
              />
              
              {/* Rating Box */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 mb-4 border border-gray-700 shadow-md">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} className="text-[#E4FF1A] fill-current" />
                    ))}
                  </div>
                  <span className="font-['Sora',_sans-serif] text-xl font-bold text-white">4.9</span>
                </div>
                <p className="text-gray-300 text-base font-medium">"Amazing learning experience!"</p>
              </div>

              {/* Progress Stats */}
              <div className="bg-white/5 backdrop-blur-md rounded-xl p-4 border border-gray-700 shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <TrendingUp className="text-[#00FFFF]" size={24} />
                  <span className="font-['Poppins',_sans-serif] text-xl font-semibold text-white">Course Progress</span>
                </div>
                <div className="bg-gray-700 rounded-full h-3 mb-2">
                  <div className="bg-[#00C896] h-full rounded-full" style={{ width: '75%' }}></div>
                </div>
                <p className="text-gray-300 text-base font-medium">75% Complete - Advanced Web Dev</p>
              </div>
            </div>

            {/* Floating Elements / Micro-UI Details */}
            <div className="absolute top-12 left-4 sm:left-12 lg:-top-4 lg:-left-8 bg-[#00C896] text-black px-4 py-2 rounded-full text-sm font-bold uppercase animate-pulse transform -rotate-6 shadow-lg z-20">
              Live Classes
            </div>
            <div className="absolute bottom-8 right-4 sm:right-12 lg:-bottom-4 lg:-right-8 bg-[#00FFFF] text-black px-4 py-2 rounded-full text-sm font-bold uppercase transform rotate-3 shadow-lg z-20">
              +2K New Learners
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero