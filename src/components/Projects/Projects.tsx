import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Modal from 'react-modal';
import './Projects.css';

// Asegurarse de que el modal se monte en el elemento root de la aplicación
Modal.setAppElement('#root');

// Tipos de modales disponibles
type ModalType = 'ecommerce' | 'management-system' | 'mobile-app' | null;

const projects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Plataforma de comercio electrónico con integración de pagos y gestión de inventario.',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    technologies: ['React', 'Node.js', 'MongoDB'],
    modalType: 'ecommerce' as ModalType
  },
  {
    id: 2,
    title: 'Sistema de Gestión',
    description: 'Sistema integral para la gestión de recursos empresariales.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    technologies: ['Angular', 'Django', 'PostgreSQL'],
    modalType: 'management-system' as ModalType
  },
  {
    id: 3,
    title: 'Aplicación Móvil',
    description: 'App móvil para seguimiento de actividades físicas y nutrición.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80',
    technologies: ['React Native', 'Firebase'],
    modalType: 'mobile-app' as ModalType
  }
];

const modalContent = {
  'ecommerce': {
    title: '¿Qué es el E-commerce?',
    sections: [
      {
        title: '¿Qué es el E-commerce?',
        content: 'El e-commerce o comercio electrónico es la compra y venta de productos o servicios a través de plataformas digitales, especialmente sitios web y aplicaciones móviles. Permite a los usuarios realizar transacciones desde cualquier lugar y en cualquier momento.'
      },
      {
        title: 'Beneficios del E-commerce',
        list: [
          'Accesibilidad 24/7.',
          'Alcance global.',
          'Reducción de costos operativos.',
          'Análisis de comportamiento del cliente.',
          'Automatización de procesos como pagos e inventario.'
        ]
      },
      {
        title: 'Desventajas del E-commerce',
        list: [
          'Falta de interacción física con el producto.',
          'Dependencia de la conectividad a internet.',
          'Competencia alta y saturación del mercado.',
          'Problemas de seguridad en transacciones si no se implementan medidas adecuadas.'
        ]
      },
      {
        title: 'Reseña de nuestro proyecto',
        content: 'Nuestro proyecto \'E-commerce Platform\' es una tienda en línea moderna, enfocada en brindar una experiencia de usuario fluida e intuitiva. Integra un sistema de pagos seguro, permite la gestión de inventario en tiempo real, y ha sido diseñada para adaptarse tanto a móviles como a ordenadores. Aunque se encuentra en fase de desarrollo, ya cuenta con una estructura sólida, interfaz atractiva y pruebas funcionales exitosas.'
      },
      {
        title: 'Videos relacionados',
        videos: [
          { 
            url: 'https://youtu.be/S8p31Sg69RY?si=k7udE0hTlupUIhK9', 
            title: 'Introducción al E-commerce' 
          },
          { 
            url: 'https://youtu.be/Z0ICdXpvjHw?si=oyCVqiIILTFW_UG0', 
            title: 'Estrategias de E-commerce' 
          },
          { 
            url: 'https://youtu.be/tuG6f6BIdVc?si=hcezAek9HowiqNVe', 
            title: 'Implementación de E-commerce' 
          }
        ]
      }
    ]
  },
  'management-system': {
    title: '¿Qué es un sistema de gestión?',
    sections: [
      {
        title: '¿Qué es un sistema de gestión?',
        content: 'Un sistema de gestión es una plataforma tecnológica diseñada para planificar, organizar y controlar los recursos, procesos y actividades de una empresa. Estos sistemas integran diferentes áreas funcionales como finanzas, recursos humanos, inventario, producción y ventas, permitiendo una visión completa del negocio.'
      },
      {
        title: 'Beneficios de un sistema de gestión empresarial',
        list: [
          'Automatización de tareas repetitivas.',
          'Mejora en la toma de decisiones gracias a la centralización de datos.',
          'Aumento de la productividad y eficiencia operativa.',
          'Reducción de errores humanos.',
          'Control en tiempo real de los procesos empresariales.'
        ]
      },
      {
        title: 'Desventajas de los sistemas de gestión',
        list: [
          'Costos de implementación elevados.',
          'Requiere capacitación del personal.',
          'Dependencia tecnológica.',
          'Riesgos de seguridad si no se aplican buenas prácticas.'
        ]
      },
      {
        title: 'Reseña de nuestro proyecto',
        content: 'Nuestro proyecto \'Sistema de Gestión\' busca ofrecer una solución integral para pequeñas y medianas empresas. A través de una plataforma intuitiva y personalizable, permite gestionar inventarios, finanzas y recursos humanos desde un solo lugar. Su arquitectura modular facilita la escalabilidad y adaptación según las necesidades del cliente. Actualmente estamos en etapa de pruebas funcionales con resultados prometedores.'
      },
      {
        title: 'Videos recomendados sobre sistemas de gestión',
        videos: [
          { 
            url: 'https://youtu.be/xtc6cqg49EA?si=b44IoRz8Owx40M6y', 
            title: 'Fundamentos de Sistemas de Gestión' 
          },
          { 
            url: 'https://youtu.be/5X64YBXdq24?si=-E7jgsmr4Nh9b2VS', 
            title: 'Optimización de Procesos Empresariales' 
          },
          { 
            url: 'https://youtu.be/uqDlITegcZg?si=dAEMwvMf2d-BK7JK', 
            title: 'Gestión Empresarial Moderna' 
          }
        ]
      }
    ]
  },
  'mobile-app': {
    title: '¿Qué es una aplicación móvil de salud y bienestar?',
    sections: [
      {
        title: '¿Qué es una aplicación móvil de salud y bienestar?',
        content: 'Es una herramienta digital diseñada para dispositivos móviles que permite a los usuarios registrar, controlar y mejorar aspectos de su salud, como el ejercicio físico, la nutrición, el sueño y otros hábitos saludables. Estas aplicaciones ayudan a fomentar un estilo de vida activo y equilibrado.'
      },
      {
        title: 'Beneficios de este tipo de apps',
        list: [
          'Seguimiento personalizado de actividades físicas y metas.',
          'Registro diario de comidas y calorías.',
          'Motivación mediante alertas, estadísticas y rutinas guiadas.',
          'Mejora de hábitos alimenticios y físicos con información basada en datos.'
        ]
      },
      {
        title: 'Posibles desventajas',
        list: [
          'Dependencia tecnológica.',
          'Necesidad de acceso constante a internet o GPS.',
          'Riesgos de privacidad si no se protege bien la información personal.',
          'Puede causar frustración si no se logran los objetivos establecidos.'
        ]
      },
      {
        title: 'Reseña de nuestro proyecto',
        content: 'Nuestra \'Aplicación Móvil\' está pensada para quienes desean mejorar su bienestar físico y nutricional. La app incluye funciones de registro de entrenamientos, planificación de dietas y recomendaciones personalizadas basadas en objetivos. Ha sido diseñada con una interfaz amigable e intuitiva, enfocada en motivar al usuario con metas alcanzables y retroalimentación constante. Actualmente, estamos integrando sincronización con dispositivos wearables como smartwatches y pulseras de actividad.'
      },
      {
        title: 'Videos recomendados sobre apps de salud y bienestar',
        videos: [
          { 
            url: 'https://youtu.be/gZ_KCjzEIdU?si=vzIoP5IuLxizcygM', 
            title: 'Desarrollo de Apps de Salud' 
          },
          { 
            url: 'https://youtu.be/g0a13m-6g5I?si=zqNxIkSLWNIfi_e0', 
            title: 'Tecnologías para el Bienestar' 
          },
          { 
            url: 'https://youtu.be/An2na7EKMIE?si=yOlKeJK7HB9EugYl', 
            title: 'Innovación en Apps de Fitness' 
          }
        ]
      }
    ]
  }
};

const Projects: React.FC = () => {
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const openModal = (modalType: ModalType) => {
    setActiveModal(modalType);
  };

  const closeModal = () => {
    setActiveModal(null);
  };

  // Estilos personalizados para el modal
  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      maxWidth: '800px',
      width: '90%',
      maxHeight: '90vh',
      padding: '2.5rem',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      border: 'none',
      overflow: 'auto'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    }
  };

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
        {projects.map((project) => (
          <motion.div
            key={project.id}
            className="project-card"
            whileHover={{ y: -10 }}
            transition={{ type: "spring", stiffness: 300 }}
            onClick={project.modalType ? () => openModal(project.modalType) : undefined}
            style={project.modalType ? { cursor: 'pointer' } : undefined}
          >
            <img src={project.image} alt={project.title} className="project-image" />
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="project-technologies">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="technology-tag">{tech}</span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <Modal
        isOpen={activeModal !== null}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Project Details Modal"
      >
        {activeModal && (
          <div className="modal-content">
            <button 
              onClick={closeModal}
              className="modal-close-button"
              aria-label="Cerrar modal"
            >
              &times;
            </button>

            <div className="project-modal-content">
              {modalContent[activeModal].sections.map((section, index) => (
                <section key={index} className="modal-section">
                  <h2>{section.title}</h2>
                  {section.content && <p>{section.content}</p>}
                  {section.list && (
                    <ul>
                      {section.list.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  )}
                  {section.videos && (
                    <div className="video-links">
                      {section.videos.map((video, i) => (
                        <a 
                          key={i}
                          href={video.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {video.title}
                        </a>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>
          </div>
        )}
      </Modal>
    </motion.div>
  );
};

export default Projects; 