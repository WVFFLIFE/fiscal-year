import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 'auto',
    padding: '8px 16px',
    fontSize: 14,
    lineHeight: '16px',
    borderRadius: 20,
    fontFamily: 'Proxima Nova',
    textTransform: 'none',
    '&:hover': {
      background: '#fff',
      color: theme.color.blue2,
    },
  },
  small: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  darkBlue: {
    background: theme.color.darkBlue,
    color: '#fff',
    '&:hover': {
      background: theme.color.blue2,
      color: '#fff',
      filter: 'drop-shadow(0px 2px 7px rgba(151, 151, 151, 0.4))',
    },
    '&.Mui-disabled': {
      background: theme.color.greyBorder,
      color: '#fff',
      filter: 'none',
    },
  },
  white: {
    background: '#fff',
    color: theme.color.darkBlue,
    filter: 'drop-shadow(0px 2px 7px rgba(151, 151, 151, 0.4))',
    '&.Mui-disabled': {
      color: theme.color.greyBorder,
    },
  },
  startIcon: {
    marginLeft: 0,
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
}));
