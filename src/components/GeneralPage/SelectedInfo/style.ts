import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,

    fontSize: 20,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
  },
  divider: {
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
