import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { HoverText } from './HoverLink';
import { cn } from '../utils/cn';

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const { pathname } = useLocation();
  const isLightPage = pathname === '/novedades';

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  const isDarkText = scrolled || isOpen || isLightPage;

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen]);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 transition-colors duration-300",
          isDarkText ? "bg-white text-dark shadow-sm" : "bg-transparent text-white"
        )}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 3 }}
      >
        <div className="w-full flex justify-between items-center">
          <div className="hidden lg:block flex-1" />

          <div className="flex items-center gap-10">
            <a href="/" className="font-serif italic text-3xl font-bold tracking-wider flex-shrink-0 relative z-50">
              IJUS
            </a>

            <div className="hidden lg:flex gap-8 items-center font-medium text-sm uppercase tracking-widest">
              <a href="/#que-esperar"><HoverText>Visítanos</HoverText></a>
              <a href="/#equipo"><HoverText>Conócenos</HoverText></a>
              <a href="/#informacion"><HoverText>Información</HoverText></a>
            </div>
          </div>

          <div className="hidden lg:flex flex-1 justify-end items-center">
            <a href="/#contacto" className={cn(
              "flex items-center gap-2 border rounded-full px-6 py-2.5 transition-colors text-sm uppercase tracking-widest",
              isDarkText ? "border-dark/20 hover:bg-dark hover:text-white" : "border-white/30 hover:bg-white hover:text-dark"
            )}>
              <HoverText>Planear Visita</HoverText>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden flex flex-col gap-1.5 z-50 p-2 relative"
            onClick={toggleMenu}
            aria-label="Toggle Menu"
          >
            <span className={cn(
              "w-6 h-0.5 block transition-all duration-300",
              isDarkText ? "bg-dark" : "bg-white",
              isOpen ? "rotate-45 translate-y-2" : ""
            )}></span>
            <span className={cn(
              "w-6 h-0.5 block transition-all duration-300",
              isDarkText ? "bg-dark" : "bg-white",
              isOpen ? "-rotate-45" : ""
            )}></span>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col items-center justify-center lg:hidden"
          >
            <div className="flex flex-col gap-8 items-center text-dark text-2xl font-serif">
              <motion.a
                href="/#que-esperar"
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="hover:text-primary transition-colors"
              >
                Visítanos
              </motion.a>
              <motion.a
                href="/#equipo"
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="hover:text-primary transition-colors"
              >
                Conócenos
              </motion.a>
              <motion.a
                href="/#informacion"
                onClick={toggleMenu}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="hover:text-primary transition-colors"
              >
                Información
              </motion.a>

              <motion.a
                href="/#contacto"
                onClick={toggleMenu}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="mt-8 border border-dark rounded-full px-8 py-3 text-sm uppercase tracking-widest hover:bg-dark hover:text-white transition-colors"
              >
                Planear Visita
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
