import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";

interface Notification {
  message: string;
  type: "success" | "error";
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (message: string, type?: "success" | "error", duration?: number) => void;
  hideNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const hideNotification = useCallback(() => {
    setNotification(null);
  }, []);

  const showNotification = useCallback(
    (message: string, type: "success" | "error" = "success", duration = 5000) => {
      setNotification({ message, type });
      if (duration > 0) {
        setTimeout(() => {
          setNotification(null);
        }, duration);
      }
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ notification, showNotification, hideNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
