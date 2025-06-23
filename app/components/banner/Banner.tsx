export default function CTASection() {
  return (
    <section className="relative bg-gradient-to-b from-[#0D0D0D] to-blue-950 text-white py-20 px-4 text-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-bold mb-4">
          Ready to level up your school?{" "}
          <span className="inline-block">🚀</span>
        </h2>
        <p className="text-lg sm:text-xl text-white/80 mb-10">
          Join thousands of students, teachers, and schools already using our
          platform to transform their educational experience.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
          <button className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition">
            Get Started Now
          </button>
          <button className="bg-white text-purple-700 font-semibold py-3 px-6 rounded-full shadow-md hover:shadow-lg transition">
            Book a Demo
          </button>
        </div>

        <p className="text-white/70 mb-6 text-sm">
          No credit card required • No pressure • Free forever
        </p>

        <div className="flex justify-center flex-wrap gap-6 text-white/90 text-sm">
          <div className="flex items-center gap-2">
            ⚡ <span>Setup in 5 minutes</span>
          </div>
          <div className="flex items-center gap-2">
            🛡️ <span>100% Secure</span>
          </div>
          <div className="flex items-center gap-2">
            💬 <span>24/7 Support</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full h-32 overflow-hidden pointer-events-none">
        {/* Glowing dots */}
        <div className="w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-ping absolute left-[30%] bottom-4"></div>
        <div className="w-1.5 h-1.5 bg-purple-500 rounded-full opacity-40 animate-pulse absolute left-[60%] bottom-10"></div>
        <div className="w-2 h-2 bg-blue-400 rounded-full opacity-50 animate-ping absolute left-[45%] bottom-2"></div>

        {/* Squares */}
        <div className="w-2 h-2 bg-pink-400 animate-bounce absolute left-[20%] bottom-8 rotate-12"></div>
        <div className="w-2.5 h-2.5 bg-green-400 animate-pulse absolute left-[50%] bottom-14 rotate-45"></div>

        {/* Triangles (using clip-path magic) */}
        <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[10px] border-b-yellow-400 absolute left-[70%] bottom-5 animate-ping opacity-60"></div>
        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-b-[9px] border-b-pink-500 absolute left-[35%] bottom-10 animate-bounce"></div>

        {/* Star-like shape (plus) */}
        <div className="absolute left-[15%] bottom-6 w-[1px] h-3 bg-white animate-pulse rotate-45"></div>
        <div className="absolute left-[15%] bottom-6 w-3 h-[1px] bg-white animate-pulse rotate-45"></div>

        {/* Mini circle */}
        <div className="w-1.5 h-1.5 bg-orange-400 rounded-full opacity-70 animate-ping absolute left-[80%] bottom-3"></div>

        {/* Tiny diamond */}
        <div className="w-2 h-2 bg-indigo-500 rotate-45 absolute left-[90%] bottom-12 animate-bounce opacity-60"></div>
      </div>
    </section>
  );
}
