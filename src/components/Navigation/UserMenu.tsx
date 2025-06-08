import React, { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './UserMenu.css';

const UserMenu: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { showNotification } = useNotification();

  const displayName = user?.first_name || user?.username || 'Usuario';

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  // Cerrar el menú cuando se hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector('.user-menu-container');
      if (menu && !menu.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="user-menu-container">
      <button
        className="user-menu-button"
        onClick={toggleMenu}
        aria-expanded={isOpen}
      >
        <span className="user-name">{displayName}</span>
        <span className="arrow-down">▼</span>
      </button>

      {isOpen && (
        <div className="user-menu-dropdown">
          <button onClick={() => handleNavigation('/perfil')}>
            <i className="fas fa-user"></i>
            Editar Perfil
          </button>
          <button onClick={() => handleNavigation('/cambiar-password')}>
            <i className="fas fa-key"></i>
            Cambiar Contraseña
          </button>
          <button onClick={handleLogout} className="logout-button">
            <i className="fas fa-sign-out-alt"></i>
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu; 