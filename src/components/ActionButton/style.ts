import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'auto',
    padding: '10px 16px',
    height: 32,
    borderRadius: 20,
  },
  small: {
    height: 24,
  },
  darkBlue: {
    background: theme.color.darkBlue,
    color: '#fff',
    '&:hover': {
      color: theme.color.darkBlue,
    },
  },
  white: {
    background: '#fff',
    color: theme.color.darkBlue,
    filter: 'drop-shadow(0px 2px 7px rgba(151, 151, 151, 0.4))',
  },
}));
