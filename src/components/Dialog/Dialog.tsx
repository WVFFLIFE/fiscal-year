import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import { CloseIcon } from 'components/Icons';

import { useStyles } from './style';

export interface DialogProps {
  open: MuiDialogProps['open'];
  title?: string;
  maxWidth?: MuiDialogProps['maxWidth'];
  fullWidth?: MuiDialogProps['fullWidth'];
  handleClose(): void;
  TransitionProps?: MuiDialogProps['TransitionProps'];
}

const Dialog: React.FC<DialogProps> = ({
  open,
  title,
  handleClose,
  maxWidth = 'md',
  fullWidth = true,
  children,
  ...rest
}) => {
  const classes = useStyles();

  const onClose = () => {
    handleClose();
  };

  return (
    <MuiDialog
      classes={{
        // root: classes.dialog,
        paper: classes.paper,
        paperWidthMd: classes.paperWidthMd,
      }}
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth={fullWidth}
      {...rest}
    >
      <div className={classes.root}>
        <div className={classes.btnRow}>
          <Button className={classes.btn} onClick={onClose}>
            <CloseIcon className={classes.icon} />
          </Button>
        </div>
        {title && <h3 className={classes.title}>{title}</h3>}
        {children}
      </div>
    </MuiDialog>
  );
};

export default Dialog;
