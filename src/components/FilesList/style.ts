import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  list: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  item: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    padding: '3px 10px',
    background: theme.color.greyLight2,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  name: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#000',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  size: {
    marginRight: 20,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 300,
    color: '#000',
  },
  closeIcon: {
    fontSize: 12,
    color: theme.color.greyDark,
  },
}));
