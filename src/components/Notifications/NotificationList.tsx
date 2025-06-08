import React from 'react';
import { useNotification } from '../../context/NotificationContext';
import type { Notification } from '../../context/NotificationContext';
import './NotificationList.css';

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <div className="notifications-list">
      {notifications.map((notification: Notification) => (
        <div
          key={notification.id}
          className={`notification notification-${notification.type}`}
          onClick={() => removeNotification(notification.id)}
        >
          <span className="notification-message">{notification.message}</span>
          <button
            className="notification-close"
            onClick={(e) => {
              e.stopPropagation();
              removeNotification(notification.id);
            }}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationList; 