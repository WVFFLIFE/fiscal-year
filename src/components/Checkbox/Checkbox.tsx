import { memo } from 'react';

import MuiCheckbox, { CheckboxProps } from '@mui/material/Checkbox';
import { CheckIcon } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const Checkbox: React.FC<CheckboxProps> = (props) => {
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
      {...props}
    />
  );
};

export default memo(Checkbox);
