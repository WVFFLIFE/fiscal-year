import { useState, useCallback } from 'react';

const useToggleSwitch = (on: boolean = false) => {
  const [switchOn, setSwitchOn] = useState(on);

  const toggleSwitch = useCallback(() => {
    setSwitchOn((prevState) => !prevState);
  }, []);

  return [switchOn, toggleSwitch] as const;
};

export default useToggleSwitch;
