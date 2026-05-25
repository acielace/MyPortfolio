"use client";

import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Navbar() {
  const [isLightMode, setIsLightMode] = useState(false);

  // This handles the actual switching of the theme on the HTML tag
  const toggleTheme = () => {
    const newTheme = !isLightMode;
    setIsLightMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("light-theme");
    } else {
      document.documentElement.classList.remove("light-theme");
    }
  };

  return (
    <div className="fixed top-4 md:top-2 left-0 w-full z-50 flex justify-center px-2 sm:px-4 pointer-events-none">
      
      <nav className="transform-gpu pointer-events-auto bg-black/30 backdrop-blur-md border border-zinc-800 rounded-full px-3 sm:px-6 py-3 flex items-center justify-between w-full max-w-3xl shadow-2xl">
        
        {/* === FAR LEFT: The Logo === */}
        <a href="#home" className="flex items-center justify-center hover:opacity-80 transition-opacity shrink-0">
          {/* === UPDATED: Dynamically swap the image source based on theme === */}
          <img 
            src={isLightMode ? "/logo/logo1.png" : "/logo/logo.png"} 
            alt="Home" 
            className="w-8 h-8 object-contain" 
          />
        </a>
        
        {/* === CENTER: The Navigation Links === */}
        <div className="flex justify-center gap-2 sm:gap-6 md:gap-8 text-xs sm:text-sm md:text-base font-medium px-1 sm:px-2">
          <a href="#about" className=" hover:text-black text-white transition-colors whitespace-nowrap">About Me</a>
          <a href="#skills" className=" hover:text-black text-white transition-colors whitespace-nowrap">Skills</a>
          <a href="#projects" className=" hover:text-black text-white transition-colors whitespace-nowrap">Projects</a>
          <a href="#contact" className=" hover:text-black text-white transition-colors whitespace-nowrap">Contacts</a>
        </div>

        {/* === FAR RIGHT: THE NEW THEME TOGGLE === */}
        <button 
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800/50 text-zinc-600 dark:text-zinc-400 hover:text-black dark:text-white hover:bg-zinc-700/50 transition-all shrink-0"
          aria-label="Toggle Theme"
        >
          {isLightMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        
      </nav>
      
    </div>
  );
}