import { memo } from 'react';

import ActionButton from 'components/ActionButton';
import { PlusIcon, DeleteIcon, EyeIcon, EditIcon } from 'components/Icons';

import { useStyles } from './style';

interface ActionsProps {
  disabled?: boolean;
  selected: string[];
  onCreate?(): void;
  onEdit?(ids: string[]): void;
  onDelete?(ids: string[]): void;
  onView?(id: string[]): void;
}

const Actions: React.FC<ActionsProps> = ({
  disabled,
  selected,
  onCreate,
  onEdit,
  onDelete,
  onView,
}) => {
  const classes = useStyles();

  const isAlone = selected.length === 1;

  const handleEdit = () => {
    onEdit && onEdit(selected);
  };

  const handleDelete = () => {
    onDelete && onDelete(selected);
  };

  const handleView = () => {
    if (isAlone) {
      onView && onView(selected);
    }
  };

  const isEmpty = !!!selected.length;
  const disabledEditBtn = isEmpty || !isAlone || disabled;
  const isDisabledDeleteBtn = isEmpty || disabled;
  const isDisabledViewBtn = !isAlone;

  return (
    <div className={classes.root}>
      <ActionButton
        className={classes.btnOffset}
        startIcon={<PlusIcon />}
        onClick={onCreate}
        disabled={disabled}
      >
        Add Liability
      </ActionButton>
      <ActionButton
        className={classes.btnOffset}
        onClick={handleDelete}
        startIcon={<DeleteIcon />}
        disabled={isDisabledDeleteBtn}
      >
        Delete Liabilities
      </ActionButton>
      <ActionButton
        className={classes.btnOffset}
        onClick={handleView}
        startIcon={<EyeIcon />}
        disabled={isDisabledViewBtn}
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
