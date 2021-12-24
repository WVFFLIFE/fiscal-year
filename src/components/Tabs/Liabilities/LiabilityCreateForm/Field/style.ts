import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  label: {
    display: 'block',
    marginBottom: 8,
    fontSize: 14,
    lineHeight: '18px',
    fontFamily: 'Lato',
    color: '#000',
  },
  required: {
    color: theme.color.red,
  },
  error: {
    display: 'block',
    marginTop: 5,
    fontSize: 14,
    color: theme.color.red,
  },
}));
