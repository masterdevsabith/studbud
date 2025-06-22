export default function CTASection() {
  return (
    <section className="bg-gradient-to-r from-sky-600 to-blue-500 text-white py-20 px-4 text-center">
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
    </section>
  );
}
