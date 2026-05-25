"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Briefcase, GitBranch, Users, Phone, ArrowUpRight } from "lucide-react";

const contactData = [
  { 
    id: "gmail", 
    platform: "Gmail", 
    info: "gabrielacecasera@gmail.com", 
    icon: Mail, 
    link: "https://mail.google.com/mail/u/0/#inbox?compose=CllgCHrgmFtVxCzLBVkqPVHtNTzzsJxwFHlDntZSxSsCsRbhfkCKqjQDxrssJfcmPldTqPJcrbV",
    highlight: "Best way to contact me"
  },
  { 
    id: "linkedin", 
    platform: "LinkedIn", 
    info: "linkedin.com/in/AceCasera", 
    icon: Briefcase, 
    link: "https://www.linkedin.com/in/gabriel-ace-casera-4aa893406/" 
  },
  { 
    id: "github", 
    platform: "GitHub", 
    info: "github.com/AceCasera", 
    icon: GitBranch, 
    link: "https://github.com/acielace" 
  },
  { 
    id: "facebook", 
    platform: "Facebook", 
    info: "facebook.com/Ace.Casera", 
    icon: Users, 
    link: "https://www.facebook.com/Blrryf.Ace21" 
  },
  { 
    id: "phone", 
    platform: "Phone Number", 
    info: "+63 9919236036", 
    icon: Phone, 
    link: "tel:+639919236036" 
  }
];

const animatedWords = ["Build.", "Create.", "Innovate.", "Collaborate.", "Design."];

export default function Contact() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="contact" className="py-24 px-4 bg-transparent flex flex-col items-center min-h-[80vh] justify-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-16 text-center max-w-3xl w-full"
      >
        {/* === UPDATED: LOCKED CENTER CAROUSEL HEADING === */}
        <h2 className="text-4xl md:text-6xl font-bold mb-4 flex w-full md:-translate-x-6">
          
          {/* LEFT HALF (Transitions correctly) */}
          <div className="w-1/2 flex justify-end pr-2 md:pr-3 text-zinc-200 transition-colors">
            Let's
          </div>
          
          {/* RIGHT HALF (Transitions correctly) */}
          <div className="w-1/2 flex justify-start pl-2 md:pl-3">
            <span className="inline-grid">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={animatedWords[wordIndex]}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="col-start-1 row-start-1 text-slate-500 dark:text-zinc-400 text-left transition-colors"
                >
                  {animatedWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </div>
        </h2>
        
        {/* TEXT BLOCKS (Transition correctly) */}
        <h3 className="text-xl md:text-2xl font-medium text-zinc-200 mb-6 uppercase tracking-widest text-sm transition-colors">
          Get In Touch
        </h3>
        
        <p className="text-zinc-300 text-base md:text-lg leading-relaxed max-w-2xl transition-colors">
          I am a 3rd-year Computer Science student actively seeking an <span className="text-white font-medium transition-colors">On-the-Job Training (OJT)</span> opportunity. 
          If you are looking for a dedicated developer to assist with full-stack development, UI/UX implementation, or applied AI projects, I would love to connect.
        </p>
      </motion.div>

      {/* 5-COLUMN COMPACT CONTACT GRID */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 w-full max-w-6xl">
        {contactData.map((contact, index) => {
          const IconComponent = contact.icon;
          const isWebLink = contact.link.startsWith("http");
          
          return (
            <motion.a
              key={contact.id}
              href={contact.link}
              target={isWebLink ? "_blank" : undefined}
              rel={isWebLink ? "noopener noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              // === HEX CODE HACK APPLIED BELOW ===
              // Background and border locked to dark colors
              className="group relative bg-[#000000]/80 border border-[#27272a] p-4 rounded-xl flex flex-col items-start gap-3 hover:border-[#52525b] hover:bg-[#18181b] transition-all cursor-pointer shadow-lg backdrop-blur-sm"
            >
              {isWebLink && (
                <ArrowUpRight 
                  size={16} 
                  className="absolute top-4 right-4 text-[#52525b] group-hover:text-[#ffffff] transition-colors" 
                />
              )}

              <div className="flex items-center gap-2">
                <div className="bg-[#000000] p-2 rounded-md border border-[#27272a] text-[#d4d4d8] group-hover:text-[#0ea5e9] transition-colors">
                  <IconComponent size={16} />
                </div>
                {/* Text locked to white */}
                <h3 className="font-bold text-sm text-[#ffffff] transition-colors">
                  {contact.platform}
                </h3>
              </div>

              <div className="mt-1 w-full">
                {/* Text locked to light gray */}
                <p className="text-[#a1a1aa] font-medium text-xs group-hover:text-[#d4d4d8] transition-colors truncate">
                  {contact.info}
                </p>
                
                {contact.highlight && (
                  <p className="text-[9px] font-bold uppercase tracking-wider text-[#10b981] mt-2 bg-[#10b981]/10 inline-block px-1.5 py-0.5 rounded">
                    {contact.highlight}
                  </p>
                )}
              </div>
            </motion.a>
          );
        })}
      </div>

    </section>
  );
}