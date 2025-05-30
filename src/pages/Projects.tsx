import React from 'react';
import AnimatedElement from '../components/AnimatedElement/AnimatedElement';

const Projects: React.FC = () => {
  const projects = [
    {
      id: 1,
      title: 'E-commerce Moderno',
      description: 'Plataforma de comercio electrónico con diseño responsivo',
      image: 'https://source.unsplash.com/800x600/?ecommerce',
      tags: ['React', 'Node.js', 'MongoDB']
    },
    {
      id: 2,
      title: 'App de Gestión',
      description: 'Sistema de gestión empresarial personalizado',
      image: 'https://source.unsplash.com/800x600/?business',
      tags: ['TypeScript', 'Express', 'PostgreSQL']
    },
    {
      id: 3,
      title: 'Portal Educativo',
      description: 'Plataforma de aprendizaje en línea',
      image: 'https://source.unsplash.com/800x600/?education',
      tags: ['React', 'Firebase', 'Material-UI']
    }
  ];

  return (
    <div className="projects-page">
      <AnimatedElement animation="fadeIn">
        <div className="page-header container">
          <h1>Nuestros Proyectos</h1>
          <p>Descubre algunos de nuestros trabajos más destacados</p>
        </div>
      </AnimatedElement>

      <div className="projects-grid container">
        {projects.map((project) => (
          <AnimatedElement
            key={project.id}
            animation="scale"
            delay={project.id * 0.1}
          >
            <div className="project-card">
              <div className="project-image">
                <img src={project.image} alt={project.title} />
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedElement>
        ))}
      </div>
    </div>
  );
};

export default Projects; 