import { Check } from 'lucide-react'

const Pricing = () => {
  const plans = [
    {
      name: "Basic",
      price: "₹999",
      period: "/month",
      features: [
        "Access to basic courses",
        "Community support",
        "Basic projects",
        "Certificate of completion"
      ],
      popular: false
    },
    {
      name: "Pro",
      price: "₹1,999",
      period: "/month",
      features: [
        "All basic features",
        "Live mentorship sessions",
        "Advanced projects",
        "Job placement assistance",
        "1-on-1 career guidance"
      ],
      popular: true
    },
    {
      name: "Lifetime",
      price: "₹9,999",
      period: "one-time",
      features: [
        "All pro features",
        "Lifetime access",
        "Priority support",
        "Exclusive masterclasses",
        "Alumni network access"
      ],
      popular: false
    }
  ]

  return (
    <section id="pricing" className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]"> {/* Main background updated */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4"> {/* Typography updates */}
            Choose Your <span className="text-[#39FF14]">Learning Path</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium"> {/* Typography updates */}
            Flexible pricing plans designed to fit your learning goals and budget.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10 max-w-5xl mx-auto"> {/* Increased gap */}
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 backdrop-blur-lg rounded-2xl p-8 border shadow-md
                          transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg // Consistent hover effect
                          ${
                            plan.popular 
                              ? 'border-[#39FF14] ring-2 ring-[#39FF14]/30' // Primary green border for popular
                              : 'border-gray-700 hover:border-[#39FF14]/50' // Subtle green hover border for others
                          }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2"> {/* Adjusted top position for badge */}
                  <span className="bg-[#E4FF1A] text-black px-5 py-1.5 rounded-full text-sm font-bold uppercase tracking-wide shadow-md"> {/* Accent yellow badge, black text, bold, uppercase */}
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="font-['Poppins',_sans-serif] text-2xl font-semibold text-white mb-3"> {/* Poppins font, larger, bold */}
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2"> {/* Increased gap */}
                  <span className="text-5xl font-['Sora',_sans-serif] font-bold text-[#39FF14] leading-none">{plan.price}</span> {/* Larger price, Sora font, neon green */}
                  <span className="text-gray-400 text-lg font-medium">{plan.period}</span> {/* Larger period, medium weight */}
                </div>
              </div>

              <ul className="space-y-4 mb-10"> {/* Increased space */}
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3"> {/* Align items to start for multi-line features */}
                    <Check className="text-[#39FF14] flex-shrink-0 mt-1" size={20} /> {/* Primary green check, larger icon */}
                    <span className="text-gray-300 text-base font-medium">{feature}</span> {/* Text color, size, medium weight */}
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <button className={`w-full py-4 px-6 rounded-xl font-bold text-lg // Larger padding, rounded, bold, larger text
                                 transition-all duration-300 ease-in-out hover:scale-[1.03] hover:shadow-neon // Consistent hover effect
                                 ${
                                   plan.popular
                                     ? 'bg-[#39FF14] text-black' // Primary CTA style
                                     : 'bg-transparent border border-white text-white hover:border-[#00FFFF]' // Secondary CTA style, border-aqua on hover
                                 }`}>
                Get Started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing