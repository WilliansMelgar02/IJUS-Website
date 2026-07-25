import { motion, AnimatePresence } from 'motion/react';

interface LightboxProps {
  image: string | null;
  onClose: () => void;
  alt?: string;
}

export const Lightbox = ({ image, onClose, alt = 'Expandido' }: LightboxProps) => (
  <AnimatePresence>
    {image && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 backdrop-blur-md p-4 md:p-12 cursor-pointer"
      >
        <motion.img
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          src={image}
          alt={alt}
          className="max-w-full max-h-full rounded-2xl shadow-2xl object-contain"
        />
        {/* Close button */}
        <button className="absolute top-6 right-6 text-white bg-black/40 hover:bg-black/80 rounded-full p-3 backdrop-blur-sm transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </motion.div>
    )}
  </AnimatePresence>
);
