import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  rowBorder: {
    borderLeft: '4px solid',
    borderColor: theme.color.red,
  },
  cell: {
    padding: 16,
    fontSize: 16,
    fontFamily: 'Lato',
    lineHeight: 1,
    color: 'rgba(51, 51, 51, 1)',
  },
  bold: {
    fontWeight: 600,
  },
  actionBtn: {
    padding: '8px 16px',
    marginLeft: 'auto',
    background: theme.color.darkBlue,
    borderRadius: 20,
    color: '#fff',
    '&:hover': {
      background: theme.color.blue2,
    },
  },
  icon: {
    fontSize: 16,
  },
  calendarIcon: {
    marginRight: 16,
    color: theme.color.orange,
  },
  acceptIcon: {
    fontSize: 16,
    color: theme.color.green,
  },
  mockIcon: {
    width: 16,
    height: 16,
    marginRight: 16,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
  },
  disabledInput: {
    fontSize: 16,
    fontFamily: 'Lato',
    fontWeight: 400,
    background: 'transparent',
    borderColor: 'transparent',
    boxShadow: 'none',
    color: 'rgba(51, 51, 51, 1)',
  },
}));
