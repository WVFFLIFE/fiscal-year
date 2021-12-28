import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    gap: 20,
  },
  list: {
    flex: 1,
    maxWidth: '50%',
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  listItem: {
    marginBottom: 25,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  textarea: {
    padding: '6px 20px 6px 19px',
  },
}));
