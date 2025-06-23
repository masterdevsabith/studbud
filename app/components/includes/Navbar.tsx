export default function NavBar() {
  return (
    <header className="fixed z-50 px-6 py-3 mt-10 rounded-3xl right-1/2 transform translate-x-1/2 bg-white/5 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0 border border-neutral-700">
      <nav className="flex items-center justify-center">
        <ul className="flex gap-10 text-neutral-400">
          <li>Home</li>
          <li>About</li>
          <li>Work</li>
          <li>Blog</li>
          <li>More</li>
          <li>Book a call</li>
        </ul>
      </nav>
    </header>
  );
}
