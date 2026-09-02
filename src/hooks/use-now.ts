import { useEffect, useState } from 'react';

export const useNow = (showSeconds = true) => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), showSeconds ? 1000 : 15_000);
    return () => clearInterval(interval);
  }, [showSeconds]);
  return now;
};
