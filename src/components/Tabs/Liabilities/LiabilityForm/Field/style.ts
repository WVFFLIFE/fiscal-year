import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'block',
  },
  label: {
    display: 'block',
    marginBottom: 8,
    fontSize: 14,
    lineHeight: '18px',
    fontFamily: 'Lato',
    color: '#000',
  },
  required: {
    color: theme.color.red,
  },
  borderRed: {
    borderColor: theme.color.red,
  },
  error: {
    display: 'block',
    marginTop: 5,
    fontSize: 14,
    color: theme.color.red,
  },
  numberInput: {
    display: 'block',
    width: '100%',
    height: 32,
    padding: '0px 20px',

    fontFamily: 'Proxima Nova',

    background: '#fff',
    border: '1px solid rgba(242, 242, 242, 1)',
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgb(0,0,0,0.15)',
    color: '#000',

    '&:focus': {
      border: `1px solid ${theme.color.blue2}`,
      outline: 0,
    },
  },
}));
