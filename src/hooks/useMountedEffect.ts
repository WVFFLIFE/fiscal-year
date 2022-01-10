import { DependencyList, useRef, useEffect } from 'react';

function useMountedEffect(fn: Function, deps?: DependencyList) {
  const mountedRef = useRef(false);

  useEffect(() => {
    if (mountedRef.current) {
      fn();
    }
    mountedRef.current = true;
    // eslint-disable-next-line
  }, deps)
}

export default useMountedEffect;
