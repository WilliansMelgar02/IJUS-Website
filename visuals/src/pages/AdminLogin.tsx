import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';
import { motion } from 'motion/react';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuth();

    // Si ya está logueado, redirigir al dashboard
    useEffect(() => {
        if (user) {
            navigate('/admin/dashboard');
        }
    }, [user, navigate]);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error: authError } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (authError) {
            setError('Credenciales inválidas o error de conexión.');
        } else {
            navigate('/admin/dashboard');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-light flex flex-col items-center justify-center p-4">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden p-8 border border-dark/5"
            >
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif text-primary tracking-tight">IJUS Admin</h1>
                    <p className="text-dark/60 text-sm mt-2">Ingresa tus credenciales para acceder al panel.</p>
                </div>

                <form onSubmit={handleLogin} className="flex flex-col gap-5">
                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-dark/70 ml-1">Correo</label>
                        <input
                            type="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-light/50 border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="admin@ijuschile.cl"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="text-xs font-semibold uppercase tracking-widest text-dark/70 ml-1">Contraseña</label>
                        <input
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-light/50 border border-dark/10 rounded-xl px-4 py-3 text-dark focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 w-full bg-primary text-white rounded-xl py-4 font-medium tracking-wide uppercase text-sm hover:bg-blue-900 transition-colors disabled:opacity-50 flex justify-center items-center"
                    >
                        {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : 'Ingresar'}
                    </button>
                </form>
            </motion.div>
        </div>
    );
}
