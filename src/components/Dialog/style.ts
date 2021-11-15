import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  paper: {
    borderRadius: 0,
  },
  root: {
    position: 'relative',
    padding: 40,
  },
  btnRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 5,
  },
  btn: {
    position: 'absolute',
    top: 20,
    right: 20,
    minWidth: 'auto',
    padding: 3,
    borderRadius: '50%',
  },
  icon: {
    fontSize: 16,
    color: '#000',
  },
}));
