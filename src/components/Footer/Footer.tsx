import React from 'react';
import { motion } from 'framer-motion';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'LinkedIn', url: '#', icon: '🔗' },
    { name: 'GitHub', url: '#', icon: '💻' },
    { name: 'Twitter', url: '#', icon: '🐦' },
    { name: 'Instagram', url: '#', icon: '📸' }
  ];

  const quickLinks = [
    { name: 'Inicio', url: '#' },
    { name: 'Servicios', url: '#services' },
    { name: 'Proyectos', url: '#projects' },
    { name: 'Blog', url: '#blog' },
    { name: 'Contacto', url: '#contact' }
  ];

  const companyLinks = [
    { name: 'Sobre Nosotros', url: '#about' },
    { name: 'Equipo', url: '#team' },
    { name: 'Carreras', url: '#careers' },
    { name: 'Política de Privacidad', url: '#privacy' },
    { name: 'Términos de Servicio', url: '#terms' }
  ];

  return (
    <footer className="footer">
      <div className="footer-content container">
        <div className="footer-section">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Web Creativa
          </motion.h3>
          <p className="footer-description">
            Transformando ideas en experiencias digitales excepcionales. 
            Diseño web moderno y desarrollo de aplicaciones a medida.
          </p>
          <div className="social-links">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.url}
                aria-label={link.name}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="social-icon" aria-hidden="true">
                  {link.icon}
                </span>
              </motion.a>
            ))}
          </div>
        </div>

        <div className="footer-section">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Enlaces Rápidos
          </motion.h4>
          <ul className="footer-links">
            {quickLinks.map((link) => (
              <li key={link.name}>
                <motion.a
                  href={link.url}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Compañía
          </motion.h4>
          <ul className="footer-links">
            {companyLinks.map((link) => (
              <li key={link.name}>
                <motion.a
                  href={link.url}
                  whileHover={{ x: 5 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {link.name}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer-section">
          <motion.h4
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Newsletter
          </motion.h4>
          <p>Suscríbete para recibir noticias y actualizaciones.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Tu correo electrónico"
              aria-label="Correo electrónico para newsletter"
            />
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Suscribirse
            </motion.button>
          </form>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p className="copyright">
            © {currentYear} Web Creativa. Todos los derechos reservados.
          </p>
          <p className="credits">
            Diseñado y desarrollado con ❤️ en España
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 