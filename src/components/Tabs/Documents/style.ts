import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  row: {
    marginBottom: 20,
  },
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
