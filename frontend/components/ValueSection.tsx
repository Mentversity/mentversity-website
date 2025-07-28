import { BarChart3, Users, Award, TrendingUp } from 'lucide-react'

const ValueSection = () => {
  // Define the total maximum learners for the chart's percentage calculation.
  // Assuming 50K is the peak or target for the chart's scale.
  const CHART_MAX_LEARNERS_K = 50; // Represents 50,000 learners

  return (
    <section className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 bg-[#0B132B] font-['Inter',_sans-serif]">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h2 className="font-['Sora',_sans-serif] text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight mb-4">
            Our <span className="text-[#00C896]">Impact</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-2xl mx-auto font-medium">
            Real numbers that showcase our commitment to student success.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Stats Cards */}
          <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
            {/* Card 1: Total Learners */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                           transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg group">
              <div className="flex items-center gap-3 mb-4">
                <Users className="text-[#00FFFF]" size={28} /> {/* Accent color aqua */}
                <h3 className="font-['Poppins',_sans-serif] text-white font-semibold text-lg">Total Learners</h3>
              </div>
              {/* Rounded numeric display font - using a system font that often looks rounded or a custom font like 'Orbitron' if imported */}
              <div className="text-4xl lg:text-5xl font-['Sora',_sans-serif] font-bold text-[#00FFFF] mb-2 leading-none">1000+</div>
              <p className="text-gray-300 text-sm font-medium">Active students worldwide</p>
            </div>

            {/* Card 2: Success Rate */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                           transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg group">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-[#E4FF1A]" size={28} /> {/* Accent color electric yellow */}
                <h3 className="font-['Poppins',_sans-serif] text-white font-semibold text-lg">Success Rate</h3>
              </div>
              <div className="text-4xl lg:text-5xl font-['Sora',_sans-serif] font-bold text-[#E4FF1A] mb-2 leading-none">95%</div>
              <p className="text-gray-300 text-sm font-medium">Course completion rate</p>
            </div>

            {/* Card 3: Job Placements */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                           transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg group">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-[#00C896]" size={28} /> {/* Primary green */}
                <h3 className="font-['Poppins',_sans-serif] text-white font-semibold text-lg">Job Placements</h3>
              </div>
              <div className="text-4xl lg:text-5xl font-['Sora',_sans-serif] font-bold text-[#00C896] mb-2 leading-none">90%</div>
              <p className="text-gray-300 text-sm font-medium">Students placed in companies</p>
            </div>

            {/* Card 4: Avg Salary Hike */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                           transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg group">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="text-[#A1FFCE]" size={28} /> {/* Secondary lime gradient start */}
                <h3 className="font-['Poppins',_sans-serif] text-white font-semibold text-lg">Avg Salary Hike</h3>
              </div>
              <div className="text-4xl lg:text-5xl font-['Sora',_sans-serif] font-bold text-[#A1FFCE] mb-2 leading-none">180%</div>
              <p className="text-gray-300 text-sm font-medium">Average salary increase</p>
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-gray-700 shadow-md
                       transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-lg">
            <h3 className="font-['Sora',_sans-serif] text-white font-semibold text-xl mb-6">Student Growth Over Time</h3>
            <div className="space-y-6"> {/* Increased space for clarity */}
              {/* Data points for the "chart" - values are now in thousands, total is 50 for 50K */}
              {[
                { year: '2021', value: 5, color: '#00C896' }, // 5K learners
                { year: '2022', value: 15, color: '#00C896' }, // 15K learners
                { year: '2023', value: 35, color: '#00C896' }, // 35K learners
                { year: '2024', value: 50, color: '#00C896' }, // 50K learners
              ].map((data, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span className="text-gray-300 font-medium text-lg w-16">{data.year}</span>
                  <div className="flex-1 mx-4 bg-gray-700 rounded-full h-4 relative overflow-hidden"> {/* Increased height for visual weight */}
                    <div
                      className="h-full rounded-full transition-all duration-700 ease-out"
                      // Calculate width based on value relative to CHART_MAX_LEARNERS_K
                      style={{ width: `${(data.value / CHART_MAX_LEARNERS_K) * 100}%`, backgroundColor: data.color }}
                    ></div>
                  </div>
                  {/* Display percentage */}
                  <span className="text-[#00C896] font-['Sora',_sans-serif] font-bold text-lg w-16 text-right">
                    {Math.round((data.value / CHART_MAX_LEARNERS_K) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default ValueSection
