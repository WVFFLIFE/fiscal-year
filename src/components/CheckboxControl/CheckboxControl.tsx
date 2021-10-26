import Checkbox, { CheckboxProps } from 'components/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

import { useStyles } from './style';

interface CheckboxControlProps extends CheckboxProps {
  label: string;
  disabled?: boolean;
}

const CheckboxControl: React.FC<CheckboxControlProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <FormControlLabel
      className={classes.root}
      disabled={disabled}
      control={<Checkbox checked={checked} onChange={onChange} {...rest} />}
      label={label}
      classes={{
        label: classes.label,
      }}
    />
  );
};

export default CheckboxControl;
