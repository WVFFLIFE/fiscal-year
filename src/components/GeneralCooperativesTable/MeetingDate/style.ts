import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  checkIcon: {
    fontSize: 16,
    color: theme.color.green,
  },
  date: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 300,
    color: 'rgba(51,51,51,1)',
    borderBottom: '1px solid',
    borderColor: 'currentColor',
    textDecoration: 'none',
  },
  warning: {
    fontWeight: 600,
    color: theme.color.red,
    borderColor: 'currentColor',
  },
  noBorder: {
    border: 0,
  },
  centered: {
    display: 'flex',
    justifyContent: 'center',
  },
}));
