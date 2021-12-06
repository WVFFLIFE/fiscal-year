import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  icon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  offsetRight: {
    marginRight: 20,
  },
  redConfirmationIcon: {
    fontSize: 48,
    color: theme.color.red,
  },
  yellowConfirmationIcon: {
    fontSize: 48,
    color: 'rgba(219, 118, 0, 1)',
  },
}));
