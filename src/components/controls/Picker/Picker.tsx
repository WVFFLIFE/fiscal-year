import { useState, useRef } from 'react';

import Menu from 'components/Menu';
import ArrowIcon from 'components/Icons/ArrowIcon';

import clsx from 'clsx';
import { PickerInput, useStyles } from './style';

interface PickerProps {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  renderValue(): string | JSX.Element | null;
  renderBody(fn: () => void): JSX.Element;
}

const Picker: React.FC<PickerProps> = ({
  className,
  placeholder,
  disabled = false,
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
            className={clsx(classes.text, {
              [classes.value]: !!value,
              [classes.placeholder]: !!!value,
            })}
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
      <Menu open={open} onClose={handleClose} anchorEl={anchorEl}>
        {renderBody(handleClose)}
      </Menu>
    </>
  );
};

export default Picker;
