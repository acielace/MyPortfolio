"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Eye, Code2, X } from "lucide-react";

// === 1. UPDATED DATA: Added a 'gallery' array to hold the 4 side images ===
const projectsData = [
  {
    id: "LinkUp",
    title: "LinkUp",
    category: "Social Platform",
    image: "/projectimages/LinkUp/LinkUpLogo.png",
    video: "", 
    gallery: [
      "/projectimages/LinkUp/LinkUp1.png",
      "/projectimages/LinkUp/LinkUp2.png",
      "/projectimages/LinkUp/LinkUp3.png",
      "/projectimages/LinkUp/LinkUp4.png"
    ],
    color: "from-indigo-900 to-zinc-900",
    desc: "A custom social platform combining a Discord-style UI layout with Facebook-inspired social networking features.",
    tech: ["React", "FastAPI", "WebSockets"],
    repo: "https://github.com/acielace/LinkUp-placeholder" 
  },
  {
    id: "timberman",
    title: "Timberman",
    category: "Game Development",
    image: "/projectimages/Timberman/timbermanLogo.png",
    video: "/videoassets/timbermanconverted.mp4", 
    gallery: [
      "/projectimages/Timberman/timberman1.png",
      "/projectimages/Timberman/timberman2.png",
      "/projectimages/Timberman/timberman3.png",
    ],
    color: "from-amber-900 to-zinc-900",
    desc: "A 2D pixel art game featuring dynamic environments and custom character assets built entirely from scratch.",
    tech: ["Godot Engine", "GDScript", "Pixel Art"],
    repo: "https://github.com/acielace/GodotGame--Timberman" 
  }
];

type MediaItem = { type: "video" | "image"; src: string; id: string };

export default function Projects() {
  const [activeProject, setActiveProject] = useState<number | null>(null);
  const [previewProject, setPreviewProject] = useState<typeof projectsData[0] | null>(null);
  const [galleryState, setGalleryState] = useState<MediaItem[]>([]);
  
  // === NEW: Tracks whether the cards are in the initial pile ===
  const [isStacked, setIsStacked] = useState(true);

  useEffect(() => {
    if (previewProject) {
      const items: MediaItem[] = [];
      
      if (previewProject.video) {
        items.push({ type: "video", src: previewProject.video, id: "vid-main" });
      } else {
        items.push({ type: "image", src: previewProject.image, id: "img-main" });
      }

      const defaultGallery = previewProject.gallery || [];
      for (let i = 0; i < 4; i++) {
        const imgSrc = defaultGallery[i] || previewProject.image;
        items.push({ type: "image", src: imgSrc, id: `gal-${i}` });
      }

      setGalleryState(items);
    } else {
      setGalleryState([]);
    }
  }, [previewProject]);

  const swapMedia = (clickedIndex: number) => {
    setGalleryState((prev) => {
      const nextArr = [...prev];
      const temp = nextArr[0];
      nextArr[0] = nextArr[clickedIndex];
      nextArr[clickedIndex] = temp;
      return nextArr;
    });
  };

  const renderMedia = (media: MediaItem, isMain: boolean) => {
    if (!media) return null;

    if (media.type === "video") {
      return (
        <video
          key={`${media.id}-${isMain ? 'main' : 'thumb'}`}
          src={media.src}
          autoPlay={isMain}
          loop
          muted
          playsInline
          controls={isMain} 
          className={`w-full h-full bg-black ${isMain ? "object-contain" : "object-cover pointer-events-none"}`}
        />
      );
    }

    return (
      <img
        key={`${media.id}-${isMain ? 'main' : 'thumb'}`}
        src={media.src}
        alt="Project Media"
        className={`w-full h-full bg-black ${isMain ? "object-contain" : "object-cover"}`}
        onError={(e) => { e.currentTarget.src = "https://via.placeholder.com/600x400/18181b/ffffff?text=Add+Image+To+Public+Folder" }}
      />
    );
  };

  return (
    <section id="projects" className="py-24 bg-transparent flex flex-col items-center overflow-hidden min-h-screen relative">
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex flex-col items-center mb-16 text-center px-4"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-slate-900 dark:text-white">Featured Projects</h2>
        {/* Dynamic subtitle based on whether the deck is stacked or dealt */}
        <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base transition-colors duration-300">
          {isStacked 
            ? "Click the deck to deal the cards." 
            : "Pick a card from the hand to view project details. Click again to return it."}
        </p>
      </motion.div>

      {/* THE DYNAMIC POKER HAND CONTAINER */}
      <div className="relative w-full max-w-3xl h-[300px] md:h-[400px] flex justify-center items-end perspective-[1000px] mb-12">
        {projectsData.map((project, index) => {
          const isActive = activeProject === index;
          const centerIndex = (projectsData.length - 1) / 2;
          
          // Fanned out math
          const fanRotation = (index - centerIndex) * 14; 
          const fanXOffset = (index - centerIndex) * 110; 
          const fanYArc = Math.abs(index - centerIndex) * 20; 

          // Stacked pile math (gives it a slight messy deck look)
          const stackedRotation = (index - centerIndex) * 3;

          return (
            <motion.div
              key={project.id}
              onClick={() => {
                if (isStacked) {
                  // If it's a pile, deal the cards
                  setIsStacked(false);
                } else {
                  // If it's fanned out, open the specific project
                  setActiveProject(isActive ? null : index);
                }
              }}
              layout
              animate={{
                // Magic happens here: conditionally routes the coordinates based on state!
                rotate: isStacked ? stackedRotation : isActive ? 0 : fanRotation,
                x: isStacked ? 0 : isActive ? 0 : fanXOffset,
                y: isStacked ? 0 : isActive ? -40 : fanYArc,
                scale: isStacked ? 1 : isActive ? 1.05 : 1,
                zIndex: isActive ? 50 : index,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 280, // Tighter stiffness for a snappier bounce
                damping: 18     // Lower damping allows it to wobble/bounce slightly before settling
              }}
              whileHover={{ 
                y: isStacked ? -10 : isActive ? -40 : fanYArc - 15,
                scale: isStacked ? 1.02 : isActive ? 1.05 : 1.02,
                zIndex: isActive ? 50 : 30
              }}
              className="absolute cursor-pointer transform-origin-bottom"
            >
              <div 
                className={`w-[200px] h-[280px] md:w-[260px] md:h-[360px] rounded-2xl md:rounded-3xl shadow-xl overflow-hidden border flex flex-col transition-colors ${
                  isActive 
                    ? "bg-white dark:bg-black border-sky-500 dark:border-white shadow-sky-500/20 dark:shadow-white/10" 
                    : "bg-white dark:bg-black border-slate-200 dark:border-zinc-800 shadow-black/10 dark:shadow-black/50"
                }`}
              >
                <div className={`w-full h-[60%] bg-gradient-to-br ${project.color} relative border-b border-slate-200 dark:border-zinc-800`}>
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-overlay"
                    onError={(e) => (e.currentTarget.style.display = 'none')}
                  />
                </div>

                <div className="w-full h-[40%] p-4 flex flex-col justify-center bg-white dark:bg-black transition-colors">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-zinc-500 mb-1">
                    {project.category}
                  </span>
                  <h3 className={`text-xl md:text-2xl font-bold transition-colors ${
                    isActive ? "text-slate-900 dark:text-white" : "text-slate-500 dark:text-zinc-300"
                  }`}>
                    {project.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* DYNAMIC DETAILS PANEL */}
      <div className="w-full max-w-2xl px-6 h-auto min-h-[200px] flex justify-center mt-8">
        <AnimatePresence mode="wait">
          {activeProject !== null && !isStacked ? (
            <motion.div
              key={activeProject}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-col items-center text-center"
            >
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-4">
                {projectsData[activeProject].title}
              </h3>
              
              <p className="text-slate-600 dark:text-zinc-400 text-base md:text-lg leading-relaxed mb-6 max-w-xl">
                {projectsData[activeProject].desc}
              </p>

              <div className="flex flex-wrap justify-center gap-2 mb-8">
                {projectsData[activeProject].tech.map((tech, i) => (
                  <span key={i} className="px-3 py-1 bg-slate-100 dark:bg-black border border-slate-200 dark:border-zinc-800 rounded-full text-xs font-medium text-slate-600 dark:text-zinc-300">
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <a 
                  href={projectsData[activeProject].repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-white dark:bg-black text-slate-700 dark:text-zinc-200 border border-slate-200 dark:border-zinc-700 px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-slate-50 dark:hover:bg-zinc-800 transition-colors cursor-pointer shadow-sm dark:shadow-none"
                >
                  <Code size={18} /> Source Code
                </a>
                
                <button 
                  onClick={() => setPreviewProject(projectsData[activeProject])}
                  className="flex items-center gap-2 bg-sky-500 text-white border-sky-500 border px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-sky-400 transition-colors cursor-pointer shadow-md shadow-sky-500/20"
                >
                  <Eye size={18} /> Preview
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.p
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="text-slate-500 dark:text-zinc-500 italic text-sm md:text-base tracking-wide"
            >
              {isStacked ? "" : "Select a project card from the hand to reveal details."}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* === GALLERY MODAL === */}
      <AnimatePresence>
        {previewProject && galleryState.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPreviewProject(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/95 dark:bg-black/95 backdrop-blur-md p-4 md:p-8 cursor-zoom-out"
          >
            <button
              onClick={() => setPreviewProject(null)}
              className="absolute top-6 right-6 z-[110] bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-colors backdrop-blur-md"
            >
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-6xl h-[80vh] md:h-[75vh] bg-white dark:bg-zinc-900/50 p-4 rounded-3xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-2xl cursor-default flex flex-col md:flex-row gap-4"
            >
              
              <div className="flex-1 w-full h-[45vh] md:h-full bg-slate-100 dark:bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 shadow-inner">
                {renderMedia(galleryState[0], true)}
              </div>

              <div className="w-full md:w-1/3 lg:w-[400px] h-[30vh] md:h-full grid grid-cols-2 grid-rows-2 gap-4">
                {galleryState.slice(1, 5).map((media, idx) => (
                  <div
                    key={media.id}
                    onClick={() => swapMedia(idx + 1)} 
                    className="w-full h-full bg-slate-100 dark:bg-black rounded-2xl overflow-hidden border border-slate-200 dark:border-zinc-800 cursor-pointer hover:border-sky-500 dark:hover:border-sky-500 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                  >
                    {renderMedia(media, false)}
                  </div>
                ))}
              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
//When adding a new poject
{/*
    id: "new-project",
    title: "My New App",
    category: "Web App",
    image: "/projectimages/NewApp/cover.png",
    video: "", // Leave empty if no video
    gallery: [
      "/projectimages/NewApp/1.png",
      "/projectimages/NewApp/2.png",
      "/projectimages/NewApp/3.png",
      "/projectimages/NewApp/4.png"
    ],
    color: "from-emerald-900 to-zinc-900", // Pick a new color theme!
    desc: "A brief description of the new project goes right here.",
    tech: ["Next.js", "Tailwind", "Supabase"],
    repo: "https://github.com/acielace/new-project" 
  */} 