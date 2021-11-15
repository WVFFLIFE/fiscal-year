import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  title: {
    display: 'block',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#000',
  },
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    marginBottom: 10,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));
