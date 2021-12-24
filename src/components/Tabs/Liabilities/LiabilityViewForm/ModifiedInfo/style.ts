import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',

    fontFamily: 'Lato',
    fontSize: 16,
    lineHeight: 1,
    color: theme.color.darkGrey,
  },
  offset: {
    marginBottom: 10,
  },
  icon: {
    marginRight: 10,
    fontSize: 16,
    color: 'rgba(100, 121, 143, 1)',
  },
  light: {
    fontWeight: 300,
  },
  underline: {
    borderBottom: `1px solid ${theme.color.darkGrey}`,
  },
}));
