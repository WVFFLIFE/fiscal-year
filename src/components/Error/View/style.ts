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
    marginBottom: 25,
    padding: 0,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    margin: 0,
    marginTop: 25,
    padding: 0,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: theme.color.darkBlue,
    textAlign: 'center',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 30,
  },
  icon: {
    fontSize: 48,
    color: theme.color.red,
  },
}));