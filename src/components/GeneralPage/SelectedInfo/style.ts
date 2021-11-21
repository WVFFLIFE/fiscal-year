import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,

    fontSize: 20,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
  },
  divider: {
    width: 1.5,
    height: 20,
    margin: '0 10px',
    background: 'currentColor',
  },
}));
