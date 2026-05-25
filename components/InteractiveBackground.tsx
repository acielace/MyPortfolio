"use client";

import { useEffect, useRef } from "react";

export default function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const STAR_COUNT = 500; 
  const RING_COUNT = 8; 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    });

    // === NEW: Listen for the Light Mode switch ===
    let isLightMode = document.documentElement.classList.contains("light-theme");
    const observer = new MutationObserver(() => {
      isLightMode = document.documentElement.classList.contains("light-theme");
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const stars: { x: number; y: number; r: number; offset: number; speed: number }[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.5,
        offset: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 1.5,
      });
    }

    const rings: { 
      x: number; 
      y: number; 
      r: number; 
      angle: number; 
      dashPattern: number[]; 
      direction: number;
      opacity: number;
      baseSpeed: number;
    }[] = [];

    for (let i = 0; i < RING_COUNT; i++) {
      rings.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 100 + Math.random() * 300, 
        angle: Math.random() * Math.PI * 2,
        dashPattern: [Math.random() * 50 + 20, Math.random() * 50 + 20], 
        direction: Math.random() > 0.5 ? 1 : -1, 
        opacity: 0.2 + Math.random() * 0.3, 
        baseSpeed: 0.0010 + Math.random() * 0.001, 
      });
    }

    let scrollVelocity = 0;
    const handleScroll = (deltaY: number) => { scrollVelocity += deltaY * 0.0002; };
    window.addEventListener("wheel", (e) => handleScroll(e.deltaY));
    
    let lastTouchY = 0;
    window.addEventListener("touchstart", (e) => (lastTouchY = e.touches[0].clientY));
    window.addEventListener("touchmove", (e) => {
      const touchY = e.touches[0].clientY;
      handleScroll(lastTouchY - touchY);
      lastTouchY = touchY;
    });

    const render = () => {
      // === UPDATED: Icy Blue Background for Light Mode, Deep Black for Dark Mode ===
      ctx.fillStyle = isLightMode ? "#F0F9FF" : "#000000";
      ctx.fillRect(0, 0, w, h);

      // === UPDATED: Deep Slate color for stars/rings in Light Mode, White in Dark Mode ===
      const rgbColor = isLightMode ? "15, 23, 42" : "255, 255, 255";

      const time = performance.now() * 0.001; 
      const currentScroll = window.scrollY || document.documentElement.scrollTop;

      stars.forEach((star) => {
        const alpha = 0.1 + Math.abs(Math.sin(time * star.speed + star.offset)) * 0.9;
        let parallaxY = (star.y - currentScroll * 0.1) % h;
        if (parallaxY < 0) parallaxY += h;

        ctx.beginPath();
        ctx.arc(star.x, parallaxY, star.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, ${alpha})`; // Applied dynamic color
        ctx.fill();
      });

      rings.forEach((ring) => {
        ctx.save();
        ctx.translate(ring.x, ring.y);
        ctx.rotate(ring.angle);

        ctx.beginPath();
        ctx.arc(0, 0, ring.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(${rgbColor}, ${ring.opacity})`; // Applied dynamic color
        ctx.lineWidth = 1.5;
        ctx.setLineDash(ring.dashPattern);
        ctx.stroke();
        
        ctx.setLineDash([]); 

        ctx.beginPath();
        ctx.arc(ring.r, 0, 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgbColor}, ${ring.opacity * 2})`; // Applied dynamic color
        ctx.fill();

        ctx.restore();

        ring.angle += (scrollVelocity + ring.baseSpeed) * ring.direction;
      });

      scrollVelocity *= 0.92;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener("resize", () => {});
      window.removeEventListener("wheel", () => {});
      window.removeEventListener("touchstart", () => {});
      window.removeEventListener("touchmove", () => {});
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full -z-10 pointer-events-none transition-colors duration-500"
    />
  );
}