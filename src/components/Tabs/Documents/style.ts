import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
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
}));
