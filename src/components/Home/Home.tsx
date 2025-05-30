import React from 'react';
import { motion } from 'framer-motion';
import './Home.css';

const Home: React.FC = () => {
  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section">
        <h1>Bienvenido a Creative Web</h1>
        <p>Transformando ideas en experiencias digitales únicas</p>
      </div>

      <div className="features-grid">
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3>Diseño Moderno</h3>
          <p>Interfaces elegantes y responsivas para todo tipo de dispositivos</p>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3>Desarrollo Ágil</h3>
          <p>Soluciones rápidas y eficientes para tu negocio</p>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <h3>Innovación</h3>
          <p>Tecnologías de vanguardia para proyectos únicos</p>
        </motion.div>
      </div>

      <motion.div 
        className="cta-section"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h2>¿Listo para comenzar?</h2>
        <p>Descubre cómo podemos ayudarte a alcanzar tus objetivos</p>
        <button className="cta-button">Contáctanos</button>
      </motion.div>
    </motion.div>
  );
};

export default Home; 