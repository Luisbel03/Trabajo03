import React from 'react';
import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    title: 'E-commerce Premium',
    description: 'Plataforma de comercio electrónico con integración de pagos y gestión de inventario.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React', 'Node.js', 'MongoDB']
  },
  {
    title: 'App de Delivery',
    description: 'Aplicación móvil para entrega de productos con seguimiento en tiempo real.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['React Native', 'Firebase', 'Google Maps']
  },
  {
    title: 'Dashboard Empresarial',
    description: 'Panel de control para análisis de datos y métricas de negocio.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['Vue.js', 'D3.js', 'Python']
  },
  {
    title: 'Red Social Profesional',
    description: 'Plataforma de networking para profesionales del sector tecnológico.',
    image: 'https://via.placeholder.com/400x300',
    tags: ['Angular', 'TypeScript', 'AWS']
  }
];

const Projects: React.FC = () => {
  return (
    <motion.div
      className="projects-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="projects-header">
        <h1>Nuestros Proyectos</h1>
        <p>Descubre algunos de nuestros trabajos más destacados</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            className="project-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
          >
            <div className="project-image">
              <img src={project.image} alt={project.title} />
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-tags">
                {project.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Projects; 