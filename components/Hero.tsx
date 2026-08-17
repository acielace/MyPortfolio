"use client";

import { useEffect, useRef, useState } from "react";
import { motion, type PanInfo } from "framer-motion";
import { Download } from "lucide-react";

const identityOptions = [
  "Web Developer",
  "Game Developer",
  "App Developer",
];

// Map each identity to its own portrait. Add these images to /public and
// update the paths below. Anything missing (or no selection yet) falls
// back to /profile.png automatically.
const identityImages: Record<string, string> = {
  "Web Developer": "/MK.jpg",
  "Game Developer": "/me.jpg",
  "App Developer": "/profile-app-developer.png",
};

const DEFAULT_IMAGE = "/profile.png";

function isPointInRect(x: number, y: number, rect: DOMRect) {
  return x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
}

// === PIXEL REVEAL ===
// The NEW image renders once, at full size, with normal object-cover — never
// resized or stretched. On top of it sits a grid of tiles showing the OLD
// image, so at the very start you still see the previous photo intact. Each
// tile fades out with a delay based on (row + col), so the previous image
// visibly dissolves into the new one, sweeping from the top-left corner
// toward the bottom-right.
//
// Each tile uses a real <img> with object-fit: cover (not a CSS
// background-image), because object-fit lets the browser crop for aspect
// ratio correctly on its own — a manual background-size percentage trick
// would stretch the image non-uniformly and cause a squish/pop artifact.  
//
// PERFORMANCE NOTE: each tile is a real DOM element with its own <img>, so
// total tile count = GRID_COLS * GRID_ROWS matters a lot. At 28x30 (840
// tiles) the browser can't animate that many cropped images smoothly and
// drops frames — which is exactly what looked like an "instant pop" instead
// of a visible sweep. Keep the total around 100-160 tiles (e.g. 10x14,
// 12x14) for a smooth 60fps sweep. Go higher only if you test it stays smooth.
const GRID_COLS = 10;
const GRID_ROWS = 14;
const STAGGER_STEP = 0.018; // seconds added per (row + col) step
const TILE_DURATION = 0.22; // seconds each tile takes to fade out

function PixelRevealMask({ src, onComplete }: { src: string; onComplete: () => void }) {
  const tiles: { row: number; col: number }[] = [];
  for (let row = 0; row < GRID_ROWS; row++) {
    for (let col = 0; col < GRID_COLS; col++) {
      tiles.push({ row, col });
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {tiles.map(({ row, col }) => {
        const delay = (row + col) * STAGGER_STEP;
        // The bottom-right tile always has the largest (row + col), so it's
        // always the last one to finish — that's our signal the reveal is done.
        const isLast = row === GRID_ROWS - 1 && col === GRID_COLS - 1;

        return (
          <motion.div
            key={`${row}-${col}`}
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay, duration: TILE_DURATION, ease: "easeOut" }}
            onAnimationComplete={isLast ? onComplete : undefined}
            style={{
              position: "absolute",
              top: `${(row / GRID_ROWS) * 100}%`,
              left: `${(col / GRID_COLS) * 100}%`,
              width: `${100 / GRID_COLS}%`,
              height: `${100 / GRID_ROWS}%`,
              overflow: "hidden",
            }}
          >
            {/* This img is deliberately sized to GRID_COLS/GRID_ROWS times
                the tile's own box — that math works out to exactly the full
                frame's pixel size (not a stretch), and object-fit: cover
                then crops it exactly like the base layer images do. The
                top/left offset slides it so only this tile's window shows. */}
            <img
              src={src}
              alt=""
              // Added: fallback if a tile's slice source is missing, so a
              // broken-image icon never flashes mid-animation.
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = DEFAULT_IMAGE;
              }}
              style={{
                position: "absolute",
                width: `${GRID_COLS * 100}%`,
                height: `${GRID_ROWS * 100}%`,
                top: `${-row * 100}%`,
                left: `${-col * 100}%`,
                objectFit: "cover",
                pointerEvents: "none",
              }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

function IdentityPortrait({
  identity,
  className,
}: {
  identity: string | null;
  className: string;
}) {
  const targetSrc = identity ? identityImages[identity] ?? DEFAULT_IMAGE : DEFAULT_IMAGE;

  // displaySrc  = the image shown once nothing is transitioning.
  // revealSrc   = the incoming (new) image, shown as the base layer as soon
  //               as a transition starts.
  // previousSrc = the outgoing (old) image, tiled on top, fading away.
  const [displaySrc, setDisplaySrc] = useState(targetSrc);
  const [revealSrc, setRevealSrc] = useState<string | null>(null);
  const [previousSrc, setPreviousSrc] = useState<string | null>(null);

  useEffect(() => {
    if (targetSrc !== displaySrc) {
      setPreviousSrc(displaySrc);
      setRevealSrc(targetSrc);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [targetSrc]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_IMAGE;
  };

  return (
    <div
      className={`relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900 shadow-2xl ${className}`}
    >
      {/* Base layer: the new image, already in place underneath the reveal */}
      <img
        src={revealSrc ?? displaySrc}
        alt={identity ? `Ace Casera — ${identity}` : "Ace Casera"}
        onError={handleImageError}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Old image, tiled on top, dissolving away top-left to bottom-right */}
      {revealSrc && previousSrc && (
        <PixelRevealMask
          src={previousSrc}
          onComplete={() => {
            setDisplaySrc(revealSrc);
            setRevealSrc(null);
            setPreviousSrc(null);
          }}
        />
      )}
    </div>
  );
}

export default function Hero() {
  const [identity, setIdentity] = useState<string | null>(null);
  const dropRef = useRef<HTMLDivElement>(null);

  // Whatever isn't currently sitting in the blank stays in the word bank
  const remainingOptions = identityOptions.filter((option) => option !== identity);

  const handleDragEnd = (label: string, info: PanInfo) => {
    if (!dropRef.current) return;
    const rect = dropRef.current.getBoundingClientRect();
    if (isPointInRect(info.point.x, info.point.y, rect)) {
      setIdentity(label);
    }
  };

  return (
    <section id="home" className="min-h-screen pt-20 md:pt-20 flex flex-col md:flex-row justify-between items-center px-6 max-w-6xl mx-auto gap-12">
      
      {/* LEFT SIDE: Text and Button */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }} 
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex-1 text-center md:text-left md:-translate-y-6 flex flex-col items-center md:items-start w-full"
      >

        <h1 className="text-6xl md:text-6xl font-bold tracking-tight text-zinc-200 mb-0 md:mb-4 leading-tight">
          Design. Develop. <br /> <span className="text-zinc-400 dark:text-zinc-600">Deploy.</span>
        </h1>
        
        {/* MOBILE-ONLY PORTRAIT — vertical rectangle, swaps with identity.
            To nudge it left/right, add e.g. "-translate-x-4" or "translate-x-4"
            to this wrapper's className. */}
        <div className="flex md:hidden justify-center mt-4 mb-6">
          <IdentityPortrait identity={identity} className="w-56 h-72" />
        </div>

        {/* === DRAG & DROP IDENTITY SENTENCE === */}
        <div className="w-full mb-6">
          <div className="flex flex-wrap items-end justify-center md:justify-start gap-x-2 gap-y-3 text-xl md:text-2xl font-medium text-zinc-200 mb-4">
            <span>Hi! I&apos;m Ace. I&apos;m a</span>

            <div
              ref={dropRef}
              onClick={() => identity && setIdentity(null)}
              className={`inline-flex min-h-[36px] min-w-[170px] items-end justify-center pb-1 cursor-pointer ${
                identity ? "" : "border-b-2 border-zinc-600"
              }`}
            >
              {identity ? (
                <span className="text-sky-400 font-semibold text-lg md:text-xl">
                  {identity}
                </span>
              ) : (
                <span className="text-transparent text-sm md:text-base">placeholder</span>
              )}
            </div>

            <span>.</span>
          </div>

          {remainingOptions.length > 0 && (
            <div className="flex flex-wrap justify-center md:justify-start gap-2">
              {remainingOptions.map((option) => (
                <motion.div
                  key={option}
                  drag
                  dragSnapToOrigin
                  dragElastic={0.15}
                  dragMomentum={false}
                  whileDrag={{ scale: 1.06, zIndex: 50, boxShadow: "0 12px 28px rgba(0,0,0,0.4)" }}
                  whileTap={{ scale: 0.96 }}
                  onDragEnd={(_, info) => handleDragEnd(option, info)}
                  onClick={() => setIdentity(option)}
                  className="touch-none select-none cursor-grab active:cursor-grabbing px-4 py-2 rounded-md border border-zinc-700 bg-zinc-900 text-zinc-200 text-sm font-medium hover:border-zinc-500 transition-colors"
                >
                  {option}
                </motion.div>
              ))}
            </div>
          )}

          <p className="text-xs text-zinc-600 mt-2 text-center md:text-left">
            Drag a tag into the line, or just tap it.
          </p>
        </div>
        {/* ======================================================== */}

        <p className="text-base md:text-lg text-zinc-400 max-w-xl mb-6 md:mb-8 mx-auto md:mx-0 leading-relaxed">
          Creative Developer and 3rd-year CS student with a passion for high-fidelity UI/UX and intelligent systems.
          Seeking an OJT opportunity to apply and further develop software development and applied AI skills, 
          with a strong interest in building user-centric applications powered by machine learning.
        </p>

        <motion.a
          href="/documents/CaseraResumeNoPic.pdf" 
          download="Ace_Casera_Resume.pdf" 
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 bg-sky-500 text-black dark:text-white border-sky-500 px-6 py-3 rounded-full font-medium hover:bg-sky-400 transition-colors mx-auto md:mx-0 mb-6"
        >
          <Download size={20} /> Download CV
        </motion.a>
      </motion.div>

      {/* RIGHT SIDE: DESKTOP PORTRAIT — vertical rectangle, swaps with identity.
          Vertical position: md:-translate-y-18 (bigger number = higher up).
          Horizontal position: add e.g. md:-translate-x-8 (moves left) or
          md:translate-x-8 (moves right) right next to it in this className. */}
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden md:flex flex-1 justify-end md:-translate-y-18"
      >
        <IdentityPortrait identity={identity} className="w-80 h-[440px]" />
      </motion.div>

    </section>
  );
}