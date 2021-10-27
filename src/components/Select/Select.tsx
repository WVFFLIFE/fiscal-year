import MuiSelect, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { ArrowIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

export interface Option {
  value: string | number;
  label: string;
}

export interface SelectProps<T> {
  className?: string;
  options: T[];
  value: string | number;
  onChange(val: string | number): void;
}

function getValue<T extends string | number | Option>(option: T) {
  if (typeof option === 'object') {
    return option.value;
  }

  return option as string | number;
}

function getLabel<T extends string | number | Option>(option: T) {
  if (typeof option === 'object') {
    return option.label;
  }

  return option as string | number;
}

const Select = <T extends Option | string | number>(props: SelectProps<T>) => {
  const classes = useStyles();

  const { value, options, onChange, className } = props;

  const handleChange = (e: SelectChangeEvent<string | number>) => {
    const { value } = e.target;

    onChange(value);
  };

  return (
    <MuiSelect
      className={clsx(classes.root, className)}
      value={value}
      onChange={handleChange}
      variant="standard"
      disableUnderline
      IconComponent={ArrowIcon}
      classes={{
        icon: classes.icon,
        select: classes.select,
      }}
    >
      {options.map((option) => {
        const val = getValue(option);
        const label = getLabel(option);
        return (
          <MenuItem key={val} value={val}>
            {label}
          </MenuItem>
        );
      })}
    </MuiSelect>
  );
};

export default Select;
