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

interface ContentModalProps {
  contenido: Contenido;
  onClose: () => void;
}

const ContentModal: React.FC<ContentModalProps> = ({ contenido, onClose }) => {
  return (
    <motion.div
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="modal-header">
          <img src={contenido.imagen} alt={contenido.titulo} />
          <div className="modal-title">
            <h2>{contenido.titulo}</h2>
            <div className="modal-meta">
              <span className="tipo">{contenido.tipo.charAt(0).toUpperCase() + contenido.tipo.slice(1)}</span>
              <span className="categoria">{contenido.categoria}</span>
              <span className="duracion">{contenido.duracion}</span>
            </div>
          </div>
        </div>

        <div className="modal-body">
          <div className="contenido-descripcion">
            <h3>Descripción</h3>
            <p>{contenido.descripcion}</p>
          </div>

          <div className="proceso-creativo">
            <h3>Proceso Creativo</h3>
            <p>{contenido.procesoCreativo}</p>
          </div>

          <div className="autor-info">
            <h3>Sobre el Autor</h3>
            <p>Creado por {contenido.autor}</p>
          </div>
        </div>

        {contenido.tipo === 'video' && (
          <div className="video-preview">
            <div className="video-placeholder">
              <span>🎥 Vista previa del video no disponible en este momento</span>
            </div>
          </div>
        )}

        {contenido.tipo === 'podcast' && (
          <div className="podcast-player">
            <div className="player-placeholder">
              <span>🎧 Reproductor de audio no disponible en este momento</span>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ContentModal; 