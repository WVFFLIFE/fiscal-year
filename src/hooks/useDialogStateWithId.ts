import { useState } from 'react';

interface DialogStateModel {
  isOpen: boolean;
  ids: string[];
}

const useDialogStateWithIds = () => {
  const [dialogState, setDialogState] = useState<DialogStateModel>({
    isOpen: false,
    ids: [],
  });

  const open = (ids: string[]) => {
    setDialogState({
      ids,
      isOpen: true,
    });
  };

  const close = () => {
    setDialogState((prevState) => ({
      ...prevState,
      isOpen: false,
    }));
  };

  const reset = () => {
    setDialogState({
      ids: [],
      isOpen: false,
    });
  };

  return { ...dialogState, open, close, reset };
};

export default useDialogStateWithIds;
