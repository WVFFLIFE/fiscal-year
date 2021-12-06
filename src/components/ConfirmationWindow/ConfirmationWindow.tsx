import React, { MouseEventHandler, ReactNode } from 'react';
import Dialog, { DialogProps } from 'components/Dialog';
import { CircularProgress } from '@mui/material';
import { ApplyButton, CancelButton } from 'components/Styled';

import { useStyles } from './style';

interface BtnProps {
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  label?: string;
  loading?: boolean;
}

interface ConfirmationWindowProps extends DialogProps {
  title?: string;
  Icon?: ReactNode;
  description?: string;
  CancelBtnProps: BtnProps;
  ApplyBtnProps: BtnProps;
}

const ConfirmationWindow: React.FC<ConfirmationWindowProps> = ({
  title,
  description,
  Icon,
  open,
  maxWidth,
  fullWidth,
  handleClose,
  CancelBtnProps,
  ApplyBtnProps,
}) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      handleClose={handleClose}
    >
      <div className={classes.wrapper}>
        {title && <h2 className={classes.title}>{title}</h2>}
        {Icon}
        {description && <p className={classes.description}>{description}</p>}
        <div className={classes.btnsWrapper}>
          <CancelButton
            className={classes.btnOffset}
            onClick={handleClose}
            disabled={CancelBtnProps.disabled}
          >
            {CancelBtnProps.label}
          </CancelButton>
          <ApplyButton
            onClick={ApplyBtnProps.onClick}
            disabled={ApplyBtnProps.disabled}
            endIcon={
              ApplyBtnProps.loading ? (
                <CircularProgress className={classes.loader} size={20} />
              ) : undefined
            }
          >
            {ApplyBtnProps.label}
          </ApplyButton>
        </div>
      </div>
    </Dialog>
  );
};

export default ConfirmationWindow;
