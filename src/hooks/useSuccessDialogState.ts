import { useState, useCallback } from 'react';

const useSuccessDialogState = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = useCallback(() => {
    setDialogOpen(true);
  }, []);

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
  }, []);

  return {
    isOpen: dialogOpen,
    open: handleOpenDialog,
    close: handleCloseDialog,
  };
};

export default useSuccessDialogState;
