import React, { useState, useEffect, useLayoutEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, FileText, Info } from 'lucide-react';
import { fetchEvents, fetchNotices, NovedadItem } from '../lib/novedades';
import { Lightbox } from '../components/Lightbox';

const RevealText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
        <div className="overflow-hidden">
            <motion.div
                className="pr-4 pb-2"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
            >
                {text}
            </motion.div>
        </div>
    );
};

const ContentItem: React.FC<{ item: NovedadItem, onSelectImage: (img: string) => void }> = ({ item, onSelectImage }) => {
    return (
        <motion.div
            className="group relative cursor-pointer border-b md:border-none border-primary/20 md:border-transparent pb-8 md:pb-0"
            initial="initial"
            whileHover="hover"
            onClick={() => onSelectImage(item.image)}
        >
            {/* Top Border Line */}
            <motion.div
                className="absolute top-0 left-0 h-[1px] bg-primary/20 group-hover:bg-transparent z-20 transition-colors duration-500"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                style={{ originX: 0, width: "100%" }}
            />

            {/* Background fill */}
            <motion.div
                className="absolute inset-0 bg-primary origin-bottom z-0"
                variants={{
                    initial: { scaleY: 0 },
                    hover: { scaleY: 1 }
                }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />

            <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between px-4 md:px-8 py-8 md:py-12 transition-colors duration-500 group-hover:text-white">
                <div className="flex flex-col md:w-2/3 relative z-30 pointer-events-none">
                    <p className="text-sm font-medium mb-2 opacity-80 uppercase tracking-widest">{item.category} {item.dateFormatted ? `• ${item.dateFormatted}` : ''}</p>
                    <div className="flex items-center">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight font-serif italic tracking-tight shrink-0 max-w-full pb-2 break-words whitespace-normal md:whitespace-nowrap md:truncate">
                            {item.title}
                        </h2>
                        <motion.div
                            className="h-16 md:h-20 rounded-lg overflow-hidden origin-left shrink-0 hidden md:block"
                            variants={{
                                initial: { width: 0, opacity: 0, marginLeft: 0 },
                                hover: { width: 140, opacity: 1, marginLeft: 24 }
                            }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        >
                            <img src={item.image} alt={item.title} className="w-[140px] h-full object-cover rounded-xl" />
                        </motion.div>
                    </div>
                </div>

                <div className="md:w-1/3 flex flex-col md:items-end mt-4 md:mt-0 relative z-30 pointer-events-none">
                    {item.location ? (
                        <>
                            <span className="font-semibold mb-1 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden md:block">Ubicación</span>
                            <span className="text-sm md:text-lg font-medium leading-tight md:text-right hidden md:block group-hover:text-white/80">{item.location}</span>
                        </>
                    ) : (
                        <span className="text-sm md:text-lg font-light leading-snug md:text-right hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-500 max-w-sm">
                            {item.description ? (item.description.length > 80 ? item.description.substring(0, 80) + '...' : item.description) : ''}
                        </span>
                    )}
                </div>

                {/* Mobile Image */}
                <div className="mt-6 md:hidden w-full aspect-video rounded-xl overflow-hidden shadow-lg border border-primary/20 pointer-events-none">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                </div>
            </div>
        </motion.div>
    );
};

export default function Novedades() {
    const [allItems, setAllItems] = useState<NovedadItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState<'todos' | 'evento' | 'noticia' | 'info'>('todos');

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const [events, notices] = await Promise.all([fetchEvents(), fetchNotices()]);
            const combined = [...events, ...notices];

            // Sort: Upcoming events first, then newest notices/info
            combined.sort((a, b) => b.sortDate - a.sortDate);

            setAllItems(combined);
            setLoading(false);
        }

        fetchData();
    }, []);

    const filteredItems = activeFilter === 'todos' 
        ? allItems 
        : allItems.filter(item => item.type === activeFilter);

    return (
        <div className="min-h-screen bg-light text-dark font-sans selection:bg-primary selection:text-white pt-32">
            {/* Page Transition Overlay */}
            <motion.div
                className="fixed inset-0 bg-primary z-[100] pointer-events-none"
                initial={{ y: 0 }}
                animate={{ y: "-100%" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            />

            <main className="pb-20">
                <section className="px-6 md:px-12 mb-12 max-w-[120rem] mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                        <div className="md:col-span-8 flex flex-col items-start gap-4">
                            <span className="text-primary font-semibold uppercase tracking-widest text-sm">Portal de Información</span>
                            <h1 className="text-6xl md:text-[8rem] leading-[0.9] font-medium tracking-tighter">
                                <RevealText text="Novedades" delay={0.4} />
                            </h1>
                        </div>
                        <div className="md:col-span-4 pt-2 md:pt-12">
                            <motion.p
                                className="text-lg md:text-xl leading-relaxed font-light opacity-80"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
                            >
                                Descubre los próximos eventos, noticias de actualidad y recursos importantes para nuestra comunidad.
                            </motion.p>
                        </div>
                    </div>
                </section>

                {/* Filter Tabs */}
                <section className="px-6 md:px-12 mb-16 max-w-[120rem] mx-auto flex justify-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex flex-nowrap md:flex-wrap gap-2 p-1.5 bg-white/50 backdrop-blur-md rounded-xl md:rounded-lg w-full md:w-max border border-dark/5 overflow-x-auto snap-x hide-scrollbar"
                    >
                        <button
                            onClick={() => setActiveFilter('todos')}
                            className={`flex-shrink-0 snap-center px-6 md:px-8 py-3 md:py-2.5 rounded-lg text-sm font-medium transition-all ${activeFilter === 'todos' ? 'bg-primary text-white shadow-md' : 'text-dark/60 hover:text-dark hover:bg-white'}`}
                        >
                            Ver Todo
                        </button>
                        <button
                            onClick={() => setActiveFilter('evento')}
                            className={`flex-shrink-0 snap-center flex items-center gap-2 px-6 md:px-8 py-3 md:py-2.5 rounded-lg text-sm font-medium transition-all ${activeFilter === 'evento' ? 'bg-primary text-white shadow-md' : 'text-dark/60 hover:text-dark hover:bg-white'}`}
                        >
                            <Calendar className="w-4 h-4" />
                            Eventos
                        </button>
                        <button
                            onClick={() => setActiveFilter('noticia')}
                            className={`flex-shrink-0 snap-center flex items-center gap-2 px-6 md:px-8 py-3 md:py-2.5 rounded-lg text-sm font-medium transition-all ${activeFilter === 'noticia' ? 'bg-primary text-white shadow-md' : 'text-dark/60 hover:text-dark hover:bg-white'}`}
                        >
                            <FileText className="w-4 h-4" />
                            Noticias
                        </button>
                        <button
                            onClick={() => setActiveFilter('info')}
                            className={`flex-shrink-0 snap-center flex items-center gap-2 px-6 md:px-8 py-3 md:py-2.5 rounded-lg text-sm font-medium transition-all ${activeFilter === 'info' ? 'bg-primary text-white shadow-md' : 'text-dark/60 hover:text-dark hover:bg-white'}`}
                        >
                            <Info className="w-4 h-4" />
                            Información
                        </button>
                    </motion.div>
                </section>

                <section className="flex flex-col max-w-[120rem] mx-auto">
                    {filteredItems.length > 0 ? filteredItems.map((item, index) => (
                        <ContentItem key={item.id} item={item} onSelectImage={setSelectedImage} />
                    )) : (
                        !loading && (
                            <div className="py-20 text-center text-dark/50 font-light">
                                No hay elementos en esta categoría por el momento.
                            </div>
                        )
                    )}
                    {/* Bottom border for the last item */}
                    {filteredItems.length > 0 && (
                        <motion.div
                            className="h-[1px] bg-primary/20 w-full"
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                            style={{ originX: 0 }}
                        />
                    )}
                </section>

                {/* Lightbox Modal */}
                <Lightbox image={selectedImage} onClose={() => setSelectedImage(null)} />
            </main>
        </div>
    );
}
