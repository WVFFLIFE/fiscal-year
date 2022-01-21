import { useState, useRef } from 'react';

import Menu from 'components/Menu';
import ArrowIcon from 'components/Icons/ArrowIcon';

import clsx from 'clsx';
import { PickerInput, useStyles } from './style';

interface PickerProps {
  className?: string;
  placeholder?: string;
  disablePortal?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  renderValue(): string | JSX.Element | null;
  renderBody(fn: () => void): JSX.Element;
}

const Picker: React.FC<PickerProps> = ({
  className,
  placeholder,
  disabled = false,
  disablePortal = false,
  fullWidth,
  renderValue,
  renderBody,
}) => {
  const classes = useStyles();
  const rootRef = useRef<HTMLButtonElement | null>(null);

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (anchorEl) {
      setAnchorEl(null);
    } else {
      setAnchorEl(e.currentTarget);
    }
  };

  const value = renderValue();
  const open = !!anchorEl;

  return (
    <>
      <PickerInput
        disabled={disabled}
        onClick={disabled ? undefined : handleToggle}
        ref={rootRef}
        disableRipple
        className={clsx(className, {
          [classes.focus]: open,
        })}
      >
        <div className={classes.inputWrapper}>
          <span
            className={clsx('truncated-text', classes.text, {
              [classes.value]: !!value,
              [classes.placeholder]: !!!value,
            })}
            title={typeof value === 'string' ? value : undefined}
          >
            {value || placeholder}
          </span>
          <ArrowIcon
            className={clsx(classes.arrowIcon, {
              [classes.open]: open,
            })}
          />
        </div>
      </PickerInput>
      <Menu
        open={open}
        onClose={handleClose}
        anchorEl={anchorEl}
        disablePortal={disablePortal}
      >
        <div
          style={{
            width: fullWidth
              ? rootRef.current?.getBoundingClientRect().width
              : 'auto',
          }}
        >
          {renderBody(handleClose)}
        </div>
      </Menu>
    </>
  );
};

export default Picker;
