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
    marginTop: 30,
    padding: 10,
    background: theme.color.greyLight1,
  },
  errorIcon: {
    fontSize: 48,
    color: theme.color.red,
  },
  errorDescription: {
    margin: 0,
    marginBottom: 15,
    fontSize: 16,
    fontFamily: 'Lato',
    color: 'rgba(48, 52, 75, 1)',
  },
}));