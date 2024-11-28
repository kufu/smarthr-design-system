export const throttle = <T extends unknown[]>(func: (...args: T) => void, wait: number) => {
  let timeout: number | null = null;
  let previous = 0;

  return (...args: T) => {
    const now = Date.now();
    const remaining = wait - (now - previous);

    if (remaining <= 0 || remaining > wait) {
      if (timeout !== null) {
        window.clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      func(...args);
    } else if (!timeout) {
      timeout = window.setTimeout(() => {
        previous = Date.now();
        if (timeout !== null) {
          window.clearTimeout(timeout);
          timeout = null;
        }
        func(...args);
      }, remaining);
    }
  };
};
