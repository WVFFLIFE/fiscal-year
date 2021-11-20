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

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Delete entity(ies)</h3>
      <RoundQuestionIcon className={classes.icon} />
      <p className={classes.description}>
        Are you sure you want to delete selected entity(ies)?
      </p>
      <div className={classes.btnsRow}>
        <CancelButton
          disabled={loading}
          onClick={loading ? undefined : cancel}
          className={classes.cancelBtn}
        >
          Cancel
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
          Delete
        </ApplyButton>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
