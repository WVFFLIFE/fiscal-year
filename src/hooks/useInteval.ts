import { useEffect, DependencyList } from 'react';

const DEFAULT_DELAY = 30 * 1000;

/**
 * Hook that calls a function with an interval (delay)
 * @param fn - Function that will be called
 * @param deps - Dependencies list (https://ru.reactjs.org/docs/hooks-reference.html#conditionally-firing-an-effect)
 * @param delay - Function calling interval (ms)
 */
const useInterval = (
  fn: (reset: Function) => void,
  deps: DependencyList = [],
  delay: number = DEFAULT_DELAY
) => {
  useEffect(() => {
    let currentDelay = delay;
    let timeout: NodeJS.Timeout | null = null;

    const resetTimeout = () => (timeout = null);
    const update = () => {
      fn(resetTimeout);

      currentDelay = delay;
      timeout = setTimeout(update, currentDelay);
    };

    update();

    return () => {
      timeout && clearTimeout(timeout);
    };
  }, [delay, ...deps]);
};

export default useInterval;
