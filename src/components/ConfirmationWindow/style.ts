import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    margin: 0,
    marginBottom: 20,
    padding: 0,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
  },
  description: {
    margin: 0,
    marginTop: 20,
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
    marginTop: 35,
  },
  loader: {
    color: 'inherit',
  },
  btnOffset: {
    marginRight: 20,
  },
}));
