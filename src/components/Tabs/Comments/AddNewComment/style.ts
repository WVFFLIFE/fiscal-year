import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  btnsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  loader: {
    color: 'inherit',
  },
  cancelBtnOffset: {
    marginRight: 10,
  },
}));
