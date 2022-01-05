import useCreateFromTemplateData from './useCreateFromTemplateData';
import { useTranslation } from 'react-i18next';

import DialogError from 'components/DialogError';
import InfoIcon from 'components/Icons/InfoIcon';
import ActionButton from 'components/ActionButton';
import { BtnLoader } from 'components/Styled';

import { useStyles } from './style';

interface CreateFromTemplateDialogBodyProps {
  onClose(): void;
}

const CreateFromTemplateDialogBody: React.FC<
  CreateFromTemplateDialogBodyProps
> = ({ onClose }) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { requestState, handleCreateFromTemplate, handleInitError } =
    useCreateFromTemplateData({
      onClose,
    });

  return (
    <div>
      <h2 className={classes.title}>{t('#dialog.createfromtemplate.title')}</h2>
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
          disabled={requestState.creating}
          palette="darkBlue"
          onClick={handleCreateFromTemplate}
          endIcon={requestState.creating ? <BtnLoader size={17} /> : undefined}
        >
          {t('#button.create')}
        </ActionButton>
      </div>
      <DialogError error={requestState.error} initError={handleInitError} />
    </div>
  );
};

export default CreateFromTemplateDialogBody;
