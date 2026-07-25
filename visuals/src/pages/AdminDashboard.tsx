import React, { useState, useEffect } from 'react';
import { useAuth } from '../lib/AuthContext';
import { supabase } from '../lib/supabase';
import { LogOut, PlusCircle, Calendar, MessageSquare, Trash2, Moon, Sun, UploadCloud } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function AdminDashboard() {
    const { signOut, user } = useAuth();
    const [activeTab, setActiveTab] = useState<'events' | 'notices'>('events');
    const [isDarkMode, setIsDarkMode] = useState(() => {
        const saved = localStorage.getItem('adminDarkMode');
        return saved === 'true';
    });

    const userName = user?.email === 'diegoas1909@gmail.com'
        ? 'Diego Anton'
        : user?.email === 'luisdonosog12@gmail.com'
            ? 'Luis Donoso'
            : user?.email;

    useEffect(() => {
        localStorage.setItem('adminDarkMode', isDarkMode.toString());
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        
        // Cleanup when leaving admin
        return () => document.documentElement.classList.remove('dark');
    }, [isDarkMode]);

    return (
        <div className={`min-h-screen font-sans pb-20 transition-colors duration-300 ${isDarkMode ? 'bg-[#0f172a] text-slate-200' : 'bg-slate-50 text-slate-900'}`}>
            {/* Admin Header */}
            <header className={`sticky top-0 z-40 border-b transition-colors duration-300 ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <div>
                        <h1 className={`text-2xl font-serif tracking-tight ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>Panel Administrativo</h1>
                        <p className={`text-xs uppercase tracking-widest font-semibold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Iglesia IJUS</p>
                    </div>
                    <div className="flex items-center gap-4 md:gap-6">
                        <button 
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-full transition-colors ${isDarkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                            title="Alternar Modo Oscuro"
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        <div className="hidden md:flex flex-col items-end">
                            <span className="text-sm font-semibold">{userName}</span>
                            <span className={`text-[10px] uppercase tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Admin</span>
                        </div>
                        <button 
                            onClick={signOut}
                            className={`flex items-center gap-2 text-sm font-medium transition-colors px-4 py-2 rounded-lg ${isDarkMode ? 'text-slate-300 hover:text-red-400 hover:bg-red-950/30' : 'text-slate-600 hover:text-red-600 bg-slate-100 hover:bg-red-50'}`}
                        >
                            <LogOut className="w-4 h-4" />
                            <span className="hidden sm:inline">Cerrar Sesión</span>
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
                
                {/* Tabs */}
                <div className={`flex flex-wrap gap-2 mb-8 p-1 rounded-xl shadow-sm border w-max transition-colors ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`}>
                    <button
                        onClick={() => setActiveTab('events')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'events' ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-primary text-white shadow-md') : (isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')}`}
                    >
                        <Calendar className="w-4 h-4" />
                        Gestión de Eventos
                    </button>
                    <button
                        onClick={() => setActiveTab('notices')}
                        className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'notices' ? (isDarkMode ? 'bg-blue-600 text-white shadow-md' : 'bg-primary text-white shadow-md') : (isDarkMode ? 'text-slate-400 hover:text-slate-200 hover:bg-slate-800' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50')}`}
                    >
                        <MessageSquare className="w-4 h-4" />
                        Noticias & Info
                    </button>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait">
                    {activeTab === 'events' ? (
                        <motion.div key="events" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <EventManager isDarkMode={isDarkMode} />
                        </motion.div>
                    ) : (
                        <motion.div key="notices" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
                            <NoticeManager isDarkMode={isDarkMode} />
                        </motion.div>
                    )}
                </AnimatePresence>

            </main>
        </div>
    );
}

// --- UTILS ---
const uploadImageToSupabase = async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from('event_images')
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from('event_images').getPublicUrl(filePath);
    return data.publicUrl;
};

// --- SUB-COMPONENTS ---

function EventManager({ isDarkMode }: { isDarkMode: boolean }) {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [eventsList, setEventsList] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        location: 'Constantino 104, Santiago',
        image_url: ''
    });

    const fetchEvents = async () => {
        const { data } = await supabase.from('event').select('*').order('date', { ascending: false });
        if (data) setEventsList(data);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.')) {
            const { error } = await supabase.from('event').delete().eq('id', id);
            if (error) {
                alert('Error al eliminar: ' + error.message);
            } else {
                fetchEvents();
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
            setFormData({...formData, image_url: ''}); // Clear URL if file selected
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let finalImageUrl = formData.image_url;

            if (imageFile) {
                finalImageUrl = await uploadImageToSupabase(imageFile);
            }

            const { error } = await supabase.from('event').insert([{
                title: formData.title,
                description: formData.description,
                date: new Date(formData.date).toISOString(),
                location: formData.location || 'Constantino 104, Santiago',
                image_url: finalImageUrl || null,
            }]);

            if (error) throw error;

            setSuccessMsg('Evento guardado correctamente.');
            setFormData({ title: '', description: '', date: '', location: 'Constantino 104, Santiago', image_url: '' });
            setImageFile(null);
            // reset file input
            const fileInput = document.getElementById('event-file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            fetchEvents();
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full border rounded-xl px-4 py-3 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50 ${isDarkMode ? 'bg-[#0f172a] border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`;
    const labelClasses = `text-xs font-semibold uppercase tracking-widest ml-1 mb-1 block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`;
    const panelClasses = `rounded-2xl shadow-sm border p-6 md:p-8 transition-colors ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`${panelClasses} h-max`}>
                <h2 className={`text-xl font-serif mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                    <PlusCircle className="w-5 h-5" /> Crear Nuevo Evento
                </h2>
                
                {successMsg && <div className={`mb-6 p-4 rounded-xl text-sm ${isDarkMode ? 'bg-green-900/30 text-green-400 border border-green-900' : 'bg-green-50 text-green-700 border border-green-100'}`}>{successMsg}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className={labelClasses}>Título del Evento</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClasses} placeholder="Ej: Servicio de Domingo Especial" />
                    </div>
                    
                    <div>
                        <label className={labelClasses}>Fecha y Hora</label>
                        <input required type="datetime-local" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className={inputClasses} style={{ colorScheme: isDarkMode ? 'dark' : 'light' }} />
                    </div>

                    <div>
                        <label className={labelClasses}>Ubicación</label>
                        <input type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className={inputClasses} />
                    </div>

                    <div>
                        <label className={labelClasses}>Descripción</label>
                        <textarea required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows={3} className={`${inputClasses} resize-none`} placeholder="Detalles del evento..."></textarea>
                    </div>

                    <div>
                        <label className={labelClasses}>Imagen</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDarkMode ? 'border-slate-700 hover:border-blue-500 bg-[#0f172a]' : 'border-slate-300 hover:border-primary bg-slate-50'} ${imageFile ? (isDarkMode ? 'border-blue-500 bg-blue-900/20' : 'border-primary bg-blue-50') : ''}`}>
                                <UploadCloud className={`w-6 h-6 mb-2 ${imageFile ? (isDarkMode ? 'text-blue-400' : 'text-primary') : (isDarkMode ? 'text-slate-500' : 'text-slate-400')}`} />
                                <span className="text-xs text-center font-medium opacity-80">{imageFile ? imageFile.name : 'Subir desde el PC'}</span>
                                <input id="event-file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                            <div className="flex flex-col justify-center">
                                <span className={`text-center text-xs font-semibold uppercase mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>O usar enlace web</span>
                                <input type="url" value={formData.image_url} onChange={e => {setFormData({...formData, image_url: e.target.value}); setImageFile(null);}} className={inputClasses} placeholder="https://..." disabled={!!imageFile} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-2">
                        <button type="submit" disabled={loading} className={`px-8 py-3 w-full rounded-xl font-medium tracking-wide uppercase text-sm transition-colors disabled:opacity-50 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-primary text-white hover:bg-blue-900'}`}>
                            {loading ? 'Subiendo y Guardando...' : 'Publicar Evento'}
                        </button>
                    </div>
                </form>
            </div>

            <div className={panelClasses}>
                <h2 className={`text-xl font-serif mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                    <Calendar className="w-5 h-5" /> Eventos Actuales
                </h2>
                <div className="flex flex-col gap-4">
                    {eventsList.length === 0 ? (
                        <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>No hay eventos registrados.</p>
                    ) : (
                        eventsList.map(event => (
                            <div key={event.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isDarkMode ? 'bg-[#0f172a]/50 border-slate-700/50 hover:border-slate-600' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'}`}>
                                <div>
                                    <h3 className={`font-semibold ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{event.title}</h3>
                                    <p className={`text-xs mt-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{new Date(event.date).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => handleDelete(event.id)} className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30' : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}>
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

function NoticeManager({ isDarkMode }: { isDarkMode: boolean }) {
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [noticesList, setNoticesList] = useState<any[]>([]);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        author: 'Equipo IJUS',
        type: 'news',
        image_url: ''
    });

    const fetchNotices = async () => {
        const { data } = await supabase.from('notice').select('*').order('published_at', { ascending: false });
        if (data) setNoticesList(data);
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleDelete = async (id: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar esta publicación? Esta acción no se puede deshacer.')) {
            const { error } = await supabase.from('notice').delete().eq('id', id);
            if (error) {
                alert('Error al eliminar: ' + error.message);
            } else {
                fetchNotices();
            }
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFile(e.target.files[0]);
            setFormData({...formData, image_url: ''});
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            let finalImageUrl = formData.image_url;

            if (imageFile) {
                finalImageUrl = await uploadImageToSupabase(imageFile);
            }

            const { error } = await supabase.from('notice').insert([{
                title: formData.title,
                content: formData.content,
                author: formData.author || 'Equipo IJUS',
                type: formData.type,
                image_url: finalImageUrl || null,
                published_at: new Date().toISOString()
            }]);

            if (error) throw error;

            setSuccessMsg('Publicación guardada correctamente.');
            setFormData({ title: '', content: '', author: 'Equipo IJUS', type: 'news', image_url: '' });
            setImageFile(null);
            const fileInput = document.getElementById('notice-file-upload') as HTMLInputElement;
            if (fileInput) fileInput.value = '';

            fetchNotices();
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (err: any) {
            alert('Error: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const inputClasses = `w-full border rounded-xl px-4 py-3 transition-colors outline-none focus:ring-2 focus:ring-blue-500/50 ${isDarkMode ? 'bg-[#0f172a] border-slate-700 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'}`;
    const labelClasses = `text-xs font-semibold uppercase tracking-widest ml-1 mb-1 block ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`;
    const panelClasses = `rounded-2xl shadow-sm border p-6 md:p-8 transition-colors ${isDarkMode ? 'bg-[#1e293b] border-slate-700' : 'bg-white border-slate-200'}`;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className={`${panelClasses} h-max`}>
                <h2 className={`text-xl font-serif mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                    <PlusCircle className="w-5 h-5" /> Crear Publicación
                </h2>
                
                {successMsg && <div className={`mb-6 p-4 rounded-xl text-sm ${isDarkMode ? 'bg-green-900/30 text-green-400 border border-green-900' : 'bg-green-50 text-green-700 border border-green-100'}`}>{successMsg}</div>}

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <label className={labelClasses}>Tipo de Publicación</label>
                        <select 
                            value={formData.type} 
                            onChange={e => setFormData({...formData, type: e.target.value})} 
                            className={inputClasses}
                        >
                            <option value="news">Noticia</option>
                            <option value="info">Información General</option>
                        </select>
                    </div>

                    <div>
                        <label className={labelClasses}>Título</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className={inputClasses} placeholder="Ej: Nuevo Horario..." />
                    </div>
                    
                    <div>
                        <label className={labelClasses}>Contenido</label>
                        <textarea required value={formData.content} onChange={e => setFormData({...formData, content: e.target.value})} rows={5} className={`${inputClasses} resize-none`} placeholder="Escribe la publicación aquí..."></textarea>
                    </div>

                    <div>
                        <label className={labelClasses}>Imagen</label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <label className={`flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors ${isDarkMode ? 'border-slate-700 hover:border-blue-500 bg-[#0f172a]' : 'border-slate-300 hover:border-primary bg-slate-50'} ${imageFile ? (isDarkMode ? 'border-blue-500 bg-blue-900/20' : 'border-primary bg-blue-50') : ''}`}>
                                <UploadCloud className={`w-6 h-6 mb-2 ${imageFile ? (isDarkMode ? 'text-blue-400' : 'text-primary') : (isDarkMode ? 'text-slate-500' : 'text-slate-400')}`} />
                                <span className="text-xs text-center font-medium opacity-80">{imageFile ? imageFile.name : 'Subir desde el PC'}</span>
                                <input id="notice-file-upload" type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                            </label>
                            <div className="flex flex-col justify-center">
                                <span className={`text-center text-xs font-semibold uppercase mb-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>O usar enlace web</span>
                                <input type="url" value={formData.image_url} onChange={e => {setFormData({...formData, image_url: e.target.value}); setImageFile(null);}} className={inputClasses} placeholder="https://..." disabled={!!imageFile} />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-2">
                        <button type="submit" disabled={loading} className={`px-8 py-3 w-full rounded-xl font-medium tracking-wide uppercase text-sm transition-colors disabled:opacity-50 ${isDarkMode ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-primary text-white hover:bg-blue-900'}`}>
                            {loading ? 'Subiendo y Guardando...' : 'Publicar'}
                        </button>
                    </div>
                </form>
            </div>

            <div className={panelClasses}>
                <h2 className={`text-xl font-serif mb-6 flex items-center gap-2 ${isDarkMode ? 'text-blue-400' : 'text-primary'}`}>
                    <MessageSquare className="w-5 h-5" /> Publicaciones Actuales
                </h2>
                <div className="flex flex-col gap-4">
                    {noticesList.length === 0 ? (
                        <p className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-500'}`}>No hay publicaciones registradas.</p>
                    ) : (
                        noticesList.map(notice => (
                            <div key={notice.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${isDarkMode ? 'bg-[#0f172a]/50 border-slate-700/50 hover:border-slate-600' : 'bg-slate-50/50 border-slate-100 hover:border-slate-200'}`}>
                                <div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded-full ${notice.type === 'info' ? (isDarkMode ? 'bg-indigo-900/40 text-indigo-300' : 'bg-blue-100 text-blue-700') : (isDarkMode ? 'bg-teal-900/40 text-teal-300' : 'bg-green-100 text-green-700')}`}>
                                            {notice.type === 'info' ? 'Info' : 'Noticia'}
                                        </span>
                                        <h3 className={`font-semibold truncate max-w-[200px] sm:max-w-xs ${isDarkMode ? 'text-slate-200' : 'text-slate-900'}`}>{notice.title}</h3>
                                    </div>
                                    <p className={`text-xs mt-2 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{new Date(notice.published_at).toLocaleDateString()}</p>
                                </div>
                                <button onClick={() => handleDelete(notice.id)} className={`p-2 rounded-lg transition-colors flex-shrink-0 ${isDarkMode ? 'text-red-400 hover:text-red-300 hover:bg-red-900/30' : 'text-red-500 hover:text-red-700 hover:bg-red-50'}`}>
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}
