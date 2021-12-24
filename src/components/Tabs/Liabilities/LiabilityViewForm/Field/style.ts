import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  label: {
    display: 'block',
    marginBottom: 10,
    fontSize: 14,
    fontFamily: 'Lato',
    lineHeight: '18px',
    color: '#000',
  },
  output: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 600,
    color: theme.color.greyDark,
  },
  required: {
    color: theme.color.red,
  },
}));
