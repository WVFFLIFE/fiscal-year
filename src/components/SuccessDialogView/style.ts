import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
    color: theme.color.green,
  },
  description: {
    margin: 0,
    marginTop: 30,
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 30,
  },
}));
