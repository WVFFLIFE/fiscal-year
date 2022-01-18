import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: 32,
    padding: '8px 20px',
    borderRadius: 3,
    border: '1px solid transparent',
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
  },
  focus: {
    borderColor: theme.color.blue2,
    boxShadow: 'none',
  },
  error: {
    borderColor: theme.color.red,
  },
  iconBtn: {
    padding: 3,
  },
  icon: {
    fontSize: 16,
    color: 'rgba(100, 121, 143, 1)',
  },
  input: {
    display: 'block',
    width: '100%',
    marginLeft: 12,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: 'transparent',
    border: 0,
    color: '#000',
    outline: 0,
  },
}));
