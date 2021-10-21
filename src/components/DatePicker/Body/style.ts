import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    padding: 20,
    background: 'rgba(248, 248, 248, 1)',
  },
  calendar: {
    marginBottom: 20,
    padding: 20,
    background: '#fff',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    marginRight: 20,
  },
}));
