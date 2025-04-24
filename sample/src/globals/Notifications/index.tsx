import { useNotification } from '@/contexts/NotificationContext';
import { Alert, Box } from '@mui/material';
import type { Notification } from '@/contexts/NotificationContext';

export const Notifications = () => {
  const { notifications, removeNotification } = useNotification();

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 16,
        right: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        zIndex: 9999,
      }}
    >
      {notifications.map((notification: Notification) => (
        <Alert
          key={notification.id}
          severity={notification.type}
          onClose={() => removeNotification(notification.id)}
        >
          {notification.message}
        </Alert>
      ))}
    </Box>
  );
};