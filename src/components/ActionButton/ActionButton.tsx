import { memo, forwardRef } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

interface ActionButtonProps extends ButtonProps {
  palette?: 'darkBlue' | 'white';
}

type DefaultButtonProps =
  | ActionButtonProps
  | ({ href: string } & ButtonProps<'a', ActionButtonProps>);

const ActionButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
  ({ palette = 'white', className, children, ...rest }, ref) => {
    const classes = useStyles();

    return (
      <Button
        {...rest}
        ref={ref}
        className={clsx(classes.root, className, {
          [classes.darkBlue]: palette === 'darkBlue',
          [classes.white]: palette === 'white',
        })}
        classes={{
          sizeSmall: classes.small,
          startIcon: classes.startIcon,
          endIcon: classes.endIcon,
          ...rest.classes,
        }}
      >
        {children}
      </Button>
    );
  }
);

export default memo(ActionButton);
