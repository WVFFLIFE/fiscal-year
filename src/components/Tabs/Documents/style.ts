import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  quickFilterItem: {
    marginRight: 0,
  },
  icon: {
    fontSize: 16,
    color: '#000',
  },
  actionBtn: {
    marginRight: 10,
    '&:last-child': {
      marginRight: 0,
    },
  },
  actionIcon: {
    fontSize: 12,
  },
  amount: {
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 600,
    color: 'rgba(51, 51, 51, 1)',
  },
  zeroAmount: {
    color: theme.color.greyBorder,
  },
  divider: {
    margin: '0 5px',
    width: 1,
    height: 14,
    background: 'currentColor',
  },
}));
