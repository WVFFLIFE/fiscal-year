import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
    width: '100%',
    height: 32,
    padding: '6px 13px',
    background: '#fff',
    borderRadius: 3,
    boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.15)',
    outline: 0,
    border: '1px solid transparent',
    '&:focus': {
      borderColor: theme.color.blue2,
    },
  },
}));
