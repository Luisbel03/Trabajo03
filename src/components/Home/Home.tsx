import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';
import './Home.css';

// Asegurarse de que el modal se monte en el elemento root de la aplicación
Modal.setAppElement('#root');

// Tipos de modales disponibles
type ModalType = 'modern-design' | 'agile-development' | 'innovation' | null;

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [activeModal, setActiveModal] = useState<ModalType>(null);

  const handleContactClick = () => {
    navigate('/contacto');
  };

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
      maxWidth: '600px',
      width: '90%',
      padding: '2.5rem',
      borderRadius: '12px',
      backgroundColor: '#ffffff',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
      border: 'none'
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      zIndex: 1000
    }
  };

  // Contenido de los modales
  const modalContent = {
    'modern-design': {
      title: '¿Qué es el diseño moderno?',
      content: 'El diseño moderno se caracteriza por líneas limpias, minimalismo, funcionalidad y el uso de tecnologías actuales para crear experiencias visuales impactantes y prácticas. Es crucial en la actualidad porque refleja la identidad de las marcas, mejora la usabilidad de productos digitales y potencia la comunicación efectiva en medios visuales y plataformas web.'
    },
    'agile-development': {
      title: '¿Qué es el Desarrollo Ágil?',
      content: 'El desarrollo ágil es una metodología de gestión de proyectos que promueve la entrega continua de software funcional a través de ciclos iterativos y colaborativos. Se enfoca en la adaptabilidad al cambio, la comunicación constante con el cliente y la mejora continua del producto. Hoy en día es fundamental porque permite desarrollar soluciones eficientes, rápidas y alineadas con las necesidades reales de los usuarios.'
    },
    'innovation': {
      title: '¿Qué es la Innovación?',
      content: 'La innovación es la capacidad de crear o mejorar productos, servicios o procesos mediante ideas nuevas y originales que aporten valor. En el mundo actual, la innovación es esencial para diferenciarse, adaptarse a los cambios del entorno y responder a las necesidades del mercado. Es un motor clave del crecimiento empresarial y el desarrollo tecnológico.'
    }
  };

  return (
    <motion.div 
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="hero-section">
        <h1>Bienvenido a Web Creativa</h1>
        <p>Transformando ideas en experiencias digitales únicas</p>
      </div>

      <div className="features-grid">
        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('modern-design')}
          style={{ cursor: 'pointer' }}
        >
          <h3>Diseño Moderno</h3>
          <p>Interfaces elegantes y responsivas para todo tipo de dispositivos</p>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('agile-development')}
          style={{ cursor: 'pointer' }}
        >
          <h3>Desarrollo Ágil</h3>
          <p>Soluciones rápidas y eficientes para tu negocio</p>
        </motion.div>

        <motion.div 
          className="feature-card"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => openModal('innovation')}
          style={{ cursor: 'pointer' }}
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
        <button className="cta-button" onClick={handleContactClick}>Contáctanos</button>
      </motion.div>

      {/* Modal compartido para diferentes contenidos */}
      <Modal
        isOpen={activeModal !== null}
        onRequestClose={closeModal}
        style={customModalStyles}
        contentLabel="Information Modal"
      >
        <div className="modal-content">
          <button 
            onClick={closeModal}
            className="modal-close-button"
            aria-label="Cerrar modal"
          >
            &times;
          </button>
          {activeModal && (
            <>
              <h2>{modalContent[activeModal].title}</h2>
              <p>{modalContent[activeModal].content}</p>
            </>
          )}
        </div>
      </Modal>
    </motion.div>
  );
};

export default Home; 