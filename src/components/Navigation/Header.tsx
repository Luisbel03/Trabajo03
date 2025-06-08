import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import UserMenu from './UserMenu';
import './Header.css';

const Header: React.FC = () => {
  const { user } = useAuth();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <Link to="/">Creative Web</Link>
        </div>
        <nav className="nav-links">
          <Link to="/" className="nav-link">Inicio</Link>
          <Link to="/proyectos" className="nav-link">Proyectos</Link>
          <Link to="/servicios" className="nav-link">Servicios</Link>
          <Link to="/foro" className="nav-link">Foro</Link>
          <Link to="/contacto" className="nav-link">Contacto</Link>
        </nav>
        <div className="auth-section">
          {user ? (
            <UserMenu />
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="login-button">Iniciar Sesión</Link>
              <Link to="/registro" className="register-button">Registrarse</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header; 