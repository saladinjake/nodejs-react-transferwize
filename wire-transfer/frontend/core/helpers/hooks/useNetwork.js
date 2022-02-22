import { useToast } from "@chakra-ui/toast";
import { Toast } from "../../views/components/Toast";
import { useEffect, useState } from "react";
import { RiWifiFill, RiWifiOffFill } from "react-icons/ri";

const useNetwork = () => {
  const [initialPageLoad, setInitialPageLoad] = useState(true);
  const [isOnline, setIsOnline] = useState(true);

  const toast = useToast();

  // This `useEffect` will run once for the sole purpose of registering `online` and `offline` events
  useEffect(() => {
    // This handler causes a re-render
    const handleOnlineStatus = () => {
      const isOnline = navigator.onLine;

      if (!isOnline) {
        setInitialPageLoad(false);
      }
      setIsOnline(isOnline);
    };

    // Runs the handler once
    handleOnlineStatus();

    // Register event listeners to handle User online status(on-page-arrive)
    window.addEventListener("online", handleOnlineStatus);
    window.addEventListener("offline", handleOnlineStatus);

    // UnRegister all the event listeners(on-page-leave)
    return () => {
      window.removeEventListener("online", handleOnlineStatus);
      window.removeEventListener("offline", handleOnlineStatus);
    };
  }, []);

  const displayToast = () => {
    const onlineDuration = 5 * 1000;
    const offlineDuration = 30 * (60 * 1000);

    // If the User is loading the page for the first time, and he's online?
    // Then there's no need to disturb the User
    if (!initialPageLoad || !isOnline) {
      // This closes all exiting Toasts!!!!!!!!!
      toast.closeAll();

      const render = isOnline
        ? () => (
            <Toast
              status="success"
              icon={<RiWifiFill />}
              title="Online!"
              description="You're are now back online."
            />
          )
        : () => (
            <Toast
              icon={<RiWifiOffFill />}
              title="Offline!"
              description="Please check your network connection."
            />
          );

      const duration = isOnline ? onlineDuration : offlineDuration;

      // Displays the Toast
      toast({
        render,
        duration,
        position: "bottom-right",
      });
    }
  };

  return { isOnline, displayToast };
};

export default useNetwork;
