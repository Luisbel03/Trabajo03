import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import Projects from '../pages/Projects';
import Contact from '../pages/Contact';
import Forum from '../components/Forum/Forum';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/servicios" element={<Services />} />
      <Route path="/proyectos" element={<Projects />} />
      <Route path="/contacto" element={<Contact />} />
      <Route path="/foro" element={<Forum />} />
    </Routes>
  );
};

export default AppRoutes; 