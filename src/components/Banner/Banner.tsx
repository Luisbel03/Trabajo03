import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Banner.css';

interface Slide {
  id: number;
  title: string;
  description: string;
  image: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: "Diseño Web Creativo",
    description: "Creamos experiencias digitales únicas y memorables",
    image: "https://source.unsplash.com/1600x900/?web,design"
  },
  {
    id: 2,
    title: "Soluciones Innovadoras",
    description: "Transformamos ideas en realidades digitales",
    image: "https://source.unsplash.com/1600x900/?technology"
  },
  {
    id: 3,
    title: "Desarrollo Responsivo",
    description: "Sitios web que se adaptan a todos los dispositivos",
    image: "https://source.unsplash.com/1600x900/?responsive"
  }
];

const slideVariants = {
  enter: {
    opacity: 0,
    scale: 1.1
  },
  center: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.8
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: {
      duration: 0.5
    }
  }
};

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 50
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay: 0.3
    }
  }
};

const Banner: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="banner">
      <div className="slides-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[currentSlide].id}
            className="slide active"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <motion.div
              className="slide-content"
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                {slides[currentSlide].title}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                {slides[currentSlide].description}
              </motion.p>
              <motion.button
                className="cta-button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Saber más
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="slide-indicators">
        {slides.map((_, index) => (
          <motion.button
            key={index}
            className={`indicator ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </section>
  );
};

export default Banner; 