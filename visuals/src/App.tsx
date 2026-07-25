import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { SmoothScroll } from './components/SmoothScroll';
import { Navbar } from './components/Navbar';
import MVPFooter from './components/MVPFooter';
import { VisitModal } from './components/VisitModal';
import Home from './pages/Home';
import { AuthProvider } from './lib/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';

// Cargadas bajo demanda: no viajan en el bundle de la home.
const Novedades = lazy(() => import('./pages/Novedades'));
const AdminLogin = lazy(() => import('./pages/AdminLogin'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function PageLoader() {
  return (
    <div className="min-h-screen bg-light flex items-center justify-center">
      <span className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></span>
    </div>
  );
}

function PublicLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <MVPFooter />
      <VisitModal />
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <SmoothScroll>
          <div className="bg-light min-h-screen font-sans text-dark selection:bg-primary selection:text-white">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                {/* Rutas Públicas */}
                <Route element={<PublicLayout />}>
                  <Route path="/" element={<Home />} />
                  <Route path="/novedades" element={<Novedades />} />
                </Route>

                {/* Rutas Administrativas */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/admin/dashboard" element={<AdminDashboard />} />
                </Route>

                {/* Cualquier ruta desconocida vuelve al inicio */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </Suspense>
          </div>
        </SmoothScroll>
      </BrowserRouter>
    </AuthProvider>
  );
}
