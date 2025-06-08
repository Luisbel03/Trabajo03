import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentCard from './ContentCard';
import ContentModal from './ContentModal';
import './ExploraContenidos.css';

// Datos de ejemplo
const contenidoEjemplo = [
  {
    id: 1,
    tipo: 'video',
    titulo: 'Diseño Web Moderno',
    descripcion: 'Aprende las últimas tendencias en diseño web',
    imagen: 'https://via.placeholder.com/300x200',
    categoria: 'Diseño',
    duracion: '15:30',
    autor: 'Ana García',
    procesoCreativo: 'Este video fue creado después de investigar las tendencias actuales en diseño web. El proceso incluyó la recopilación de ejemplos modernos, análisis de patrones de diseño y pruebas de usabilidad con usuarios reales.'
  },
  {
    id: 2,
    tipo: 'podcast',
    titulo: 'El Futuro del Desarrollo Web',
    descripcion: 'Conversación sobre las nuevas tecnologías web',
    imagen: 'https://via.placeholder.com/300x200',
    categoria: 'Tecnología',
    duracion: '45:00',
    autor: 'Carlos Ruiz',
    procesoCreativo: 'Este podcast surgió de una serie de entrevistas con expertos en desarrollo web. La preparación incluyó investigación exhaustiva y la creación de un guion detallado para mantener la conversación enfocada y relevante.'
  },
  {
    id: 3,
    tipo: 'articulo',
    titulo: 'Optimización de Rendimiento Web',
    descripcion: 'Guía completa de optimización',
    imagen: 'https://via.placeholder.com/300x200',
    categoria: 'Desarrollo',
    duracion: '10 min lectura',
    autor: 'Laura Martínez',
    procesoCreativo: 'Este artículo fue el resultado de meses de investigación y pruebas prácticas. Se realizaron múltiples pruebas de rendimiento y se consultaron diversas fuentes para crear una guía completa y práctica.'
  },
  {
    id: 4,
    tipo: 'video',
    titulo: 'Animaciones con CSS',
    descripcion: 'Tutorial práctico de animaciones CSS',
    imagen: 'https://via.placeholder.com/300x200',
    categoria: 'Diseño',
    duracion: '20:15',
    autor: 'Pedro Sánchez',
    procesoCreativo: 'La creación de este video tutorial involucró la planificación cuidadosa de ejemplos prácticos y la creación de casos de uso reales para demostrar el poder de las animaciones CSS.'
  },
  {
    id: 5,
    tipo: 'podcast',
    titulo: 'UX/UI en la Práctica',
    descripcion: 'Experiencias reales en diseño UX',
    imagen: 'https://via.placeholder.com/300x200',
    categoria: 'Diseño',
    duracion: '35:45',
    autor: 'María Torres',
    procesoCreativo: 'Este episodio se basó en experiencias reales de diseñadores UX/UI. Se recopilaron historias y casos de estudio para proporcionar insights valiosos a la audiencia.'
  },
  {
    id: 6,
    tipo: 'articulo',
    titulo: 'SEO Avanzado',
    descripcion: 'Técnicas modernas de SEO',
    imagen: 'https://via.placeholder.com/300x200',
    categoria: 'Marketing',
    duracion: '15 min lectura',
    autor: 'Diego López',
    procesoCreativo: 'La investigación para este artículo incluyó el análisis de casos de éxito en SEO y la validación de técnicas modernas con expertos en el campo.'
  }
];

const ExploraContenidos: React.FC = () => {
  const [filtroTipo, setFiltroTipo] = useState<string>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [contenidoSeleccionado, setContenidoSeleccionado] = useState<any>(null);

  const categorias = ['todas', ...Array.from(new Set(contenidoEjemplo.map(item => item.categoria.toLowerCase())))];
  const tipos = ['todos', ...Array.from(new Set(contenidoEjemplo.map(item => item.tipo)))];

  const contenidoFiltrado = contenidoEjemplo.filter(item => {
    const cumpleTipo = filtroTipo === 'todos' || item.tipo === filtroTipo;
    const cumpleCategoria = filtroCategoria === 'todas' || item.categoria.toLowerCase() === filtroCategoria;
    return cumpleTipo && cumpleCategoria;
  });

  return (
    <motion.div 
      className="explora-contenidos"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="header-section">
        <h1>Explora Contenidos</h1>
        <p>Descubre nuestra colección de contenidos educativos y creativos</p>
      </div>

      <div className="filtros">
        <div className="filtro-grupo">
          <label>Tipo:</label>
          <select 
            value={filtroTipo} 
            onChange={(e) => setFiltroTipo(e.target.value)}
          >
            {tipos.map(tipo => (
              <option key={tipo} value={tipo}>
                {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="filtro-grupo">
          <label>Categoría:</label>
          <select 
            value={filtroCategoria} 
            onChange={(e) => setFiltroCategoria(e.target.value)}
          >
            {categorias.map(categoria => (
              <option key={categoria} value={categoria}>
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <motion.div 
        className="contenido-grid"
        layout
      >
        <AnimatePresence>
          {contenidoFiltrado.map(item => (
            <ContentCard
              key={item.id}
              contenido={item}
              onClick={() => setContenidoSeleccionado(item)}
            />
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>
        {contenidoSeleccionado && (
          <ContentModal
            contenido={contenidoSeleccionado}
            onClose={() => setContenidoSeleccionado(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExploraContenidos; 