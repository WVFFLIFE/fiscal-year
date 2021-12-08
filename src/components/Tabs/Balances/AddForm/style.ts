import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    marginBottom: 35,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
    textAlign: 'center',
  },
  btnOffset: {
    marginRight: 10,
  },
  required: {
    color: theme.color.red,
  },
  validationError: {
    borderColor: theme.color.red,
  },
  loader: {
    color: 'inherit',
  },
}));
