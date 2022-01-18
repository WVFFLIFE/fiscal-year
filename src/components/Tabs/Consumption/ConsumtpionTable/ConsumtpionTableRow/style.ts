import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
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
    },
  },
  cell: {
    display: 'flex',
    alignItems: 'center',
    height: 48,
    padding: '0 16px',
  },
  icon: {
    fontSize: 12,
  },
  btnOffset: {
    marginRight: 10,
  },
  input: {
    height: 32,
  },
  label: {
    flex: 3,

    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 600,
    color: '#333',
  },
  value: {
    flex: 2,

    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 300,
    color: '#000',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    flex: 1,
    opacity: 0,
  },
  warning: {
    borderColor: theme.color.red,
  },
}));
