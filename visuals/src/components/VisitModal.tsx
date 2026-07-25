import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';

export const VisitModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        contact_method: 'email' as 'email' | 'whatsapp',
        contact_value: ''
    });

    // Listen for hash changes
    useEffect(() => {
        const checkHash = () => {
            if (window.location.hash === '#visit' || window.location.hash === '#contacto') {
                setIsOpen(true);
                // Prevent body scroll
                document.body.style.overflow = 'hidden';
            } else {
                setIsOpen(false);
                document.body.style.overflow = '';
            }
        };

        // Check on mount
        checkHash();

        // Listen to hashchange events
        window.addEventListener('hashchange', checkHash);
        return () => window.removeEventListener('hashchange', checkHash);
    }, []);

    const closeModal = () => {
        // Navigate back or drop hash
        window.location.hash = '';
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: dbError } = await supabase
                .from('subscriber')
                .insert([
                    {
                        name: formData.name || null,
                        contact_method: formData.contact_method,
                        contact_value: formData.contact_value
                    }
                ]);

            if (dbError) throw dbError;

            setSuccess(true);
            setTimeout(() => {
                setSuccess(false);
                setFormData({ name: '', contact_method: 'email', contact_value: '' });
                closeModal();
            }, 3000);

        } catch (err: any) {
            console.error("Error saving subscriber:", err);
            setError(err.message || 'Ocurrió un error al procesar tu solicitud.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-dark/80 backdrop-blur-sm p-4"
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden relative"
                    >
                        {/* Close Button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 text-dark/50 hover:text-dark transition-colors p-2"
                            aria-label="Cerrar modal"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="p-8 md:p-10">
                            <h2 className="text-3xl font-serif text-primary mb-2 tracking-tight">
                                Planear Visita
                            </h2>
                            <p className="text-dark/70 text-sm mb-8 leading-relaxed">
                                Déjanos tus datos para enviarte los horarios y recordatorios de nuestras próximas reuniones. ¡Nos encantaría conocerte!
                            </p>

                            {success ? (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="bg-green-50 border border-green-200 text-green-800 rounded-xl p-6 text-center"
                                >
                                    <h3 className="font-medium text-lg mb-2">¡Gracias por unirte!</h3>
                                    <p className="text-sm opacity-90">Tus datos han sido registrados exitosamente. Nos pondremos en contacto pronto.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="flex flex-col gap-5">

                                    {/* Name Input */}
                                    <div className="flex flex-col gap-1.5">
                                        <label htmlFor="name" className="text-xs font-semibold uppercase tracking-widest text-dark/70 ml-1">
                                            Nombre (Opcional)
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            placeholder="Ej. Juan Pérez"
                                            className="w-full bg-light/50 border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-dark/30"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    {/* Contact Method Selector */}
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <label className="text-xs font-semibold uppercase tracking-widest text-dark/70 ml-1">
                                            Quiero ser contactado por
                                        </label>
                                        <div className="flex bg-light/50 border border-dark/10 rounded-xl p-1">
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, contact_method: 'email', contact_value: '' })}
                                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.contact_method === 'email' ? 'bg-white shadow-sm text-primary' : 'text-dark/50 hover:text-dark'}`}
                                            >
                                                Email
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setFormData({ ...formData, contact_method: 'whatsapp', contact_value: '' })}
                                                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${formData.contact_method === 'whatsapp' ? 'bg-white shadow-sm text-primary' : 'text-dark/50 hover:text-dark'}`}
                                            >
                                                WhatsApp
                                            </button>
                                        </div>
                                    </div>

                                    {/* Contact Value Input */}
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <label htmlFor="contact_value" className="text-xs font-semibold uppercase tracking-widest text-dark/70 ml-1">
                                            {formData.contact_method === 'email' ? 'Correo Electrónico' : 'Número de WhatsApp'}
                                        </label>
                                        <input
                                            type={formData.contact_method === 'email' ? 'email' : 'tel'}
                                            id="contact_value"
                                            required
                                            placeholder={formData.contact_method === 'email' ? 'ejemplo@correo.com' : '+56 9 1234 5678'}
                                            className="w-full bg-light/50 border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all placeholder:text-dark/30"
                                            value={formData.contact_value}
                                            onChange={(e) => setFormData({ ...formData, contact_value: e.target.value })}
                                        />
                                    </div>

                                    {error && (
                                        <div className="text-red-500 text-xs font-medium px-1">
                                            {error}
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        disabled={loading || !formData.contact_value}
                                        className="mt-4 w-full bg-primary text-white rounded-xl py-4 font-medium tracking-wide uppercase text-sm hover:bg-blue-900 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
                                    >
                                        {loading ? (
                                            <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                        ) : (
                                            'Enviar Datos'
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
