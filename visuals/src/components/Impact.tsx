import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { AnimatedText } from './AnimatedText';

export const Impact = () => {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="relative h-[80vh] md:h-screen w-full overflow-hidden flex items-center justify-center bg-dark">
      <div className="absolute inset-0 z-0">
        <img
          src="Pastores Iglesia.jpg"
          alt="Pastores e Iglesia"
          loading="lazy"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <motion.div
        style={{ y }}
        className="relative z-10 w-full px-6 md:px-12 flex flex-col items-center justify-center text-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-[12vw] md:text-[8vw] leading-tight font-serif italic text-white tracking-tight"
        >
          Una familia <br className="md:hidden" /> unida en Cristo
        </motion.h2>
      </motion.div>
    </section>
  );
};
