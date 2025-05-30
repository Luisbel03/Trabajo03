import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Header.css';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { path: '/', label: 'Inicio' },
    { path: '/servicios', label: 'Servicios' },
    { path: '/proyectos', label: 'Proyectos' },
    { path: '/foro', label: 'Foro' },
    { path: '/contacto', label: 'Contacto' }
  ];

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          Creative Web
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <AnimatePresence>
          <motion.nav
            className={`navigation ${isMenuOpen ? 'active' : ''}`}
            initial={false}
            animate={{ x: isMenuOpen ? 0 : '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <ul className="nav-links">
              {menuItems.map((item) => (
                <motion.li
                  key={item.path}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={location.pathname === item.path ? 'active' : ''}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.nav>
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Header; 