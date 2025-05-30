import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ForumMessage as IForumMessage } from '../../types/forum';
import './Forum.css';

interface ForumMessageProps {
  message: IForumMessage;
  onReply: (messageId: string, content: string) => void;
  onLike: (messageId: string) => void;
}

const ForumMessage: React.FC<ForumMessageProps> = ({ message, onReply, onLike }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyContent, setReplyContent] = useState('');
  const [showReplies, setShowReplies] = useState(false);

  const handleSubmitReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (replyContent.trim()) {
      onReply(message.id, replyContent);
      setReplyContent('');
      setIsReplying(false);
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      className="forum-message"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="message-header">
        <div className="author-info">
          <motion.div
            className="author-avatar"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {message.author[0].toUpperCase()}
          </motion.div>
          <div className="author-details">
            <h3>{message.author}</h3>
            <span className="date">{formatDate(message.date)}</span>
          </div>
        </div>
        <motion.button
          className="like-button"
          onClick={() => onLike(message.id)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ❤️ {message.likes}
        </motion.button>
      </div>

      <div className="message-content">
        {message.content}
      </div>

      <div className="message-actions">
        <motion.button
          className="action-button"
          onClick={() => setIsReplying(!isReplying)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isReplying ? 'Cancelar' : 'Responder'}
        </motion.button>
        {message.replies.length > 0 && (
          <motion.button
            className="action-button"
            onClick={() => setShowReplies(!showReplies)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showReplies ? 'Ocultar respuestas' : `Ver ${message.replies.length} respuestas`}
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {isReplying && (
          <motion.form
            className="reply-form"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitReply}
          >
            <textarea
              value={replyContent}
              onChange={(e) => setReplyContent(e.target.value)}
              placeholder="Escribe tu respuesta..."
              rows={3}
            />
            <motion.button
              type="submit"
              className="submit-button"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!replyContent.trim()}
            >
              Enviar respuesta
            </motion.button>
          </motion.form>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReplies && message.replies.length > 0 && (
          <motion.div
            className="replies-container"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {message.replies.map((reply) => (
              <motion.div
                key={reply.id}
                className="reply-message"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="reply-header">
                  <div className="author-info">
                    <div className="author-avatar reply-avatar">
                      {reply.author[0].toUpperCase()}
                    </div>
                    <div className="author-details">
                      <h4>{reply.author}</h4>
                      <span className="date">{formatDate(reply.date)}</span>
                    </div>
                  </div>
                  <motion.button
                    className="like-button"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ❤️ {reply.likes}
                  </motion.button>
                </div>
                <div className="reply-content">
                  {reply.content}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ForumMessage; 