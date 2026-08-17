"use client";

export default function Navbar() {
  return (
    <div className="fixed top-4 md:top-2 left-0 w-full z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      <nav className="transform-gpu pointer-events-auto bg-black/30 backdrop-blur-md border border-zinc-800 rounded-full px-3 sm:px-6 py-3 flex items-center justify-between w-full max-w-3xl shadow-2xl">

        <a href="#home" className="flex items-center justify-center hover:opacity-80 transition-opacity shrink-0">
          <img src="/logo/logo.png" alt="Home" className="w-8 h-8 object-contain" />
        </a>

        <div className="flex justify-center gap-2 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base font-medium px-1 sm:px-2">
          <a href="#about" className="text-white hover:text-sky-400 transition-colors whitespace-nowrap">About Me</a>
          <a href="#skills" className="text-white hover:text-sky-400 transition-colors whitespace-nowrap">Skills</a>
          <a href="#projects" className="text-white hover:text-sky-400 transition-colors whitespace-nowrap">Projects</a>
          <a href="#contact" className="text-white hover:text-sky-400 transition-colors whitespace-nowrap">Contacts</a>
        </div>

        {/* Spacer to keep the logo/links centered without the toggle button */}
        <div className="w-8 h-8 shrink-0" />

      </nav>
    </div>
  );
}