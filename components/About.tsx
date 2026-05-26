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

  return (
    <section id="about" className="py-24 px-4 bg-transparent flex flex-col items-center">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-16 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-200">Who Am I?</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
        
        {/* 1. ABOUT ME BIO CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="col-span-1 md:col-span-2 bg-black dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 hover:bg-slate-50 dark:hover:bg-black/50 transition-colors shadow-sm dark:shadow-none"
        >
          <div className="flex items-center gap-3 mb-6">
            <BookOpen className="text-slate-500 dark:text-zinc-400" size={24} />
            <h3 className="text-2xl font-bold text-zinc-100">About Me</h3>
          </div>
          
          <blockquote className="border-l-4 border-slate-300 dark:border-zinc-500 pl-4 italic text-zinc-100 mb-6 text-xl md:text-2xl font-medium">
            “Creating digital experiences that feel as good as they function.”
          </blockquote>
          
          <div className="text-zinc-100 leading-relaxed text-lg space-y-4">
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
          className="bg-black dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center hover:bg-slate-50 dark:hover:bg-black/50 transition-colors shadow-sm dark:shadow-none"
        >
          <GraduationCap className="text-slate-500 dark:text-zinc-400 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3 text-zinc-100">Education</h3>
          <p className="text-zinc-100 font-medium text-lg">B.S. Computer Science</p>
          <p className="text-zinc-100 mb-2">ICI College</p>
          <span className="bg-slate-100 dark:bg-zinc-800 text-zinc-100 text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full mt-2">
            3rd Year Student
          </span>
        </motion.div>

        {/* 3. LOCATION CARD */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-black dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-8 flex flex-col justify-center items-center text-center hover:bg-slate-50 dark:hover:bg-black/50 transition-colors shadow-sm dark:shadow-none"
        >
          <MapPin className="text-slate-500 dark:text-zinc-400 mb-4" size={40} />
          <h3 className="text-xl font-bold mb-3 text-zinc-100">Location</h3>
          <p className="text-zinc-100 font-medium text-lg">City of San Jose Del Monte</p>
          <p className="text-zinc-100">Bulacan, Philippines</p>
        </motion.div>

        {/*
        <motion.div //4. CERTIFICATES STRETCHED CARD
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="col-span-1 md:col-span-2 w-full"
        >
        
          <button //Main Toggle Button
            onClick={() => setShowCerts(!showCerts)}
            className="w-full bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-2xl p-6 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-zinc-900 transition-colors cursor-pointer shadow-sm dark:shadow-none"
          >
            <div className="flex items-center gap-3">
              <Award className="text-slate-500 dark:text-zinc-400" size={24} />
              <h3 className="text-xl font-bold text-slate-800 dark:text-zinc-200">Certificates</h3>
            </div>
            {showCerts ? <ChevronUp className="text-slate-500 dark:text-zinc-400" /> : <ChevronDown className="text-slate-500 dark:text-zinc-400" />}
          </button> 

          <AnimatePresence>
            {showCerts && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: 1, 
                  height: "auto", 
                  transitionEnd: { overflow: "visible" } 
                }}
                exit={{ opacity: 0, height: 0, overflow: "hidden" }}
                transition={{ duration: 0.4 }}
                style={{ overflow: "hidden" }} 
                className="w-full mt-6"
              >  

                <div className="flex flex-col gap-[35vh] md:gap-[45vh] pb-[10vh] relative">
                  {certificatesData.map((cert, index) => { //sticky scroll stack
                    // Offsets each card slightly down from the top so they stack like a physical deck
                    const stickyTopOffset = 80 + (index * 20);

                    return (
                      <div
                        key={cert.id}
                        style={{ top: `${stickyTopOffset}px` }}
                        className="sticky w-full h-[60vh] md:h-[70vh] bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-3xl p-4 md:p-6 shadow-2xl flex flex-col items-center z-10 transition-colors"
                      >
                        <div className="w-full flex-1 rounded-2xl bg-slate-100 dark:bg-zinc-900 border border-slate-200 dark:border-zinc-800 mb-4 overflow-hidden flex items-center justify-center relative shadow-inner">
                          {cert.image ? (
                            <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="flex flex-col items-center justify-center text-slate-400 dark:text-zinc-600">
                              <ImageIcon size={48} className="mb-2 opacity-50 md:scale-125" />
                              <p className="font-semibold tracking-wide text-xs md:text-sm mt-2">CERTIFICATE IMAGE</p>
                            </div>
                          )}
                        </div>

                        <div className="w-full text-center pb-2">
                          <h4 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">{cert.title}</h4>
                          <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base font-medium mt-1">Issued by {cert.issuer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>  CERTIFICATES STRETCHED CARD */}

      </div>
    </section>
  );
}