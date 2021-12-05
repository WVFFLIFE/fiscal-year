import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  text: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 600,
    borderBottom: '1px solid #000',
    color: '#000',
  },
  link: {
    cursor: 'pointer',
    textDecoration: 'none',
    transition: '.15s linear',
    '&:hover': {
      opacity: 0.8,
    },
  },
}));
