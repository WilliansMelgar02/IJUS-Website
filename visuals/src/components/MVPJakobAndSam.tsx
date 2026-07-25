import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';

export default function JakobAndSam() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Add spring physics for buttery smooth, fluid movement
  const smoothProgress = useSpring(scrollYProgress, {
    damping: 50,
    stiffness: 100,
    mass: 1
  });

  // Subtle, slow movement ranges
  const x1 = useTransform(smoothProgress, [0, 1], ["-2%", "3%"]);
  const x2 = useTransform(smoothProgress, [0, 1], ["0%", "-5%"]);

  return (
    <section ref={containerRef} className="bg-light text-primary py-32 overflow-hidden flex flex-col">
      <div className="h-[1px] w-full bg-primary/30" />

      {/* Row 1 - Moves Right */}
      <div className="relative flex overflow-hidden whitespace-nowrap py-6">
        <motion.div
          style={{ x: x1 }}
          className="flex items-center gap-16 md:gap-32 px-6 md:px-12 w-max"
        >
          {/* Duplicate content for seamless look */}
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[12rem] md:text-[22rem] font-medium leading-none tracking-tight">Cristo</span>
              <img src="https://cdn.prod.website-files.com/67fcd4974b30a00d13095550/6841980582e1bacd1b2b1f9b_and.svg" alt="&" className="h-32 md:h-56" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(43%) saturate(2719%) hue-rotate(205deg) brightness(85%) contrast(105%)' }} />
              <span className="text-[12rem] md:text-[22rem] font-serif italic leading-none">Familia</span>
              <img src="https://cdn.prod.website-files.com/67fcd4974b30a00d13095550/6841980582e1bacd1b2b1f9b_and.svg" alt="&" className="h-32 md:h-56" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(43%) saturate(2719%) hue-rotate(205deg) brightness(85%) contrast(105%)' }} />
              <span className="text-[12rem] md:text-[22rem] font-medium leading-none tracking-tight pr-16 md:pr-32">IJUS</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="h-[1px] w-full bg-primary/30" />

      {/* Row 2 - Moves Left */}
      <div className="relative flex overflow-hidden whitespace-nowrap py-6">
        <motion.div
          style={{ x: x2 }}
          className="flex items-center gap-16 md:gap-32 px-6 md:px-12 w-max"
        >
          {[...Array(4)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="text-[12rem] md:text-[22rem] font-medium leading-none tracking-tight">IJUS</span>
              <img src="https://cdn.prod.website-files.com/67fcd4974b30a00d13095550/6841980582e1bacd1b2b1f9b_and.svg" alt="&" className="h-32 md:h-56" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(43%) saturate(2719%) hue-rotate(205deg) brightness(85%) contrast(105%)' }} />
              <span className="text-[12rem] md:text-[22rem] font-serif italic leading-none">Familia</span>
              <img src="https://cdn.prod.website-files.com/67fcd4974b30a00d13095550/6841980582e1bacd1b2b1f9b_and.svg" alt="&" className="h-32 md:h-56" style={{ filter: 'brightness(0) saturate(100%) invert(18%) sepia(43%) saturate(2719%) hue-rotate(205deg) brightness(85%) contrast(105%)' }} />
              <span className="text-[12rem] md:text-[22rem] font-medium leading-none tracking-tight pr-16 md:pr-32">Cristo</span>
            </React.Fragment>
          ))}
        </motion.div>
      </div>

      <div className="h-[1px] w-full bg-primary/30" />
    </section>
  );
}
