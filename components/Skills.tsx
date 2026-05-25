"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code, 
  Layers, 
  Terminal, 
  Cpu, 
  Workflow, 
  Gamepad2, 
  FileCode2, 
  GitBranch,
  Grid,
  Sparkles
} from "lucide-react";

const skillsData = [
  { name: "Next.js", icon: Code, desc: "Building highly interactive, high-fidelity user interfaces and fast web applications using the modern App Router." },
  { name: "Tailwind", icon: Layers, desc: "Crafting minimalist, pixel-perfect, and fully responsive layouts quickly using atomic utility classes." },
  { name: "Node.js", icon: Terminal, desc: "Architecting clean, scalable backend servers and centralized API management frameworks." },
  { name: "Python AI", icon: Cpu, desc: "Developing intelligent applications using Machine Learning frameworks, including CNNs and LSTMs." },
  { name: "Agentic", icon: Workflow, desc: "Designing automated workflow pipelines, dynamic systems, and smart algorithmic execution layers." },
  { name: "Godot", icon: Gamepad2, desc: "Building modular games and designing beautiful custom 2D environments using pixel art assets." },
  { name: "TypeScript", icon: FileCode2, desc: "Writing safe, structured, and production-ready code with explicit types to eliminate interface bugs." },
  { name: "GitHub", icon: GitBranch, desc: "Managing repository version control, collaborative code syncing, and streamlined deployment paths." }
];

export default function Skills() {
  const [activeSkill, setActiveSkill] = useState<typeof skillsData[0] | null>(null);
  const [showGrid, setShowGrid] = useState(false);

  const visibleSkills = showGrid ? skillsData : [...skillsData, ...skillsData];

  const handleSkillClick = (skill: typeof skillsData[0]) => {
    if (activeSkill?.name === skill.name) {
      setActiveSkill(null); 
    } else {
      setActiveSkill(skill); 
    }
  };

  return (
    <section id="skills" className="py-24 bg-transparent flex flex-col items-center">
      
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-12 text-center px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-zinc-200">Core Skills</h2>
        <p className="text-slate-500 dark:text-zinc-500 text-sm md:text-base mb-6">
          Click a track to inspect applications. Use the control button to morph the layout system.
        </p>

        <button
          onClick={() => {
            setShowGrid(!showGrid);
            setActiveSkill(null); 
          }}
          className="flex items-center gap-2 bg-white dark:bg-black border border-slate-200 dark:border-zinc-800 text-slate-700 dark:text-zinc-300 px-5 py-2.5 rounded-full text-sm font-semibold hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-zinc-900 hover:border-slate-300 dark:hover:border-zinc-700 transition-colors cursor-pointer shadow-sm dark:shadow-md"
        >
          {showGrid ? <Sparkles size={16} /> : <Grid size={16} />}
          <span>{showGrid ? "Activate Ticker Mode" : "Morph to Grid View"}</span>
        </button>
      </motion.div>

      {/* === THE HYBRID MORPHING CONTAINER === */}
      <div className="w-full max-w-4xl mx-auto px-4 mb-12">
        <motion.div 
          layout="position"
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="relative w-full rounded-2xl border border-slate-200 dark:border-zinc-800 bg-slate-100/50 dark:bg-black/20 p-6 flex items-center overflow-hidden shadow-inner dark:shadow-none"
        >
          <motion.div
            className={
              showGrid 
                ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 w-full" 
                : "flex whitespace-nowrap gap-4 pr-4"
            }
            animate={showGrid ? { x: 0 } : { x: ["0%", "-50%"] }}
            transition={
              showGrid 
                ? { type: "spring", stiffness: 100, damping: 15 } 
                : { ease: "linear", duration: 25, repeat: Infinity }
            }
            whileHover={showGrid ? {} : { animationPlayState: "paused" }}
          >
            {visibleSkills.map((skill, index) => {
              const IconComponent = skill.icon;
              const isSelected = activeSkill?.name === skill.name;
              
              return (
                <button
                  key={`${skill.name}-${index}`}
                  onClick={() => handleSkillClick(skill)}
                  className={`inline-flex items-center gap-2.5 rounded-xl border font-semibold tracking-wide cursor-pointer transition-all duration-300 select-none ${
                    showGrid 
                      ? "flex-col py-6 px-4 text-center justify-center h-28 w-full" 
                      : "px-5 py-3.5 text-base flex-row flex-shrink-0"
                  } ${
                    isSelected
                      ? "bg-sky-500 text-white border-sky-500 shadow-lg shadow-sky-500/20"
                      : "bg-white dark:bg-black text-slate-700 dark:text-zinc-300 border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700 hover:bg-slate-50 dark:hover:bg-black"
                  }`}
                >
                  <IconComponent 
                    size={showGrid ? 24 : 18} 
                    className={isSelected ? "text-white" : "text-slate-500 dark:text-zinc-400"} 
                  />
                  <span className={showGrid ? "text-sm md:text-base font-medium" : "text-base"}>
                    {skill.name}
                  </span>
                </button>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* DYNAMIC DETAILS PANEL */}
      <div className="w-full max-w-2xl px-6 h-32 flex items-start justify-center">
        <AnimatePresence mode="wait">
          {activeSkill ? (
            <motion.div
              key={activeSkill.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="w-full bg-white/80 dark:bg-black/50 border border-slate-200 dark:border-zinc-800/80 rounded-2xl p-6 text-center md:text-left shadow-xl backdrop-blur-sm"
            >
              <h3 className="text-lg font-bold text-slate-800 dark:text-zinc-200 mb-2 tracking-wide uppercase">
                {activeSkill.name} Application
              </h3>
              <p className="text-slate-600 dark:text-zinc-400 leading-relaxed text-sm md:text-base">
                {activeSkill.desc}
              </p>
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              className="text-slate-500 dark:text-zinc-500 italic text-sm tracking-wide"
            >
              Select a track above to review contextual proficiency.
            </motion.p>
          )}
        </AnimatePresence>
      </div>

    </section>
  );
}