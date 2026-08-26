import { useEffect, useState } from 'react';

function getDhakaTimeString(): string {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).format(new Date()).toLowerCase();
  } catch {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    }).toLowerCase();
  }
}

export function useDhakaTime(): string {
  const [time, setTime] = useState<string>(getDhakaTimeString);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(getDhakaTimeString());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return time;
}
