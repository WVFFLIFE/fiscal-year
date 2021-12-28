import { memo } from 'react';

import MuiCheckbox, {
  CheckboxProps as MuiCheckboxProps,
} from '@mui/material/Checkbox';
import { CheckIcon, MinusIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const Checkbox: React.FC<MuiCheckboxProps> = (props) => {
  const classes = useStyles();

  return (
    <MuiCheckbox
      classes={{
        root: classes.checkboxRoot,
        colorSecondary: classes.colorSecondary,
      }}
      icon={<span className={classes.checkboxIcon}></span>}
      checkedIcon={
        <span
          className={clsx(classes.checkboxIcon, classes.checkedCheckboxIcon)}
        >
          <CheckIcon className={classes.checkIcon} />
        </span>
      }
      indeterminateIcon={
        <span
          className={clsx(classes.checkboxIcon, classes.checkedCheckboxIcon)}
        >
          <MinusIcon className={classes.checkIcon} />
        </span>
      }
      {...props}
    />
  );
};

export type CheckboxProps = MuiCheckboxProps;
export default memo(Checkbox);
