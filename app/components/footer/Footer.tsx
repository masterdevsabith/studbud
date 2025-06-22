export default function Footer() {
  return (
    <footer className="bg-[#0D1117] text-white px-6 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-sm">
        {/* Logo & Description */}
        <div>
          <div className="flex items-center mb-4">
            <div className="bg-gradient-to-r from-sky-500 to-sky-700 text-white font-bold rounded-lg w-10 h-10 flex items-center justify-center text-xl">
              S
            </div>
            <span className="ml-2 text-xl font-bold">StudBud</span>
          </div>
          <p className="text-gray-400">
            Revolutionizing School Life, One Dashboard at a Time
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-white font-semibold mb-3">Navigation</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Pricing</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <a href="#">Contact</a>
            </li>
            <li>
              <a href="#">Blog</a>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-white font-semibold mb-3">Resources</h3>
          <ul className="space-y-2 text-gray-400">
            <li>
              <a href="#">Help Center</a>
            </li>
            <li>
              <a href="#">API Docs</a>
            </li>
            <li>
              <a href="#">Privacy Policy</a>
            </li>
            <li>
              <a href="#">Terms of Service</a>
            </li>
            <li>
              <a href="#">Status Page</a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold mb-3">Get in Touch</h3>
          <ul className="space-y-3 text-gray-400">
            <li className="flex items-center gap-2">
              <span>📧</span> hello@schoolhub.com
            </li>
            <li className="flex items-center gap-2">
              <span>📞</span> (555) 123-SCHOOL
            </li>
            <li className="flex gap-3 mt-4">
              <span className="bg-gray-800 p-2 rounded-full">🧑‍💻</span>
              <span className="bg-gray-800 p-2 rounded-full">🦩</span>
              <span className="bg-gray-800 p-2 rounded-full">📸</span>
              <span className="bg-gray-800 p-2 rounded-full">💼</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-400 text-sm">
        © 2024 StudBud. All rights reserved. Made with
        <span className="text-red-500">❤️</span> for educators worldwide.
      </div>
    </footer>
  );
}
