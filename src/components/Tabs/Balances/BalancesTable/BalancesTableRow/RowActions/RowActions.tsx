import ActionButton from 'components/ActionButton';
import { EditIcon, CloseIcon, RoundCheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

interface RowActionsProps {
  active: boolean;
  onActivateEditMode(): void;
  onResetEditMode(): void;
  onSave(): void;
  className?: string;
  disabled?: boolean;
  isValid?: boolean;
}

const RowActions: React.FC<RowActionsProps> = ({
  active,
  className,
  disabled,
  isValid,
  onActivateEditMode,
  onResetEditMode,
  onSave,
}) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)}>
      {active ? (
        <>
          <ActionButton
            size="small"
            className={classes.btnOffset}
            onClick={onResetEditMode}
            disabled={disabled}
          >
            <CloseIcon className={classes.icon} />
          </ActionButton>
          <ActionButton
            palette="darkBlue"
            size="small"
            disabled={!isValid || disabled}
            onClick={onSave}
          >
            <RoundCheckIcon className={classes.icon} />
          </ActionButton>
        </>
      ) : (
        <ActionButton
          palette="darkBlue"
          size="small"
          onClick={onActivateEditMode}
          disabled={disabled}
        >
          <EditIcon className={classes.icon} />
        </ActionButton>
      )}
    </div>
  );
};

export default RowActions;
