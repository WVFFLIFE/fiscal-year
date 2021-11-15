import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { CloseIcon } from 'components/Icons';

import { useStyles } from './style';

interface DialogProps {
  open: MuiDialogProps['open'];
  maxWidth?: MuiDialogProps['maxWidth'];
  fullWidth?: MuiDialogProps['fullWidth'];
  handleClose(): void;
  TransitionProps?: MuiDialogProps['TransitionProps'];
}

const Dialog: React.FC<DialogProps> = ({
  open,
  handleClose,
  maxWidth = 'md',
  fullWidth = true,
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiDialog
      classes={{
        paper: classes.paper,
      }}
      open={open}
      onClose={handleClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...rest}
    >
      <div className={classes.root}>
        <div className={classes.btnRow}>
          <Button className={classes.btn} onClick={handleClose}>
            <CloseIcon className={classes.icon} />
          </Button>
        </div>
        {children}
      </div>
    </MuiDialog>
  );
};

export default Dialog;
