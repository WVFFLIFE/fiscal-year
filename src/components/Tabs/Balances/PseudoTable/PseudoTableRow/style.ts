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
  disabled: {
    '&:hover': {
      background: 'transparent',
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
    height: 24,
  },
}));
