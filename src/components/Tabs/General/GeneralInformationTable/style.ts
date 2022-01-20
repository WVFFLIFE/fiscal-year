import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  link: {
    fontWeight: 700,
    borderBottom: '1px solid #000',
    color: '#000',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  icon: {
    fontSize: 12,
  },
  datepicker: {
    maxWidth: 170,
  },
  datepickerError: {
    borderColor: theme.color.red,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    marginRight: 10,
  },
  row: {
    background: theme.color.greyLight2,
  },
  bodyRow: {
    '&:hover': {
      background: theme.color.transparentBlue,

      '& $actions': {
        opacity: 1,
      },
    },
  },
  actions: {
    opacity: 0,
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
  warningIcon: {
    fontSize: 48,
    color: 'rgba(219, 118, 0, 1)',
  },
}));
