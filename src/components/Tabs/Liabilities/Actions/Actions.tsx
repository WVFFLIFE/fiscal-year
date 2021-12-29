import { memo } from 'react';

import ActionButton from 'components/ActionButton';
import { PlusIcon, DeleteIcon, EyeIcon, EditIcon } from 'components/Icons';

import { useStyles } from './style';

interface ActionsProps {
  selected: string[];
  onCreate?(): void;
  onEdit?(ids: string[]): void;
  onDelete?(ids: string[]): void;
  onView?(id: string[]): void;
}

const Actions: React.FC<ActionsProps> = ({
  selected,
  onCreate,
  onEdit,
  onDelete,
  onView,
}) => {
  const classes = useStyles();

  const isEmpty = !!!selected.length;
  const disabledEditBtn = isEmpty || selected.length !== 1;

  const handleEdit = () => {
    onEdit && onEdit(selected);
  };

  const handleDelete = () => {
    onDelete && onDelete(selected);
  };

  const handleView = () => {
    if (selected.length === 1) {
      onView && onView(selected);
    }
  };

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
        onClick={handleDelete}
        startIcon={<DeleteIcon />}
        disabled={isEmpty}
      >
        Delete Liabilities
      </ActionButton>
      <ActionButton
        className={classes.btnOffset}
        onClick={handleView}
        startIcon={<EyeIcon />}
        disabled={selected.length !== 1}
      >
        View Liability
      </ActionButton>
      <ActionButton
        onClick={handleEdit}
        palette="darkBlue"
        startIcon={<EditIcon />}
        disabled={disabledEditBtn}
      >
        Edit Liability
      </ActionButton>
    </div>
  );
};

export default memo(Actions);
