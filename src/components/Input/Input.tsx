import { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';
import { useStyles } from './style';

interface InputClasses {
  input?: string;
}

export type InputProps = TextFieldProps & {
  inputClasses?: InputClasses;
  readonly?: boolean;
};

const Input = forwardRef<HTMLDivElement, InputProps>(
  (
    {
      className,
      classes: propsClasses,
      inputClasses,
      children,
      readonly = false,
      ...rest
    },
    ref
  ) => {
    const classes = useStyles();

    return (
      <TextField
        {...rest}
        ref={ref}
        className={clsx(classes.fullWidth, className)}
        InputProps={{
          className: clsx(classes.root, propsClasses?.root),
          readOnly: readonly,
          classes: {
            input: clsx(classes.input, inputClasses?.input),
            focused: clsx({
              [classes.focus]: !readonly,
            }),
          },
          disableUnderline: true,
        }}
        InputLabelProps={{
          className: classes.label,
          focused: false,
          disableAnimation: true,
        }}
        variant="standard"
      >
        {children}
      </TextField>
    );
  }
);

export default Input;
