import { useState } from 'react';

interface DialogStateModel {
  isOpen: boolean;
  id: string | null;
}

const useDialogStateWithId = () => {
  const [dialogState, setDialogState] = useState<DialogStateModel>({
    isOpen: false,
    id: null,
  });

  const open = (id: string) => {
    setDialogState({
      id,
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
      id: null,
      isOpen: false,
    });
  };

  return { ...dialogState, open, close, reset };
};

export default useDialogStateWithId;
