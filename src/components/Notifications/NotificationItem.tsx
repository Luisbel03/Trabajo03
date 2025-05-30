import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Notification } from '../../types/notification';
import './Notifications.css';

interface NotificationItemProps {
  notification: Notification;
  onRemove: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onRemove }) => {
  const [progress, setProgress] = useState(100);
  const duration = notification.duration || 5000;

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining <= 0) {
        clearInterval(interval);
      }
    }, 10);

    return () => clearInterval(interval);
  }, [duration]);

  const getIcon = () => {
    switch (notification.type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '•';
    }
  };

  return (
    <motion.div
      className={`notification-item ${notification.type}`}
      initial={{ opacity: 0, x: 300, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 300, scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      layout
    >
      <div className="notification-content">
        <div className="notification-header">
          <div className="notification-icon">{getIcon()}</div>
          {notification.title && (
            <h4 className="notification-title">{notification.title}</h4>
          )}
          <button
            className="notification-close"
            onClick={() => onRemove(notification.id)}
            aria-label="Cerrar notificación"
          >
            ✕
          </button>
        </div>
        <p className="notification-message">{notification.message}</p>
      </div>
      <motion.div
        className="notification-progress"
        initial={{ width: "100%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1, ease: "linear" }}
      />
    </motion.div>
  );
};

export default NotificationItem; 