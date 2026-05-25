"use client";

export default function Divider() {
  return (
    // REMOVED 'py-12' and 'overflow-hidden'. ADDED 'z-10' so the glow sits on top of the section backgrounds.
    <div className="w-full relative flex items-center justify-center z-10 pointer-events-none">
      
      {/* LAYER 1: The wide, faint background trail */}
      <div className="absolute w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-sky-900/60 to-transparent"></div>
      
      {/* LAYER 2: The thick, soft glowing neon aura */}
      <div className="absolute w-full max-w-3xl h-[8px] bg-gradient-to-r from-transparent via-sky-500/40 to-transparent blur-sm"></div>
      
      {/* LAYER 3: The sharp, bright center core */}
      <div className="absolute w-full max-w-lg h-[2px] bg-gradient-to-r from-transparent via-sky-300 to-transparent"></div>
      
    </div>
  );
}