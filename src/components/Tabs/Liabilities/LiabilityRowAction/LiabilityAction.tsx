import { memo, MouseEvent } from 'react';
import { EnhancedLiability } from 'utils/liabilities';

import ActionButton from 'components/ActionButton';
import { DeleteIcon, EditIcon, EyeIcon } from 'components/Icons';

import { useStyles } from './style';

interface LiabilityRowActionProps {
  liability: EnhancedLiability;
  onOpen?(ids: string[]): void;
  onDelete?(ids: string[]): void;
  onEdit?(ids: string[]): void;
}

const LiabilityRowAction: React.FC<LiabilityRowActionProps> = ({
  liability,
  onOpen,
  onDelete,
  onEdit,
}) => {
  const classes = useStyles();

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  const handleOpen = () => onOpen && onOpen([liability.id]);
  const handleDelete = () => onDelete && onDelete([liability.id]);
  const handleEdit = () => onEdit && onEdit([liability.id]);

  return (
    <div className={classes.root} onClick={stopPropagation}>
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
