import useCreateRootFolderData from './useCreateRootFolderData';
import { useTranslation } from 'react-i18next';
import useToggleSwitch from 'hooks/useToggleSwitch';

import { BaseFolderStatusCode } from 'enums/responses';

import DialogError from 'components/DialogError';
import ConfirmationWindow from 'components/ConfirmationWindow';
import ActionButton from 'components/ActionButton';
import { PlusIcon, InfoIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import { useStyles } from './style';

const CreateRootFolder = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { requestState, handleInitError, handleCreateFolder } =
    useCreateRootFolderData();

  const [openConfirmationDialog, toggleConfirmationDialogVisibility] =
    useToggleSwitch();

  const handleClickCreateBtn = async () => {
    await handleCreateFolder();
    toggleConfirmationDialogVisibility();
  };

  const renderBody = (status: BaseFolderStatusCode) => {
    switch (status) {
      case BaseFolderStatusCode.Unknown:
        return (
          <>
            <p className={classes.description}>
              Main parent folder has been deleted.
              <br />
              For further work with documents you need to create the parent
              folder again.
            </p>
            <ActionButton
              palette="darkBlue"
              startIcon={<PlusIcon />}
              onClick={toggleConfirmationDialogVisibility}
            >
              Create parent folder
            </ActionButton>
          </>
        );
      case BaseFolderStatusCode.InProgress:
        return (
          <>
            <p className={clsx(classes.description, classes.m0)}>
              Previously the process of creating a parent folder has been
              started. <br />
              Refresh the page to check the current status
            </p>
          </>
        );
      case BaseFolderStatusCode.Error:
        return (
          <p className={clsx(classes.description, classes.m0)}>
            Something went wrong. Try to refresh the page.
          </p>
        );
      default:
    }
  };

  return (
    <>
      <div className={classes.root}>
        {requestState.loading ? (
          <CircularProgress className={classes.loader} size={40} />
        ) : (
          renderBody(requestState.status)
        )}
        <ConfirmationWindow
          maxWidth="xs"
          open={openConfirmationDialog}
          handleClose={toggleConfirmationDialogVisibility}
          title={'Create parent folder'}
          description={
            'It may take some time to create the parent folder. To check the creation of the folder you need to refresh the page after a while'
          }
          Icon={<InfoIcon className={classes.infoIcon} />}
          ApplyBtnProps={{
            label: t('#button.create'),
            loading: requestState.creating,
            onClick: handleClickCreateBtn,
            disabled: requestState.creating,
          }}
          CancelBtnProps={{
            label: t('#button.cancel'),
            onClick: toggleConfirmationDialogVisibility,
          }}
        />
      </div>
      <DialogError error={requestState.error} initError={handleInitError} />
    </>
  );
};

export default CreateRootFolder;
