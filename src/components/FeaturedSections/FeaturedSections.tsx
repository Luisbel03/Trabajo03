import React from 'react';
import { motion } from 'framer-motion';
import AnimatedElement from '../AnimatedElement/AnimatedElement';
import './FeaturedSections.css';

interface FeatureCard {
  id: number;
  title: string;
  description: string;
  icon: string;
  link: string;
}

const features: FeatureCard[] = [
  {
    id: 1,
    title: "Diseño Web",
    description: "Creamos diseños modernos y atractivos que cautivan a tu audiencia",
    icon: "🎨",
    link: "/servicios#diseno"
  },
  {
    id: 2,
    title: "Desarrollo",
    description: "Construimos aplicaciones web robustas y escalables",
    icon: "💻",
    link: "/servicios#desarrollo"
  },
  {
    id: 3,
    title: "Marketing Digital",
    description: "Estrategias efectivas para aumentar tu presencia online",
    icon: "📈",
    link: "/servicios#marketing"
  },
  {
    id: 4,
    title: "Soporte 24/7",
    description: "Asistencia técnica continua para tu tranquilidad",
    icon: "🛟",
    link: "/servicios#soporte"
  }
];

const FeaturedSections: React.FC = () => {
  return (
    <section className="featured-sections">
      <div className="container">
        <AnimatedElement animation="slideUp">
          <h2 className="section-title">Nuestros Servicios</h2>
        </AnimatedElement>
        
        <div className="features-grid">
          {features.map((feature, index) => (
            <AnimatedElement
              key={feature.id}
              animation="scale"
              delay={index * 0.1}
            >
              <motion.a
                href={feature.link}
                className="feature-card"
                whileHover={{
                  scale: 1.03,
                  y: -5,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div
                  className="feature-icon"
                  whileHover={{ rotate: [0, -10, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  {feature.icon}
                </motion.div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <motion.div
                  className="feature-link"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  Explorar
                  <span className="arrow">→</span>
                </motion.div>
              </motion.a>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedSections; 