"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, MapPin, GraduationCap, Award, ChevronDown, ChevronUp, Image as ImageIcon } from "lucide-react";

const certificatesData = [
  { id: 1, title: "Full-Stack Web Dev", issuer: "Bootcamp", image: "" },
  { id: 2, title: "Machine Learning Basics", issuer: "Online Course", image: "" },
  { id: 3, title: "UI/UX Foundations", issuer: "Design Institute", image: "" }
];

export default function About() {
  const [showCerts, setShowCerts] = useState(false);
  const [activeCert, setActiveCert] = useState(certificatesData[0]);

  return (
    <section id="about" className="py-24 px-4 bg-transparent flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold  text-zinc-200 ">Who Am I?</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        
        {/* 1. ABOUT ME BIO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="col-span-1 md:col-span-2 bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-slate-500 dark:text-zinc-400" size={24} />
            <h3 className="text-2xl font-bold text-slate-800 dark:text-zinc-200">About Me</h3>
          </div>
          
          <blockquote className="border-l-4 border-slate-300 dark:border-zinc-500 pl-4 italic text-slate-700 dark:text-zinc-200 mb-6 text-xl md:text-2xl font-medium">
            “Creating digital experiences that feel as good as they function.”
          </blockquote>
          
          <div className="text-slate-600 dark:text-zinc-400 leading-relaxed text-lg space-y-4">
            <p>
              I am a Full-Stack and Creative Developer dedicated to blending clean logic with high-fidelity aesthetics. My foundation spans modern web technologies like React, Next.js, and Node.js, but my true passion lies at the intersection of web development and Artificial Intelligence.
            </p>
            <p>
              I enjoy exploring how machine learning models, such as CNNs and LSTMs, and Agentic Engineering can be applied to solve real-world problems. Whether I am architecting complex centralized systems, developing AI-powered applications, or taking a creative break to craft pixel art games in the Godot engine, I approach every project with a focus on modern, responsive, and user-centric design.
            </p>
          </div>
        </motion.div>

        {/* 2. EDUCATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center hover:bg-slate-50 dark:hover:bg-black/50 transition-colors shadow-sm dark:shadow-none"
        >
          <GraduationCap className="text-slate-500 dark:text-zinc-400 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-zinc-200">Education</h3>
          <p className="text-slate-700 dark:text-zinc-200 font-medium text-lg">B.S. Computer Science</p>
          <p className="text-slate-500 dark:text-zinc-400 mb-2">ICI College</p>
          <span className="bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-300 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mt-2">
            3rd Year Student
          </span>
        </motion.div>

        {/* 3. LOCATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center hover:bg-slate-50 dark:hover:bg-black/50 transition-colors shadow-sm dark:shadow-none"
        >
          <MapPin className="text-slate-500 dark:text-zinc-400 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3 text-slate-800 dark:text-zinc-200">Location</h3>
          <p className="text-slate-700 dark:text-zinc-200 font-medium text-lg">City of San Jose Del Monte</p>
          <p className="text-slate-500 dark:text-zinc-400">Bulacan, Philippines</p>
        </motion.div>

        {/* 4. CERTIFICATES STRETCHED CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="col-span-1 md:col-span-2 w-full"
        >
          {/* Main Toggle Button */}
          <button
            onClick={() => setShowCerts(!showCerts)}
            className="w-full bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-black transition-colors cursor-pointer shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <Award className="text-slate-500 dark:text-zinc-400" size={24} />
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200">Certificates</h3>
            </div>
            {showCerts ? <ChevronUp className="text-slate-500 dark:text-zinc-400" /> : <ChevronDown className="text-slate-500 dark:text-zinc-400" />}
          </button>

          {/* Expandable Folder Layout */}
          <AnimatePresence>
            {showCerts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden mt-4"
              >
                {/* The Folder Tabs (Horizontal) */}
                <div className="flex overflow-x-auto hide-scrollbar gap-1 px-4 border-b border-slate-200 dark:border-zinc-800 md:-translate-x-4">
                  {certificatesData.map((cert) => {
                    const isActive = activeCert.id === cert.id;
                    return (
                      <button
                        key={cert.id}
                        onClick={() => setActiveCert(cert)}
                        className={`px-6 py-3 font-semibold text-sm whitespace-nowrap rounded-t-xl border-t border-x transition-colors ${
                          isActive 
                            ? "bg-slate-100 border-slate-200 text-slate-900 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white" 
                            : "bg-white border-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-50 dark:bg-black dark:border-zinc-900 dark:text-zinc-500 dark:hover:text-zinc-300 dark:hover:bg-black"
                        }`}
                      >
                        {cert.title}
                      </button>
                    );
                  })}
                </div>

                {/* The Folder Content Area */}
                <div className="bg-slate-100 dark:bg-zinc-800 border-x border-b border-slate-200 dark:border-zinc-700 rounded-b-2xl p-6 md:p-8 flex flex-col items-center justify-center min-h-[300px]">
                  
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeCert.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="w-full flex flex-col items-center text-slate-800 dark:text-zinc-200"
                    >
                      {/* Image Placeholder Box */}
                      <div className="w-full max-w-2xl aspect-[4/3] md:aspect-[16/9] border-2 border-dashed border-slate-300 dark:border-zinc-600 rounded-xl flex flex-col items-center justify-center bg-white/50 dark:bg-black/50 mb-4">
                        {activeCert.image ? (
                          <img 
                            src={activeCert.image} 
                            alt={activeCert.title} 
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <>
                            <ImageIcon size={48} className="text-slate-400 dark:text-zinc-700 mb-2" />
                            <p className="text-slate-500 dark:text-zinc-500 text-sm font-medium">Certificate Image Placeholder</p>
                          </>
                        )}
                      </div>
                      
                      <h4 className="text-slate-900 dark:text-white font-bold text-lg">{activeCert.title}</h4>
                      <p className="text-slate-500 dark:text-zinc-400 text-sm">Issued by {activeCert.issuer}</p>
                    </motion.div>
                  </AnimatePresence>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}