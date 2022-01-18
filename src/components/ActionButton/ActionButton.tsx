import { memo, forwardRef } from 'react';
import Button, { ButtonProps } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

import clsx from 'clsx';
import { useStyles } from './style';

interface ActionButtonProps extends ButtonProps {
  palette?: 'darkBlue' | 'white';
  loading?: boolean;
}

type DefaultButtonProps =
  | ActionButtonProps
  | ({ href: string } & ButtonProps<'a', ActionButtonProps>);

const ActionButton = forwardRef<HTMLButtonElement, DefaultButtonProps>(
  ({ palette = 'white', className, children, loading, ...rest }, ref) => {
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
        endIcon={
          loading ? (
            <CircularProgress size={15} className={classes.loader} />
          ) : (
            rest.endIcon
          )
        }
      >
        {children}
      </Button>
    );
  }
);

export default memo(ActionButton);
