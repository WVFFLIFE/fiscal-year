import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  editorWrapper: {
    marginTop: 10,
    padding: '12px 19px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: '#fff',
    border: `1px solid #E6EAEF`,
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
    color: '#000',
    '&:focus': {
      outline: 0,
    },
    wordBreak: 'break-word',
  },
  focused: {
    outline: 0,
    borderColor: theme.color.blue2,
  },
  disabled: {
    outline: 0,
    borderColor: '#E6EAEF',
  },
}));
