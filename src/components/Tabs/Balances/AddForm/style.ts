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
  numberInput: {
    display: 'block',
    width: '100%',
    height: 32,
    padding: '0px 20px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: '#fff',
    border: '1px solid rgba(242, 242, 242, 1)',
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
    color: '#000',
    '&:focus': {
      border: `1px solid ${theme.color.blue2}`,
      outline: 0,
    },
  },
}));
