import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  leftSide: {
    display: 'flex',
    alignItems: 'center',
  },
  link: {
    display: 'flex',
    alignItems: 'center',

    fontSize: 20,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textDecoration: 'none',
  },
  rightSide: {
    display: 'flex',
    alignItems: 'center',
  },
  divider: {
    display: 'block',
    width: 1.5,
    height: 20,
    margin: '0 10px',
    background: 'currentColor',
  },
  iconBtn: {
    marginRight: 15,
    padding: '6px 8px',
    borderRadius: 20,
    color: theme.color.greyDark,
  },
  icon: {
    fontSize: 16,
  },
}));
