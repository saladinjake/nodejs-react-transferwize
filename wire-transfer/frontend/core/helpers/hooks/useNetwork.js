import { useToast } from "@chakra-ui/toast";
import { Toast } from "../../views/components/Toast";
import { useEffect, useState } from "react";
import { RiWifiFill, RiWifiOffFill } from "react-icons/ri";

const useNetwork = () => {
   const [initialPageLoad, setInitialPageLoad] = useState(true);
  const [isOnline, setIsOnline] = useState(true);
  
  const toast = useToast();
  


//     // This handler causes a re-render
    const handleOnlineStatus = () => {
      const isOnline = navigator.onLine;
      if (!isOnline) {
        setInitialPageLoad(false);
        window.location.reload()
      }else{
        setInitialPageLoad(true);

      }
      setIsOnline(isOnline);
    };


  // This `useEffect` will run once for the sole purpose of registering `online` and `offline` events
  useEffect(() => {
setInterval(()=>{
    var condition = navigator.onLine ? 'online' : 'offline';
    if (condition === 'online') {
     // console.log('ONLINE');
        fetch('https://jsonplaceholder.typicode.com/posts/1', { // Check for internet connectivity
            mode: 'no-cors',
            })
        .then(() => {
            //console.log('CONNECTED TO INTERNET');
            setIsOnline(true)
           // toast.closeAll();
        }).catch(() => {
           //console.log('INTERNET CONNECTIVITY ISSUE');
           setIsOnline(false)

        }  )

    }else{
       //console.log('OFFLINE')
       setIsOnline(false)
    }
 }, 20000);

    

setInterval(()=>{
    // Runs the handler once
    handleOnlineStatus();
   }, 3000);
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
    const onlineDuration = 35 *  (60 * 1000);
    const offlineDuration = 35 *  (60 * 1000);
    // If the User is loading the page for the first time, and he's online?
    // Then there's no need to disturb the User
    if (!isOnline ) {
      // This closes all exiting Toasts!!!!!!!!!
      toast.closeAll();
    }
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
    
  };

  return { isOnline, displayToast };
};

export default useNetwork;