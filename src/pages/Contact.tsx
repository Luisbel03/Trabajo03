import React from 'react';
import ContactForm from '../components/ContactForm/ContactForm';
import AnimatedElement from '../components/AnimatedElement/AnimatedElement';

const Contact: React.FC = () => {
  return (
    <div className="contact-page">
      <AnimatedElement animation="fadeIn">
        <div className="page-header container">
          <h1>Contacto</h1>
          <p>¿Tienes un proyecto en mente? ¡Hablemos!</p>
        </div>
      </AnimatedElement>
      <div className="container">
        <ContactForm />
      </div>
    </div>
  );
};

export default Contact; 