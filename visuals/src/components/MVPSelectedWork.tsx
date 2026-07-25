import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { fetchEvents, fetchNotices, NovedadItem, PLACEHOLDER_IMAGE } from '../lib/novedades';
import { Lightbox } from './Lightbox';
import { EventsCalendar } from './EventsCalendar';

// Fallback placeholders si la BD está vacía
const FALLBACK_ITEMS: NovedadItem[] = [1, 2, 3].map((n) => ({
  id: String(n),
  type: 'info',
  category: 'Novedades',
  title: 'Próximamente',
  meta: 'Por definir',
  dateFormatted: '',
  location: '',
  description: '',
  image: PLACEHOLDER_IMAGE,
  sortDate: 0,
}));

const AUTOPLAY_MS = 3000;

export default function SelectedWork() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [items, setItems] = useState<NovedadItem[]>([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    async function fetchItems() {
      // Fetch latest events; if we don't have enough, fill with notices
      const combined = await fetchEvents(3);
      if (combined.length < 3) {
        combined.push(...await fetchNotices(3 - combined.length));
      }
      setItems(combined.length > 0 ? combined : FALLBACK_ITEMS);
    }

    fetchItems();
  }, []);

  // Auto-avance cada 3s; se pausa con el mouse encima o con el lightbox abierto
  useEffect(() => {
    if (paused || selectedImage || items.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [paused, selectedImage, items.length]);

  const goTo = (i: number) => setIndex((i + items.length) % items.length);
  const goToEvent = (id: string) => {
    const i = items.findIndex((item) => item.id === id);
    if (i >= 0) setIndex(i);
  };
  const current = items[index % items.length];

  return (
    <section className="bg-primary text-white py-20 md:py-24 px-6 md:px-12 w-full font-sans overflow-hidden" id="informacion">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center border-y border-light/20 py-10 md:py-14">
          {/* Izquierda: título + frase + calendario */}
          <div className="flex flex-col items-start gap-6 md:gap-8 lg:self-start">
            <h2 className="text-5xl md:text-[4.5rem] leading-none font-serif italic tracking-tight pb-2">
              Calendario de Eventos
            </h2>
            <p className="text-base md:text-lg opacity-70 leading-snug font-light">
              Mantente informado sobre lo que sucede en nuestra casa. Te invitamos a ser parte de todas nuestras actividades.
            </p>
            <div className="w-full flex justify-center">
              <EventsCalendar items={items} onSelectEvent={goToEvent} />
            </div>
          </div>

          {/* Derecha: carrusel */}
          {current && (
            <div
              className="relative"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: 80 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -80 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center text-center gap-5 md:gap-6"
                >
                  <span className="text-xs md:text-sm uppercase tracking-widest opacity-70">
                    {current.category} — {current.meta}
                  </span>

                  <h3 className="text-3xl sm:text-4xl lg:text-5xl leading-tight font-serif italic tracking-tight break-words max-w-xl pb-1">
                    {current.title}
                  </h3>

                  <div
                    onClick={() => setSelectedImage(current.image)}
                    className="w-full aspect-video rounded-2xl overflow-hidden shadow-2xl cursor-pointer group"
                  >
                    <img
                      src={current.image}
                      alt={current.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controles: flechas + puntos */}
              {items.length > 1 && (
                <div className="flex items-center justify-center gap-6 mt-6">
                  <button
                    onClick={() => goTo(index - 1)}
                    aria-label="Anterior"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                  </button>

                  <div className="flex gap-3">
                    {items.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => goTo(i)}
                        aria-label={`Ir al elemento ${i + 1}`}
                        className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => goTo(index + 1)}
                    aria-label="Siguiente"
                    className="flex items-center justify-center w-10 h-10 rounded-full border border-white/30 text-white hover:bg-white hover:text-primary transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* View All Button */}
        <div className="mt-12 md:mt-16 flex justify-center">
          <Link
            to="/novedades"
            className="group relative inline-flex items-center gap-3 bg-white text-primary px-8 py-4 rounded-full font-serif italic text-xl md:text-2xl hover:bg-light transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            <span>Ver todas las novedades</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="opacity-70 group-hover:translate-x-1 transition-transform"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </Link>
        </div>
      </div>

      {/* Lightbox Modal */}
      <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} alt="Evento Expandido" />
    </section>
  );
}
