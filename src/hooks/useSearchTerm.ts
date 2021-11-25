import { useState, useCallback } from 'react';

const useSearchTerm = (defaultValue = '') => {
  const [searchTerm, setSearchTerm] = useState(defaultValue);

  const onChangeSearchTerm = useCallback((newVal: string) => {
    setSearchTerm(newVal);
  }, []);

  return { searchTerm, onChangeSearchTerm };
};

export default useSearchTerm;
