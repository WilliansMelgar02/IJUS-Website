import { motion } from 'motion/react';
import { AnimatedText } from './AnimatedText';

export const Connect = () => {
  return (
    <section className="bg-light text-primary py-24 md:py-32 px-6 md:px-12 flex flex-col items-center justify-center text-center">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">

        <div className="mb-8 md:mb-12 text-center text-5xl md:text-7xl lg:text-[100px] leading-tight font-serif tracking-tight">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Nuestros <span className="font-serif italic text-primary">pastores</span>
          </motion.span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg font-medium max-w-3xl mx-auto mb-16 md:mb-24 leading-relaxed text-center"
        >
          Con un corazón pastoral y una profunda pasión por la Palabra de Dios, los pastores <span className="font-serif italic">Luis Donoso y Matilde Nova</span> lideran la familia de IJUS Chile. Su ministerio está dedicado a guiar a la congregación hacia una relación íntima con Jesús, modelando los valores de amor, santidad y servicio.
        </motion.p>

        {/* Image Circles Container */}
        <div className="flex justify-center items-center">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-light z-10 relative -mr-8 md:-mr-12"
          >
            <img
              src="Pastor Luis.jpg"
              alt="Pastor Luis Donoso"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-48 h-48 md:w-72 md:h-72 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-light z-0 relative -ml-8 md:-ml-12"
          >
            <img
              src="Pastora Matilde.jpg"
              alt="Pastora Matilde Nova"
              loading="lazy"
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>

      </div>
    </section>
  );
};
