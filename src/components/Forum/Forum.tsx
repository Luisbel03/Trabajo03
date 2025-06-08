import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PostForm from './PostForm';
import Reactions, { Reaction } from './Reactions';
import StarRating from './StarRating';
import forumService, { ForumTopic, ForumReply } from '../../services/forumService';
import { useAuth } from '../../context/AuthContext';
import { useNotification } from '../../context/NotificationContext';
import './Forum.css';

interface ExtendedForumReply extends ForumReply {
  author_name: string;
  author: string;
}

const Forum: React.FC = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [topics, setTopics] = useState<ForumTopic[]>([]);
  const [replies, setReplies] = useState<{ [key: number]: ExtendedForumReply[] }>({});
  const [newComment, setNewComment] = useState<string>('');
  const [editingReply, setEditingReply] = useState<{ id: number, content: string } | null>(null);
  const [activeCommentTopic, setActiveCommentTopic] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Depuración detallada del estado de autenticación
    console.log('Estado de autenticación detallado:', {
      isAuthenticated: !!user,
      currentUser: user?.username,
      userDetails: user
    });
  }, [user]);

  // Función de depuración mejorada
  const debugAuthorship = (reply: ExtendedForumReply) => {
    console.log('Debug botones detallado:', {
      currentUser: user?.username,
      replyAuthor: reply.author,
      shouldShowButtons: user?.username === reply.author,
      userObject: user,
      replyObject: reply
    });
    return user?.username === reply.author;
  };

  // Cargar temas del foro
  useEffect(() => {
    loadTopics();
  }, []);

  // Cargar respuestas cuando se selecciona un tema
  useEffect(() => {
    if (activeCommentTopic) {
      loadReplies(activeCommentTopic);
    }
  }, [activeCommentTopic]);

  const loadTopics = async () => {
    try {
      const response = await forumService.getTopics();
      setTopics(response.data || []);
      setError(null);
      setLoading(false);
    } catch (err: any) {
      console.error('Error loading topics:', err);
      setError(err.response?.data?.message || 'Error al cargar los temas');
      setLoading(false);
    }
  };

  const loadReplies = async (topicId: number) => {
    try {
      setError(null);
      const response = await forumService.getReplies(topicId);
      setReplies(prev => ({
        ...prev,
        [topicId]: response.data
      }));
    } catch (err: any) {
      console.error('Error al cargar las respuestas:', err);
      setError('Error al cargar las respuestas. Por favor, intenta de nuevo.');
      showNotification('Error al cargar las respuestas', 'error');
    }
  };

  const handleCreateTopic = async (content: string) => {
    try {
      setError(null);
      const response = await forumService.createTopic({
        title: content.split('\n')[0] || 'Sin título',
        content,
        category: 1, // Categoría por defecto
      });
      setTopics(prevTopics => [response.data, ...prevTopics]);
      setError(null); // Limpiar cualquier mensaje de error previo
    } catch (err: any) {
      console.error('Error creating topic:', err);
      setError('Error al crear el tema. Por favor, intenta de nuevo.');
    }
  };

  const handleAddComment = async (topicId: number) => {
    if (!newComment.trim()) return;

    try {
      setError(null);
      const response = await forumService.createReply({
        topic: topicId,
          content: newComment,
      });

      // Actualizar el estado de las respuestas de forma inmediata
      setReplies(prev => ({
        ...prev,
        [topicId]: [...(prev[topicId] || []), {
          ...response.data,
          author: user?.username || '',
          author_name: user?.username || ''
        }]
    }));

    setNewComment('');
      setActiveCommentTopic(null);
      showNotification('Comentario agregado exitosamente', 'success');

      // Recargar las respuestas para asegurar sincronización
      try {
        const updatedReplies = await forumService.getReplies(topicId);
        setReplies(prev => ({
          ...prev,
          [topicId]: updatedReplies.data
        }));
      } catch (err) {
        console.error('Error al recargar las respuestas:', err);
        // No mostramos error al usuario ya que el comentario se agregó correctamente
      }
    } catch (err: any) {
      console.error('Error al agregar comentario:', err);
      setError(err.response?.data?.message || 'Error al agregar el comentario');
      showNotification(
        err.response?.data?.message || 'Error al agregar el comentario',
        'error'
      );
    }
  };

  const handleVoteTopic = async (topicId: number, value: number) => {
    try {
      const response = await forumService.voteTopic(topicId, value);
      
      // Actualizar el tema específico con los nuevos valores de votos
      setTopics(prevTopics => prevTopics.map(topic => {
        if (topic.id === topicId) {
          return {
            ...topic,
            votes_count: response.data.votes_count,
            user_vote: response.data.user_vote
          };
        }
        return topic;
      }));
    } catch (err: any) {
      console.error('Error voting topic:', err);
      setError('Error al votar el tema. Por favor, intenta de nuevo.');
    }
  };

  const handleVoteReply = async (replyId: number, value: number) => {
    try {
      await forumService.voteReply(replyId, value);
      // Recargar las respuestas del tema actual
      if (activeCommentTopic) {
        loadReplies(activeCommentTopic);
      }
    } catch (err) {
      setError('Error al votar la respuesta');
    }
  };

  const isCommentOwner = (reply: ExtendedForumReply): boolean => {
    const isOwner = user?.username === reply.author;
    console.log('Verificación de propiedad:', {
      commentId: reply.id,
      currentUser: user?.username,
      commentAuthor: reply.author,
      isOwner,
      timestamp: new Date().toISOString()
    });
    return isOwner;
  };

  const handleEditReply = async (replyId: number, newContent: string) => {
    try {
      const targetReply = Object.values(replies)
        .flat()
        .find(reply => reply.id === replyId);

      if (!targetReply || !isCommentOwner(targetReply)) {
        showNotification('No tienes permiso para editar este comentario', 'error');
        return;
      }

      const response = await forumService.updateReply(replyId, { content: newContent });
      
      setReplies(prev => {
        const updatedReplies = { ...prev };
        Object.keys(updatedReplies).forEach(topicId => {
          updatedReplies[Number(topicId)] = updatedReplies[Number(topicId)].map(reply =>
            reply.id === replyId ? { ...response.data, author: user!.username } : reply
          );
        });
        return updatedReplies;
      });

      setEditingReply(null);
      showNotification('Comentario actualizado exitosamente', 'success');
    } catch (err: any) {
      console.error('Error updating reply:', err);
      showNotification(
        err.response?.data?.message || 'Error al actualizar el comentario',
        'error'
      );
    }
  };

  const handleDeleteReply = async (replyId: number) => {
    const targetReply = Object.values(replies)
      .flat()
      .find(reply => reply.id === replyId);

    if (!targetReply || !isCommentOwner(targetReply)) {
      showNotification('No tienes permiso para eliminar este comentario', 'error');
      return;
    }

    if (!window.confirm('¿Estás seguro de que deseas eliminar este comentario?')) {
      return;
    }

    try {
      await forumService.deleteReply(replyId);
      
      setReplies(prev => {
        const updatedReplies = { ...prev };
        Object.keys(updatedReplies).forEach(topicId => {
          updatedReplies[Number(topicId)] = updatedReplies[Number(topicId)].filter(
            reply => reply.id !== replyId
          );
        });
        return updatedReplies;
      });

      showNotification('Comentario eliminado exitosamente', 'success');
    } catch (err: any) {
      console.error('Error deleting reply:', err);
      showNotification(
        err.response?.data?.message || 'Error al eliminar el comentario',
        'error'
      );
    }
  };

  if (loading) return <div className="loading">Cargando...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="forum-container">
      <motion.div
        className="new-post-section"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2>Crear nueva publicación</h2>
        <PostForm onSubmit={handleCreateTopic} />
        {error && <div className="error-message">{error}</div>}
      </motion.div>

      <motion.div className="posts-section">
        <AnimatePresence>
          {topics.map(topic => (
            <motion.div
              key={topic.id}
              className="post-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="post-header">
                <h3>{topic.title}</h3>
                <span className="post-author">Por: {topic.author_name}</span>
                <span className="post-date">
                  {new Date(topic.created_at).toLocaleDateString()}
                </span>
              </div>

              <p className="post-content">{topic.content}</p>

              <div className="post-interactions">
                <div className="votes">
                  <button onClick={() => handleVoteTopic(topic.id, 1)}>👍</button>
                  <span>{topic.votes_count}</span>
                  <button onClick={() => handleVoteTopic(topic.id, -1)}>👎</button>
                </div>
              </div>

              <div className="comments-section">
                {replies[topic.id]?.map(reply => (
                  <motion.div
                    key={reply.id}
                    className="comment"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {editingReply?.id === reply.id ? (
                      <div className="edit-form">
                        <textarea
                          value={editingReply.content}
                          onChange={(e) => setEditingReply({ ...editingReply, content: e.target.value })}
                          className="edit-textarea"
                        />
                        <div className="edit-actions">
                          <button
                            onClick={() => handleEditReply(reply.id, editingReply.content)}
                            className="save-button"
                          >
                            Guardar
                          </button>
                          <button
                            onClick={() => setEditingReply(null)}
                            className="cancel-button"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="comment-header">
                          <strong>{reply.author_name}</strong>
                    <span className="comment-date">
                            {new Date(reply.created_at).toLocaleDateString()}
                    </span>
                        </div>
                        <p>{reply.content}</p>
                        {isCommentOwner(reply) && (
                          <div className="comment-actions">
                            <button
                              onClick={() => setEditingReply({ id: reply.id, content: reply.content })}
                              className="edit-button"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDeleteReply(reply.id)}
                              className="delete-button"
                            >
                              Eliminar
                            </button>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                ))}

                {activeCommentTopic === topic.id ? (
                  <div className="add-comment">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Escribe un comentario..."
                      className="comment-textarea"
                    />
                    <div className="comment-actions">
                      <button
                        onClick={() => handleAddComment(topic.id)}
                        className="submit-button"
                        disabled={!newComment.trim()}
                      >
                        Enviar
                      </button>
                      <button
                        onClick={() => {
                          setActiveCommentTopic(null);
                          setNewComment('');
                          setError(null);
                        }}
                        className="cancel-button"
                      >
                        Cancelar
                      </button>
                    </div>
                    {error && <div className="error-message">{error}</div>}
                  </div>
                ) : (
                  <button
                    className="add-comment-button"
                    onClick={() => {
                      setActiveCommentTopic(topic.id);
                      setError(null);
                    }}
                  >
                    Agregar comentario
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Forum; 