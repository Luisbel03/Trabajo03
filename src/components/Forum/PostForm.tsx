import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './Forum.css';

interface PostFormProps {
  onSubmit: (content: string) => void;
  placeholder?: string;
  buttonText?: string;
}

const PostForm: React.FC<PostFormProps> = ({
  onSubmit,
  placeholder = '¿Qué estás pensando?',
  buttonText = 'Publicar'
}) => {
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!content.trim()) {
      setError('El mensaje no puede estar vacío');
      return;
    }

    onSubmit(content);
    setContent('');
    setError('');
  };

  return (
    <motion.form
      className="post-form"
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        className={error ? 'error' : ''}
      />
      {error && <span className="error-message">{error}</span>}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {buttonText}
      </motion.button>
    </motion.form>
  );
};

export default PostForm; 