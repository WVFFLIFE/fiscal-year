import { useState, useEffect } from 'react';

import Dialog from 'components/Dialog';
import View from './View';

interface ModalState {
  open: boolean;
  error: string | null;
}

interface ErrorProps {
  error: string | null;
  title: string;
  onInitError(): void;
}

const Error: React.FC<ErrorProps> = (props) => {
  const [modalState, setModalState] = useState<ModalState>({
    open: false,
    error: null,
  });

  const handleOpenModal = (err: string) => {
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
    if (props.error) {
      handleOpenModal(props.error);
    }
  }, [props.error]);

  const { open, error } = modalState;
  return (
    <Dialog
      maxWidth="sm"
      open={open}
      handleClose={handleCloseModal}
      TransitionProps={{ onExited: props.onInitError }}
    >
      {error && (
        <View
          title={props.title}
          description={error}
          onClose={handleCloseModal}
        />
      )}
    </Dialog>
  );
};

export default Error;
