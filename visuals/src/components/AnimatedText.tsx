import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '../utils/cn';

export const AnimatedText = ({ text, className, delay = 0, as: Component = 'div' }: { text: string, className?: string, delay?: number, as?: any }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  const words = text.split(' ');

  return (
    <Component ref={ref} className={cn("flex flex-wrap", className)}>
      {words.map((word, i) => (
        <span key={i} className="overflow-hidden inline-flex mr-[0.25em] pb-[0.2em] -mb-[0.2em] pt-[0.1em] -mt-[0.1em]">
          <motion.span
            className="inline-block origin-bottom"
            initial={{ y: "120%", rotateZ: 5, opacity: 0 }}
            animate={isInView ? { y: 0, rotateZ: 0, opacity: 1 } : { y: "120%", rotateZ: 5, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + i * 0.03 }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </Component>
  );
}
