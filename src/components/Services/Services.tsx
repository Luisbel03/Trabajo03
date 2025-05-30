import React from 'react';
import { motion } from 'framer-motion';
import './Services.css';

const services = [
  {
    title: 'Desarrollo Web',
    description: 'Creación de sitios web modernos y responsivos utilizando las últimas tecnologías.',
    icon: '🌐'
  },
  {
    title: 'Aplicaciones Móviles',
    description: 'Desarrollo de apps nativas y multiplataforma para iOS y Android.',
    icon: '📱'
  },
  {
    title: 'Diseño UX/UI',
    description: 'Diseño de interfaces intuitivas y experiencias de usuario excepcionales.',
    icon: '🎨'
  },
  {
    title: 'E-Commerce',
    description: 'Implementación de tiendas online seguras y escalables.',
    icon: '🛍️'
  },
  {
    title: 'Marketing Digital',
    description: 'Estrategias de marketing y posicionamiento para tu negocio.',
    icon: '📈'
  },
  {
    title: 'Consultoría IT',
    description: 'Asesoramiento experto en tecnología y transformación digital.',
    icon: '💡'
  }
];

const Services: React.FC = () => {
  return (
    <motion.div
      className="services-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="services-header">
        <h1>Nuestros Servicios</h1>
        <p>Soluciones digitales adaptadas a tus necesidades</p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            className="service-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="service-icon">{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services; 