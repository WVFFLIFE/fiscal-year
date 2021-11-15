import { ApplyButton, CancelButton } from 'components/Styled';
import { RoundQuestionIcon } from 'components/Icons';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

interface DeleteConfirmationProps {
  entity: string;
  cancel(): void;
  apply(): void;
  loading?: boolean;
}

const DeleteConfirmation: React.FC<DeleteConfirmationProps> = ({
  entity,
  cancel,
  apply,
  loading,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h3 className={classes.title}>Delete {entity}</h3>
      <RoundQuestionIcon className={classes.icon} />
      <p className={classes.description}>
        Are you sure you want to delete this {entity}?
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
