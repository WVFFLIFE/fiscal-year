import { useTranslation } from 'react-i18next';
import useFromTemplateViewData from './useFromTemplateViewData';

import Dialog from 'components/Dialog';
import InfoIcon from 'components/Icons/InfoIcon';
import ActionButton from 'components/ActionButton';
import {
  BtnLoader,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogFooter,
  ApplyButton,
} from 'components/Styled';

import { useStyles } from './style';

type FromTemplateViewProps = {
  type: 'create' | 'copy';
  onClose(): void;
};

const generalDictionary = {
  create: {
    title: '#dialog.createfromtemplate.title',
    save: '#button.create',
  },
  copy: {
    title: '#dialog.copyfromtemplate.title',
    save: '#button.copy',
  },
};

const FromTemplateView: React.FC<FromTemplateViewProps> = ({
  type,
  onClose,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    requestState,
    successDialogState,
    handleCloseSuccessDialog,
    handleSave,
  } = useFromTemplateViewData(type, onClose);

  const typeDictionary = generalDictionary[type];

  return (
    <div>
      <h2 className={classes.title}>{t(typeDictionary.title)}</h2>
      <div className={classes.iconWrapper}>
        <InfoIcon className={classes.infoIcon} />
      </div>
      <p className={classes.description}>
        {t('#dialog.createfromtemplate.description')}
      </p>
      <div className={classes.btnsWrapper}>
        <ActionButton className={classes.cancelBtn} onClick={onClose}>
          {t('#button.cancel')}
        </ActionButton>
        <ActionButton
          disabled={requestState.loading}
          palette="darkBlue"
          onClick={handleSave}
          endIcon={requestState.loading ? <BtnLoader size={17} /> : undefined}
        >
          {t(typeDictionary.save)}
        </ActionButton>
      </div>
      <Dialog
        maxWidth="xs"
        open={successDialogState.isOpen}
        handleClose={handleCloseSuccessDialog}
      >
        <DialogContent>
          <DialogTitle>{t('#dialog.newfiscalyearcreated.title')}</DialogTitle>
          <InfoIcon className={classes.dialogIcon} />
          <DialogDescription>
            {t('#dialog.newfiscalyearcreated.description')}
          </DialogDescription>
        </DialogContent>
        <DialogFooter>
          <ApplyButton onClick={handleCloseSuccessDialog}>
            {t('#button.ok')}
          </ApplyButton>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default FromTemplateView;
