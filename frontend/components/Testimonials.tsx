import { Star } from 'lucide-react' // Ensure all necessary imports are present

const Testimonials = () => { // Functional component declaration
  const testimonials = [
    {
      name: "Priya Sharma",
      image: "PS",
      rating: 5,
      text: "Mentversity transformed my career. The live sessions and mentorship program helped me land my dream job at Google."
    },
    {
      name: "Rahul Gupta",
      image: "RG",
      rating: 5,
      text: "The industry projects were game-changing. I built a strong portfolio that impressed recruiters immediately."
    },
    {
      name: "Anjali Patel",
      image: "AP",
      rating: 5,
      text: "The personal mentorship was invaluable. My mentor guided me through every step of my career transition."
    }
  ]

  return ( // JSX return statement
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            What Our <span className="text-[#00C896]">Students</span> Say
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
            Real stories from students who transformed their careers with Mentversity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                         transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg group"
            >
              {/* Testimonial Text */}
              <p className="text-gray-200 text-lg mb-6 italic leading-relaxed">"{testimonial.text}"</p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={20} className="text-[#E4FF1A] fill-current" />
                ))}
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 mt-6">
                <div className="w-14 h-14 bg-gradient-to-br from-[#A1FFCE] to-[#00C896] rounded-full flex items-center justify-center text-black text-xl font-bold font-['Poppins',_sans-serif] shadow-md">
                  {testimonial.image}
                </div>
                <div>
                  <div className="text-white text-lg font-semibold font-['Poppins',_sans-serif]">{testimonial.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonials // Exporting the component properly