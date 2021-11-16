import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    lineHeight: 1,
    color: '#000',
    textAlign: 'center',
  },
  box: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
    marginTop: 30,
  },
  errorIcon: {
    fontSize: 48,
    color: theme.color.red,
  },
  errorItem: {
    margin: 0,
    marginBottom: 15,
    padding: 10,
    background: theme.color.greyLight1,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  errorDescription: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'rgba(48, 52, 75, 1)',
  },
}));
