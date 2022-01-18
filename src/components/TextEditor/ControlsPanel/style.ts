import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    background: theme.color.greyLight2,
    borderRadius: 3,
  },
  panel: {
    display: 'flex',
    alignItems: 'center',
  },
  btn: {
    minWidth: 0,
    padding: '4px 6px',
  },
  btnOffset: {
    marginRight: 5,
  },
  activeBtn: {
    background: 'rgba(25, 118, 210, 0.13)',
  },
  icon: {
    fontSize: '1rem',
    color: theme.color.darkBlue,
  },
  divider: {
    marginLeft: 15,
    marginRight: 15,
    width: 1,
    height: 16,
    background: '#B0B9C5',
  },
  counter: {
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    color: theme.color.darkBlue,
  },
  counterDescription: {
    fontWeight: 300,
  },
  counterCharacters: {
    marginLeft: 8,
    fontWeight: 600,
  },
  limitExceeded: {
    color: theme.color.red,
  },
}));
