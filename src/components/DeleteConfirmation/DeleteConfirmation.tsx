import { useTranslation } from 'react-i18next';

import { ApplyButton, CancelButton } from 'components/Styled';
import { RoundQuestionIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

interface DeleteConfirmationProps {
  cancel(): void;
  apply(): void;
  loading?: boolean;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  cancel,
  apply,
  loading,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>
        {t('#dialog.delete.confirmation.title')}
      </h3>
      <RoundQuestionIcon className={classes.icon} />
      <p className={classes.description}>
        {t('#dialog.delete.confirmation.description')}
      </p>
      <div className={classes.btnsRow}>
        <CancelButton
          disabled={loading}
          onClick={loading ? undefined : cancel}
          className={classes.cancelBtn}
        >
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton
          disabled={loading}
          onClick={loading ? undefined : apply}
          endIcon={
            loading ? (
              <CircularProgress className={classes.loader} size={20} />
            ) : undefined
          }
        >
          {t('#button.delete')}
        </ApplyButton>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
