import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    transition: '.15s linear',
    '&:hover': {
      opacity: 0.8,
    },
  },
  icon: {
    marginLeft: 7,
    fontSize: 12,
    color: 'rgba(151, 151, 151, 1)',
    transition: '.15s linear',
  },
  asc: {
    transform: 'rotate(180deg)',
    transformOrigin: 'center',
  },
}));
