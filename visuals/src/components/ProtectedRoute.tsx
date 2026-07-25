import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/AuthContext';

export const ProtectedRoute = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <div className="min-h-screen bg-light flex items-center justify-center">
                <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return <Outlet />;
};
