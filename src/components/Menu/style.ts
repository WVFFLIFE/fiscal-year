import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  menu: {
    '&.MuiPopover-root': {
      background: theme.color.modalBackground,
    },
  },
}));
