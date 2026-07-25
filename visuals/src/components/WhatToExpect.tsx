import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { HoverText } from './HoverLink';
import { Globe, Clock, Heart } from 'lucide-react';

export const WhatToExpect = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={containerRef} className="relative z-0 pt-16 pb-24 md:pt-20 md:pb-32 px-6 md:px-12 lg:px-24 bg-light text-dark overflow-x-clip" id="que-esperar">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl leading-[1.1] font-serif text-primary tracking-tight"
          >
            Bienvenido a casa
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[10px] md:text-xs text-primary font-medium tracking-wide uppercase"
          >
            ¿Qué esperas para formar parte?
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <img
            src="/Nuestra Iglesia.jpg"
            alt="Nuestra iglesia"
            loading="lazy"
            className="w-full aspect-[16/9] md:aspect-[21/9] object-cover rounded-2xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Dirección */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative pt-8 flex flex-col h-full opacity-100"
          >
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.2 }}
            />
            <div className="flex gap-4 flex-1">
              <Globe className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div className="flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-medium mb-3 text-primary">Dirección</h3>
                <p className="text-primary text-base leading-relaxed mb-6">
                  Estamos ubicados en:<br />
                  <strong>IJUS</strong> - Constantino 104,<br />
                  9170157 Santiago,<br />
                  Estación Central,<br />
                  Región Metropolitana
                </p>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Constantino+104,+Estación+Central,+Santiago,+Chile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/30 text-primary rounded-full px-5 py-2.5 text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors mt-auto self-start"
                >
                  <HoverText>Ver en mapa</HoverText>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Horarios */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative pt-8 flex flex-col h-full opacity-100"
          >
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            />
            <div className="flex gap-4 flex-1">
              <Clock className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div className="flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-medium mb-3 text-primary">Cultos Generales</h3>
                <p className="text-primary text-base leading-relaxed mb-6">
                  Nuestros horarios son:<br />
                  Domingos a las 11:00 am<br />
                  Jueves a las 19:30 pm
                </p>
                <a
                  href="https://calendar.google.com/calendar/render?action=TEMPLATE&text=Culto+General+IJUS&details=Acompa%C3%B1anos+en+nuestro+culto+general.&location=Constantino+104,+Estaci%C3%B3n+Central,+Santiago"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border border-primary/30 text-primary rounded-full px-5 py-2.5 text-sm uppercase tracking-widest hover:bg-primary hover:text-white transition-colors mt-auto self-start"
                >
                  <HoverText>Agendar</HoverText>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Únete */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative pt-8 flex flex-col h-full opacity-100"
          >
            <motion.div
              className="absolute top-0 left-0 h-[1px] bg-primary"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.6 }}
            />
            <div className="flex gap-4 flex-1">
              <Heart className="w-6 h-6 text-primary flex-shrink-0 mt-1" strokeWidth={1.5} />
              <div className="flex flex-col flex-1">
                <h3 className="text-xl md:text-2xl font-medium mb-3 text-primary">Únete a la familia</h3>
                <p className="text-primary text-base leading-relaxed mb-6">
                  Da el primer paso y visítanos este domingo. Nos encantaría conocerte y compartir contigo en nuestro próximo culto.
                </p>
                <a
                  href="#visit"
                  className="inline-flex items-center gap-2 bg-primary text-white border border-primary rounded-full px-5 py-2.5 text-sm uppercase tracking-widest hover:bg-blue-800 hover:border-blue-800 transition-colors mt-auto self-start"
                >
                  <HoverText>Planear Visita</HoverText>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="pb-8 md:mt-12 md:py-0 flex justify-center items-start w-full relative z-0 min-h-[90px] md:min-h-0">
          <motion.div
            style={{ y }}
            className="text-[18vw] md:text-[14vw] font-serif text-primary leading-none tracking-normal md:tracking-tighter select-none whitespace-nowrap opacity-90 -translate-y-8 md:translate-y-0 mt-4 md:mt-0"
          >
            JESÚS
          </motion.div>
        </div>
      </div>
    </section>
  );
};
