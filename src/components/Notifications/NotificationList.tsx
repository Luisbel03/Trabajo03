import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNotifications } from '../../context/NotificationContext';
import NotificationItem from './NotificationItem';

const NotificationList: React.FC = () => {
  const { notifications, removeNotification } = useNotifications();

  return (
    <div className="notifications-container">
      <AnimatePresence mode="sync">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onRemove={removeNotification}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationList; 