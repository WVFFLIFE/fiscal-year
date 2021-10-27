import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    height: 32,
    minHeight: 0,
    padding: '10px 20px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: '#fff',
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgb(0,0,0, 0.15)',
    color: '#000',
    boxSizing: 'border-box',
  },
  select: {
    background: '#fff',
    '&:focus': {
      background: '#fff',
    },
  },
  icon: {
    right: 10,
    fontSize: 12,
    color: '#000',
  },
}));
