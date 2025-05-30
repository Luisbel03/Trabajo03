import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import { Notification, NotificationContextType } from '../types/notification';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const MAX_NOTIFICATIONS = 5; // Máximo número de notificaciones mostradas a la vez

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timeoutsRef = useRef<{ [key: string]: NodeJS.Timeout }>({});

  const removeNotification = useCallback((id: string) => {
    if (timeoutsRef.current[id]) {
      clearTimeout(timeoutsRef.current[id]);
      delete timeoutsRef.current[id];
    }
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id' | 'createdAt'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const duration = notification.duration || 5000;

    const newNotification: Notification = {
      ...notification,
      id,
      createdAt: new Date(),
      duration
    };

    setNotifications(prev => {
      // Si hay más notificaciones que el límite, eliminar las más antiguas
      const updatedNotifications = [newNotification, ...prev];
      if (updatedNotifications.length > MAX_NOTIFICATIONS) {
        const toRemove = updatedNotifications.slice(MAX_NOTIFICATIONS);
        toRemove.forEach(n => {
          if (timeoutsRef.current[n.id]) {
            clearTimeout(timeoutsRef.current[n.id]);
            delete timeoutsRef.current[n.id];
          }
        });
        return updatedNotifications.slice(0, MAX_NOTIFICATIONS);
      }
      return updatedNotifications;
    });

    // Auto-remove notification after duration
    const timeout = setTimeout(() => {
      removeNotification(id);
    }, duration);

    timeoutsRef.current[id] = timeout;
  }, [removeNotification]);

  // Limpiar timeouts al desmontar
  React.useEffect(() => {
    return () => {
      Object.values(timeoutsRef.current).forEach(clearTimeout);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
}; 