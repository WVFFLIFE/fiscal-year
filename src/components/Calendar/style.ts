import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: theme.size.calendarWidth,
    '&:focus': {
      outline: 0,
      border: 0,
    },
  },
  shortWeeksWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 10,
  },
  box: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 24,
    borderRadius: 2,
    '&:focus': {
      outline: 0,
    },
  },
  dayBox: {
    minWidth: 'auto',
    padding: 0,
    color: 'rgba(100, 99, 103, 1)',
    cursor: 'pointer',
    transition: 'none',
    '&:hover': {
      background: theme.color.transparentBlue,
    },
  },
  weekShort: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: 'rgba(74, 74, 74, 1)',
  },
  row: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 8,
    '&:last-child': {
      marginBottom: 0,
    },
  },
  day: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: 'inherit',
  },
  notCurrentMonth: {
    color: 'rgba(206, 212, 218, 1)',
  },
  today: {
    fontWeight: 700,
    color: '#000',
  },
  selectedDay: {
    fontWeight: 400,
    background: theme.color.darkBlue,
    color: '#fff',
    cursor: 'default',
    '&:hover': {
      background: theme.color.darkBlue,
    },
  },
  disabled: {},
}));
