import { useContext } from 'react';
import { GeneralCtx } from 'contexts/GeneralContext';

const useGeneralCtx = () => {
  return useContext(GeneralCtx);
};

export default useGeneralCtx;
