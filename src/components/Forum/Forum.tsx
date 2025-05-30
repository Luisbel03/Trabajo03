import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import './Forum.css';

interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
}

const initialPosts: Post[] = [
  {
    id: 1,
    title: 'Tendencias en Desarrollo Web 2024',
    content: 'Las últimas tendencias incluyen el uso de IA en desarrollo web, arquitecturas sin servidor y diseño minimalista.',
    author: 'Ana García',
    date: '2024-03-15',
    likes: 24,
    comments: 8
  },
  {
    id: 2,
    title: 'Optimización de Rendimiento en React',
    content: 'Mejores prácticas para optimizar el rendimiento de aplicaciones React, incluyendo el uso de useMemo y useCallback.',
    author: 'Carlos Ruiz',
    date: '2024-03-14',
    likes: 32,
    comments: 12
  },
  {
    id: 3,
    title: 'Seguridad en Aplicaciones Web',
    content: 'Guía completa sobre cómo proteger tus aplicaciones web contra vulnerabilidades comunes.',
    author: 'Laura Martínez',
    date: '2024-03-13',
    likes: 18,
    comments: 6
  }
];

const Forum: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [newPost, setNewPost] = useState({ title: '', content: '' });
  const { addNotification } = useNotifications();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.title || !newPost.content) {
      addNotification({
        type: 'error',
        title: 'Error',
        message: 'Por favor completa todos los campos'
      });
      return;
    }

    const post: Post = {
      id: posts.length + 1,
      title: newPost.title,
      content: newPost.content,
      author: 'Usuario Anónimo',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0
    };

    setPosts([post, ...posts]);
    setNewPost({ title: '', content: '' });
    addNotification({
      type: 'success',
      title: '¡Publicación creada!',
      message: 'Tu mensaje ha sido publicado exitosamente'
    });
  };

  const handleLike = (id: number) => {
    setPosts(posts.map(post =>
      post.id === id ? { ...post, likes: post.likes + 1 } : post
    ));
  };

  return (
    <motion.div
      className="forum-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="forum-header">
        <h1>Foro de Discusión</h1>
        <p>Comparte tus ideas y conocimientos con la comunidad</p>
      </div>

      <motion.form
        className="new-post-form"
        onSubmit={handleSubmit}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <input
          type="text"
          placeholder="Título de tu publicación"
          value={newPost.title}
          onChange={e => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Contenido de tu publicación"
          value={newPost.content}
          onChange={e => setNewPost({ ...newPost, content: e.target.value })}
          rows={4}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Publicar
        </motion.button>
      </motion.form>

      <div className="posts-container">
        <AnimatePresence>
          {posts.map((post, index) => (
            <motion.div
              key={post.id}
              className="post-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <h3>{post.title}</h3>
              <p className="post-content">{post.content}</p>
              <div className="post-meta">
                <span className="author">{post.author}</span>
                <span className="date">{post.date}</span>
              </div>
              <div className="post-actions">
                <button
                  className="like-button"
                  onClick={() => handleLike(post.id)}
                >
                  👍 {post.likes}
                </button>
                <span className="comments">💬 {post.comments}</span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Forum; 