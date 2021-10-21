import { forwardRef } from 'react';

import MuiButton, { ButtonProps as MuiButtonProps } from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

interface ButtonProps extends MuiButtonProps {
  label: string;
}

const Button: React.FC<ButtonProps> = forwardRef<
  HTMLButtonElement,
  ButtonProps
>((props, ref) => {
  const classes = useStyles();

  const {
    label,
    disabled,
    onClick,
    className,
    size = 'large',
    ...rest
  } = props;

  return (
    <MuiButton
      {...rest}
      ref={ref}
      size={size}
      classes={{
        sizeLarge: classes.largeSize,
        sizeMedium: classes.mediumSize,
        sizeSmall: classes.smallSize,
        disabled: classes.disabled,
        ...rest.classes,
      }}
      className={clsx(classes.button, className)}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
    >
      {label}
    </MuiButton>
  );
});

export default Button;
