import { forwardRef } from 'react';
import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';
import { useStyles } from './style';

const Input = forwardRef<HTMLDivElement, TextFieldProps>(
  ({ className, classes: propsClasses, children, ...rest }, ref) => {
    const classes = useStyles();

    return (
      <TextField
        {...rest}
        ref={ref}
        className={clsx(classes.fullWidth, className)}
        InputProps={{
          className: clsx(classes.root, propsClasses?.root),
          classes: {
            input: classes.input,
            focused: classes.focus,
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
