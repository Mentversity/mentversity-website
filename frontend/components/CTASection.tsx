import Link from 'next/link'

const CTASection = () => {
  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]"> {/* Main background updated */}
      <div className="max-w-4xl mx-auto text-center">
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-10 sm:p-12 lg:p-16 border border-gray-700 shadow-xl"> {/* Glassmorphism, increased padding, shadow */}
          <h2 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight tracking-tight"> {/* Typography updates */}
            Ready to <span className="text-[#00C896]">Boost Your Skills</span>?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-2xl mx-auto font-medium leading-relaxed"> {/* Typography updates, increased margin */}
            Join thousands of students who have transformed their careers with Mentversity. 
            Start your learning journey today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center"> {/* Increased gap */}
            {/* Primary CTA Button */}
            <Link 
              href="/signup" 
              className="bg-[#00C896] text-black px-10 py-4 rounded-xl font-bold text-lg
                         transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-neon" // Neon green background, black text, rounded, bold, hover effect
            >
              Get Started Now
            </Link>
            {/* Secondary CTA Button */}
            <Link 
              href="#courses" 
              className="bg-transparent border border-white text-white px-10 py-4 rounded-xl font-semibold text-lg
                         transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-neon hover:border-[#00FFFF]" // Outlined, hover glow, border-aqua on hover
            >
              Explore Courses
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection