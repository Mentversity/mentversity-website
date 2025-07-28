import { Video, Users, Briefcase } from 'lucide-react'

const Features = () => {
  const features = [
    {
      icon: Video,
      title: "Live Courses",
      description: "Interactive live sessions with industry experts. Learn in real-time and get instant feedback."
    },
    {
      icon: Users,
      title: "Personal Mentorship",
      description: "One-on-one guidance from experienced professionals to accelerate your learning journey."
    },
    {
      icon: Briefcase,
      title: "Industry Projects",
      description: "Work on real-world projects that enhance your portfolio and prepare you for the job market."
    }
  ]

  return (
    <section id="features" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Why Choose <span className="text-[#00C896]">Mentversity</span>?
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
            We provide comprehensive learning experiences that prepare you for success in your career.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12"> {/* Increased gap for larger spacing */}
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                         transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg group"
            >
              {/* Icon Container with subtle gradient and accent color */}
              <div className="w-16 h-16 rounded-xl flex items-center justify-center mb-6
                              bg-gradient-to-br from-[#39FF14]/20 to-[#00FFFF]/20 border border-gray-600
                              group-hover:from-[#39FF14]/30 group-hover:to-[#00FFFF]/30 transition-all duration-300">
                <feature.icon className="text-[#00C896] group-hover:text-[#00FFFF] transition-colors duration-300" size={36} strokeWidth={2.5} /> {/* Adjusted icon size and stroke */}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4 leading-tight">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed text-base">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Features