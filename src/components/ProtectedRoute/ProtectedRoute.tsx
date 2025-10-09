import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactElement;
  requireAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false
}) => {
  const { user, loading, isAdmin } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '1.25rem',
        color: 'var(--text-secondary)'
      }}>
        Cargando...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>
          Acceso Denegado
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          No tienes permisos para acceder a esta página.
        </p>
        <a
          href="/"
          style={{
            padding: '0.75rem 1.5rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '0.375rem',
            fontWeight: '500'
          }}
        >
          Volver al Inicio
        </a>
      </div>
    );
  }

  return children;
};
