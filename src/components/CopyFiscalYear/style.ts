import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  confirmationIcon: {
    fontSize: 48,
    color: 'rgba(219, 118, 0, 1)',
  },
  menuItemIcon: {
    marginRight: 10,
    fontSize: '1rem',
  },
  menuItem: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: theme.color.darkBlue,
  },
  arrowIcon: {
    transition: 'all .15s linear',
  },
  rotatedArrowIcon: {
    transform: 'rotate(180deg)',
  },
  warningIcon: {
    fontSize: 42,
    color: theme.color.orange,
  },
}));
