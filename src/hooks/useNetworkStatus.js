import { useState, useEffect } from "react";

/**
 * Custom Hook for tracking network connectivity status
 * Returns { isOnline, isReconnected }
 */
export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(() => {
    return typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;
  });
  const [wasOffline, setWasOffline] = useState(false);
  const [showReconnectedAlert, setShowReconnectedAlert] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      if (wasOffline) {
        setShowReconnectedAlert(true);
        const timer = setTimeout(() => setShowReconnectedAlert(false), 4000);
        return () => clearTimeout(timer);
      }
    };

    const handleOffline = () => {
      setIsOnline(false);
      setWasOffline(true);
      setShowReconnectedAlert(false);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [wasOffline]);

  return { isOnline, showReconnectedAlert };
}
