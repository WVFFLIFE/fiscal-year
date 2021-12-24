import ActionButton from 'components/ActionButton';
import { PlusIcon, DeleteIcon, EyeIcon, EditIcon } from 'components/Icons';

import { useStyles } from './style';

interface ActionsProps {
  selected: string[];
  onCreate?(): void;
}

const Actions: React.FC<ActionsProps> = ({ selected, onCreate }) => {
  const classes = useStyles();

  const isEmpty = !!!selected.length;

  return (
    <div className={classes.root}>
      <ActionButton
        className={classes.btnOffset}
        startIcon={<PlusIcon />}
        onClick={onCreate}
      >
        Add Liability
      </ActionButton>
      <ActionButton
        className={classes.btnOffset}
        startIcon={<DeleteIcon />}
        disabled={isEmpty}
      >
        Delete Liabilities
      </ActionButton>
      <ActionButton
        className={classes.btnOffset}
        startIcon={<EyeIcon />}
        disabled={selected.length !== 1}
      >
        View Liability
      </ActionButton>
      <ActionButton
        palette="darkBlue"
        startIcon={<EditIcon />}
        disabled={isEmpty}
      >
        Edit Liability
      </ActionButton>
    </div>
  );
};

export default Actions;
