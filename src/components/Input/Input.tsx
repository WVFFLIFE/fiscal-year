import TextField, { TextFieldProps } from '@mui/material/TextField';

import clsx from 'clsx';
import { useStyles } from './style';

const Input: React.FC<TextFieldProps> = ({ className, children, ...rest }) => {
  const classes = useStyles();

  return (
    <TextField
      {...rest}
      className={clsx(classes.fullWidth, className)}
      InputProps={{
        className: classes.root,
        classes: {
          input: classes.input,
        },
        disableUnderline: true,
      }}
      variant="standard"
    >
      {children}
    </TextField>
  );
};

export default Input;
