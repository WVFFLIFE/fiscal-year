import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
  },
  divider: {
    width: 1.5,
    height: 20,
    margin: '0 10px',
    background: '#000',
  },
}));
