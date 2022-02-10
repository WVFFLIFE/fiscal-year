import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import { ErrorModel } from 'models';

import Dialog from 'components/Dialog';
import ErrroView from 'components/ErrorView';
import ActionButton from 'components/ActionButton';

import { useStyles } from './style';

interface DialogErrorProps {
  error: ErrorModel | null;
  title?: string;
  initError(): void;
}

interface ModalState {
  open: boolean;
  error: ErrorModel | null;
}

const DialogError: React.FC<DialogErrorProps> = ({
  error: propsError,
  initError,
  title,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
      maxWidth="xs"
      open={open}
      handleClose={handleCloseModal}
      TransitionProps={{ onExited: initError }}
    >
      {error?.messages ? (
        <ErrroView title={title} messages={error.messages} />
      ) : null}
      <div className={classes.btnsWrapper}>
        <ActionButton onClick={handleCloseModal} palette="darkBlue">
          {t('#button.ok')}
        </ActionButton>
      </div>
    </Dialog>
  );
};

export default DialogError;
