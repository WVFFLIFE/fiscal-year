import { memo, SyntheticEvent } from 'react';

import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ArrowIcon, CloseIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

export interface SelectProps<T extends string | number | object = any> {
  value: T | null;
  options: T[];
  onChange: (value: T | null, name?: string) => void;
  name?: string;
  disabled?: boolean;
  placeholder?: string;
  getOptionLabel?: AutocompleteProps<T, false, false, false>['getOptionLabel'];
  renderOption?: AutocompleteProps<T, false, false, false>['renderOption'];
}

const Select = <T extends string | number | object>({
  value,
  options,
  onChange,
  placeholder,
  name,
  disabled,
  getOptionLabel,
  renderOption,
}: SelectProps<T>) => {
  const classes = useStyles();

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    val: T | null
  ) => {
    onChange(val, name);
  };

  return (
    <Autocomplete
      classes={{
        option: classes.option,
        endAdornment: classes.endAdornment,
        clearIndicator: clsx(classes.indicator, classes.clearIndicator),
        popupIndicator: clsx(classes.indicator, classes.popupIndicator),
      }}
      value={value}
      options={options}
      onChange={handleChange}
      disabled={disabled}
      disablePortal
      placeholder={placeholder}
      clearIcon={<CloseIcon />}
      popupIcon={<ArrowIcon />}
      getOptionLabel={getOptionLabel}
      renderOption={renderOption}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          placeholder={placeholder}
          variant="standard"
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            classes: { root: classes.root },
          }}
        />
      )}
    />
  );
};

export default memo(Select);
