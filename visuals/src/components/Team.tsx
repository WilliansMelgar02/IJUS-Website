import { motion } from 'motion/react';
import { AnimatedText } from './AnimatedText';

export const Team = () => {
  return (
    <section className="relative z-10 bg-primary text-white py-24 md:py-32 px-6 md:px-12" id="equipo">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Header */}
        <div className="mb-12 md:mb-16 flex flex-col items-center">
          <AnimatedText 
            text="Conócenos" 
            className="text-3xl md:text-4xl lg:text-5xl font-serif italic tracking-tight text-center" 
          />
        </div>
        
        <div className="w-full h-[1px] bg-white/20 mb-12 md:mb-16" />

        {/* Large Paragraph */}
        <div className="max-w-4xl mx-auto">
          <motion.p 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-2xl lg:text-3xl leading-[1.6] font-medium tracking-tight text-center"
          >
            ¡Bienvenidos a IJUS Chile! Somos una comunidad de fe apasionada por Dios y Su Palabra. Bajo el liderazgo y cobertura de nuestros pastores, <span className="font-serif italic">Luis Donoso y Matilde Nova</span>, buscamos ser una familia espiritual donde cada persona pueda encontrar su propósito en Cristo. Anhelamos ser un reflejo de la iglesia del libro de los Hechos: viva, dinámica y transformadora, llevando la luz del Evangelio a cada rincón de nuestra sociedad.
          </motion.p>
        </div>
      </div>
    </section>
  );
};
