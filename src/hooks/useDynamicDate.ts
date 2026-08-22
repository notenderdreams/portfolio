import { useMemo } from 'react';

export function useDynamicDate(): string {
  return useMemo(() => {
    const today = new Date();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    const year = today.getFullYear().toString().slice(-2);
    return `${month} ${day} ${year}`;
  }, []);
}
