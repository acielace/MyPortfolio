"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";

export default function Hero() {
  return (
    // FIX 1: Changed pt-20 to pt-12 md:pt-20 to lift the whole section on mobile
    <section id="home" className="min-h-screen pt-20 md:pt-20 flex flex-col md:flex-row justify-between items-center px-6 max-w-6xl mx-auto gap-12">
      
      {/* LEFT SIDE: Text and Button */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 text-center md:text-left md:-translate-y-6 flex flex-col items-center md:items-start w-full"
      >

        {/* FIX 2: Changed mb-4 to mb-0 md:mb-4 to remove the gap below "Deploy" on mobile */}
        <h1 className="text-6xl md:text-6xl font-bold tracking-tight text-zinc-200 mb-0 md:mb-4 leading-tight">
          Design. Develop. <br /> <span className="text-zinc-400 dark:text-zinc-600">Deploy.</span>
        </h1>
        
        {/* ========================================================
            MOBILE-ONLY IMAGE
            FIX 3: Replaced 'my-8' with '-mt-4 mb-2 scale-[0.85] sm:scale-100 origin-top'. 
            This pulls it up tightly against the text and shrinks it 15% to save bottom space!
            ======================================================== */}
        <div className="flex md:hidden relative w-72 h-[310px] items-end justify-center mt-0 mb-6 scale-[0.85] sm:scale-100 origin-top">
          
          <div className="absolute bottom-0 w-72 h-72 bg-zinc-800 rounded-full"></div>
          
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute bottom-0 w-72 h-72 z-10 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            <path
              id="circlePathMobile"
              d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
              fill="none"
            />
            <text className="text-[9px] uppercase tracking-[0.22em] fill-zinc-400/50 font-bold">
              <textPath href="#circlePathMobile" startOffset="0%">
                Inspire  •  Create  •  Build  •  Develop  •  Invent  •  Debug  •  Deploy  •  Launch  •  Code    •
              </textPath>
            </text>
          </motion.svg>
          
          <div className="absolute bottom-0 w-72 h-[380px] overflow-hidden rounded-b-full flex items-end justify-center z-20">
            <img 
              src="/profile.png" 
              alt="Ace Casera Profile" 
              className="w-[95%] h-auto object-contain drop-shadow-2xl scale-110 origin-bottom"
            />
          </div>
        </div>
        {/* ======================================================== */}

        <h2 className="text-xl md:text-2xl font-medium text-zinc-200 mb-4">
          Hi there, I'm Ace
        </h2>
        
        {/* Minor tweak: reduced bottom margin from mb-8 to mb-6 on mobile */}
        <p className="text-base md:text-lg text-zinc-400 max-w-lg mb-6 md:mb-8 mx-auto md:mx-0 leading-relaxed">
          Creative Developer and 3rd-year CS student with a passion for high-fidelity UI/UX and intelligent systems.
          Seeking an OJT opportunity to apply and further develop software development and applied AI skills, 
          with a strong interest in building user-centric applications powered by machine learning.
        </p>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-zinc-800 bg-black/50 backdrop-blur-sm mb-6 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-medium text-zinc-300 uppercase tracking-widest">
            Open for OJT
          </span>
        </div>

        <motion.a
          href="/Ace_Casera_Resume.pdf" 
          download="Ace_Casera_Resume.pdf" 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-sky-500 text-black dark:text-white border-sky-500 px-6 py-3 rounded-full font-medium hover:bg-sky-400 transition-colors mx-auto md:mx-0 mb-6"
        >
          <Download size={20} /> Download CV
        </motion.a>
      </motion.div>

      {/* RIGHT SIDE: The Image Effect (NOW DESKTOP ONLY) */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex flex-1 justify-end md:-translate-y-16 md:-translate-x-12"
      >
        <div className="relative w-96 h-[500px] flex items-end justify-center">
          
          <div className="absolute bottom-0 w-96 h-96 bg-zinc-800 rounded-full"></div>
          
          <motion.svg
            viewBox="0 0 200 200"
            className="absolute bottom-0 w-96 h-96 z-10 pointer-events-none"
            animate={{ rotate: 360 }}
            transition={{ ease: "linear", duration: 25, repeat: Infinity }}
          >
            <path
              id="circlePath"
              d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0"
              fill="none"
            />
            <text className="text-[9px] uppercase tracking-[0.22em] fill-zinc-400/50 font-bold">
              <textPath href="#circlePath" startOffset="0%">
                Inspire  •  Create  •  Build  •  Develop  •  Invent  •  Debug  •  Deploy  •  Launch  •  Code    •
              </textPath>
            </text>
          </motion.svg>
          
          <div className="absolute bottom-0 w-96 h-[500px] overflow-hidden rounded-b-full flex items-end justify-center z-20">
            <img 
              src="/profile.png" 
              alt="Ace Casera Profile" 
              className="w-[95%] h-auto object-contain drop-shadow-2xl scale-125 origin-bottom"
            />
          </div>
          
        </div>
      </motion.div>

    </section>
  );
}