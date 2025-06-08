import React from 'react';
import { motion } from 'framer-motion';
import './ExploraContenidos.css';

interface Contenido {
  id: number;
  tipo: string;
  titulo: string;
  descripcion: string;
  imagen: string;
  categoria: string;
  duracion: string;
  autor: string;
  procesoCreativo: string;
}

interface ContentCardProps {
  contenido: Contenido;
  onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ contenido, onClick }) => {
  const getTipoIcon = (tipo: string) => {
    switch (tipo) {
      case 'video':
        return '🎥';
      case 'podcast':
        return '🎧';
      case 'articulo':
        return '📝';
      default:
        return '📄';
    }
  };

  return (
    <motion.div
      className="content-card"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
    >
      <div className="card-image">
        <img src={contenido.imagen} alt={contenido.titulo} />
        <span className="tipo-badge">
          {getTipoIcon(contenido.tipo)} {contenido.tipo.charAt(0).toUpperCase() + contenido.tipo.slice(1)}
        </span>
      </div>
      <div className="card-content">
        <h3>{contenido.titulo}</h3>
        <p>{contenido.descripcion}</p>
        <div className="card-meta">
          <span className="categoria">{contenido.categoria}</span>
          <span className="duracion">{contenido.duracion}</span>
        </div>
        <div className="card-autor">
          <span>Por {contenido.autor}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default ContentCard; 