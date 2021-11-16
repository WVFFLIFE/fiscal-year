import { useState, useEffect } from 'react';

import { ErrorModel } from 'models';

import Dialog from 'components/Dialog';
import ErrroView from 'components/ErrorView';

interface DialogErrorProps {
  error: ErrorModel | null;
  initError(): void;
}

interface ModalState {
  open: boolean;
  error: ErrorModel | null;
}

const DialogError: React.FC<DialogErrorProps> = ({
  error: propsError,
  initError,
}) => {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    error: null,
  });

  const handleOpenModal = (err: ErrorModel) => {
    setModalState({
      error: err,
      open: true,
    });
  };

  const handleCloseModal = () => {
    setModalState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  useEffect(() => {
    if (propsError) {
      handleOpenModal(propsError);
    }
  }, [propsError]);

  const { open, error } = modalState;

  return (
    <Dialog
      open={open}
      handleClose={handleCloseModal}
      TransitionProps={{ onExited: initError }}
    >
      {error?.messages ? <ErrroView messages={error.messages} /> : null}
    </Dialog>
  );
};

export default DialogError;
