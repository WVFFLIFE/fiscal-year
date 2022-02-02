import {
  memo,
  SyntheticEvent,
  forwardRef,
  ForwardedRef,
  PropsWithoutRef,
} from 'react';

import Autocomplete, { AutocompleteProps } from '@mui/material/Autocomplete';
import TextField, { TextFieldProps } from '@mui/material/TextField';
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
  error?: boolean;
  getOptionLabel?: AutocompleteProps<T, false, false, false>['getOptionLabel'];
  renderOption?: AutocompleteProps<T, false, false, false>['renderOption'];
  inputRef?: TextFieldProps['inputRef'];
}

const SelectWithoutRef = <T extends string | number | object>(
  props: PropsWithoutRef<SelectProps<T>>,
  ref: ForwardedRef<HTMLInputElement>
) => {
  const classes = useStyles();

  const {
    onChange,
    options,
    value,
    disabled,
    error,
    getOptionLabel,
    name,
    placeholder,
    renderOption,
    inputRef,
  } = props;

  const handleChange = (
    event: SyntheticEvent<Element, Event>,
    val: T | null
  ) => {
    onChange(val, name);
  };

  return (
    <Autocomplete
      ref={ref}
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
          inputRef={inputRef}
          InputProps={{
            ...params.InputProps,
            disableUnderline: true,
            classes: { root: clsx(classes.root, { [classes.error]: error }) },
          }}
        />
      )}
    />
  );
};

const Select = forwardRef(SelectWithoutRef);

export default memo(Select);
