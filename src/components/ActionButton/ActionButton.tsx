import { memo } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

interface ActionButtonProps extends ButtonProps {
  palette?: 'darkBlue' | 'white';
}

const ActionButton: React.FC<ActionButtonProps> = ({
  palette = 'white',
  className,
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className, {
        [classes.darkBlue]: palette === 'darkBlue',
        [classes.white]: palette === 'white',
      })}
      classes={{
        sizeSmall: classes.small,
      }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default memo(ActionButton);
