import { AnimatedText } from './AnimatedText';
import { motion } from 'motion/react';

export const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden flex items-end pb-10 md:pb-16 px-6 md:px-12 bg-dark">
      <div className="absolute inset-0 z-0">
        <video autoPlay muted loop playsInline preload="auto" poster="/fondo-poster.jpg" className="w-full h-full object-cover opacity-40">
          <source src="/fondo.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
      </div>
      <div className="relative z-10 w-full">
        <AnimatedText
          text="Iglesia Jesucristo"
          className="text-[10vw] md:text-[6vw] leading-[1.2] font-serif text-white tracking-tight"
          delay={0.3}
        />
        <div className="mt-4 md:mt-6 flex flex-wrap items-center gap-2 md:gap-3">
          <AnimatedText
            text="Único Salvador"
            className="text-[10vw] md:text-[6vw] leading-[1.2] font-serif text-white tracking-tight"
            delay={0.45}
          />
          <motion.a
            href="#contacto"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group flex items-center h-12 md:h-16 bg-transparent border border-white/30 text-white rounded-full hover:bg-primary hover:border-primary transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer"
          >
            <div className="w-12 h-12 md:w-16 md:h-16 flex-shrink-0 flex items-center justify-center rounded-full">
              <svg viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:rotate-45">
                <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]">
              <span className="whitespace-nowrap font-medium pr-6 md:pr-8 text-sm md:text-base opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-150 block">
                Planear visita
              </span>
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
};
