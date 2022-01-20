import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 24,
    background: '#fff',
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.15)',
  },
  description: {
    margin: 0,
    marginBottom: 20,
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    lineHeight: '24px',
    color: 'rgba(0,0,0,0.75)',
    textAlign: 'center',
  },
  infoIcon: {
    fontSize: 40,
    color: 'rgba(0, 166, 231, 1)',
  },
  m0: {
    margin: 0,
  },
  loader: {
    color: theme.color.darkBlue,
  },
}));
