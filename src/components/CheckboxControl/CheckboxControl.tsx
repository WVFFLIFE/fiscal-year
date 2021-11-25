import { ChangeEvent } from 'react';
import Checkbox, { CheckboxProps } from 'components/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import clsx from 'clsx';
import { useStyles } from './style';

export interface ClassNames {
  label?: string;
}

interface CheckboxControlProps {
  className?: string;
  name?: string;
  checked: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  label: string;
  disabled?: boolean;
  classes?: ClassNames;
  tabIndex?: number;
  indeterminate?: boolean;
}

const CheckboxControl: React.FC<CheckboxControlProps> = ({
  name,
  className,
  checked,
  onChange,
  label,
  disabled = false,
  indeterminate,
  tabIndex,
  classes: propClasses,
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={clsx(classes.root, className)}
      disabled={disabled}
      control={
        <Checkbox
          checked={checked}
          onChange={onChange}
          tabIndex={tabIndex}
          name={name}
          indeterminate={indeterminate}
        />
      }
      label={label}
      classes={{
        label: clsx(classes.label, propClasses?.label),
      }}
    />
  );
};

export default CheckboxControl;
