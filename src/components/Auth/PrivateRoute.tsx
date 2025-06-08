import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Si el usuario no está autenticado, redirigir al login
    return <Navigate to="/login" replace />;
  }

  // Si el usuario está autenticado, mostrar el componente hijo
  return <>{children}</>;
};

export default PrivateRoute; 