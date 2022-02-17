import { useEffect, useState } from "react";

const usePageReady = () => {
  // Page is not Ready on the Client yet
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready;
};

export default usePageReady;
