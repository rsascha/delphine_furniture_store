import { useEffect, useState } from 'react';
import './Notification.css';

function Notification({ message, show }) {
  const [isVisible, setIsVisible] = useState(show);

  useEffect(() => {
    setIsVisible(show);
    if (show) {
      const timer = setTimeout(() => setIsVisible(false), 3000); // Hide after 3 seconds
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [show]);

  if (!isVisible) return null;

  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
}

export default Notification;
