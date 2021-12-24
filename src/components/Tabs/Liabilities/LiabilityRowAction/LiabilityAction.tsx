import { memo } from 'react';
import { EnhancedLiability } from 'utils/liabilities';

import ActionButton from 'components/ActionButton';
import { DeleteIcon, EditIcon, EyeIcon } from 'components/Icons';

import { useStyles } from './style';

interface LiabilityRowActionProps {
  liability: EnhancedLiability;
  onOpen?(id: string): void;
  onDelete?(id: string): void;
  onEdit?(id: string): void;
}

const LiabilityRowAction: React.FC<LiabilityRowActionProps> = ({
  liability,
  onOpen,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();

  const handleOpen = () => onOpen && onOpen(liability.id);
  const handleDelete = () => onDelete && onDelete(liability.id);
  const handleEdit = () => onEdit && onEdit(liability.id);

  return (
    <div className={classes.root}>
      <ActionButton onClick={handleDelete}>
        <DeleteIcon className={classes.icon} />
      </ActionButton>
      <ActionButton className={classes.btnOffset} onClick={handleOpen}>
        <EyeIcon className={classes.icon} />
      </ActionButton>
      <ActionButton
        className={classes.btnOffset}
        palette="darkBlue"
        onClick={handleEdit}
      >
        <EditIcon className={classes.icon} />
      </ActionButton>
    </div>
  );
};

export default memo(LiabilityRowAction);
