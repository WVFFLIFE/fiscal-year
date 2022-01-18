import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.color.greyLight1}`,
    '&:first-child': {
      borderTop: `1px solid ${theme.color.greyLight1}`,
    },
    '&:hover': {
      background: theme.color.transparentBlue,
      '& $actions': {
        opacity: 1,
      },
    },
  },
  active: {
    '& $actions': {
      opacity: 1,
    },
  },
  disabled: {
    '&:hover': {
      background: 'transparent',
      '& $actions': {
        opacity: 0,
      },
    },
  },
  item: {
    padding: '8px 16px',
    flex: 1,

    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 600,
    lineHeight: '16px',
    color: '#333',
    '&:first-child': {
      flex: 3,
    },
    '&:nth-child(2)': {
      flex: 2,
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    opacity: 0,
  },
  inputWrapper: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  icon: {
    fontSize: 12,
  },
  btnOffset: {
    marginRight: 10,
  },
  input: {
    padding: '0px 20px',
    height: 24,
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
  textInput: {
    height: 24,
  },
  warning: {
    borderColor: theme.color.red,
  },
}));
