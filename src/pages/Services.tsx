import React from 'react';
import FeaturedSections from '../components/FeaturedSections/FeaturedSections';
import AnimatedElement from '../components/AnimatedElement/AnimatedElement';

const Services: React.FC = () => {
  return (
    <div className="services-page">
      <AnimatedElement animation="fadeIn">
        <div className="page-header container">
          <h1>Nuestros Servicios</h1>
          <p>Soluciones digitales adaptadas a tus necesidades</p>
        </div>
      </AnimatedElement>
      <FeaturedSections />
    </div>
  );
};

export default Services; 