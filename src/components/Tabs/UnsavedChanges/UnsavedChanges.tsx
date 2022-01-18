import { useTranslation } from 'react-i18next';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';

import ConfirmationWindow from 'components/ConfirmationWindow';
import { TriangleWarningIcon } from 'components/Icons';

import { useStyles } from './style';

interface UnsavedChangesProps {
  open: boolean;
  onClose(): void;
}

const UnsavedChanges: React.FC<UnsavedChangesProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const saveChanges = async () => {
    try {
      const success = await unsavedChangesTracker.executeSaveAction();

      if (success) {
        unsavedChangesTracker.resetSaveAction();
        unsavedChangesTracker.executePendingAction();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClickSaveBtn = () => {
    saveChanges();
    onClose();
  };

  return (
    <>
      <ConfirmationWindow
        maxWidth="sm"
        open={open}
        handleClose={onClose}
        title={t('#warning.unsavedchanges.title')}
        description={t('#warning.usavedchanges.description')}
        Icon={<TriangleWarningIcon className={classes.warningIcon} />}
        ApplyBtnProps={{
          label: t('#button.save'),
          onClick: handleClickSaveBtn,
        }}
        CancelBtnProps={{
          label: t('#button.cancel'),
          onClick: onClose,
        }}
      />
    </>
  );
};

export default UnsavedChanges;
