import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  fullWidth: {
    display: 'flex',
  },
  root: {
    height: 32,
    padding: '10px 20px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: '#fff',
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
    color: '#000',
  },
  input: {
    height: 'auto',
  },
}));
