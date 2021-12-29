import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '&.MuiInput-root': {
      display: 'flex',
      justifyContent: 'space-between',
      paddingRight: '0px !important',
      paddingBottom: 0,
      border: '1px solid rgba(242, 242, 242, 1)',
      borderRadius: 3,
      boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',

      '& .MuiInput-input': {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 8,
        paddingBottom: 6,

        fontSize: 14,
        fontFamily: 'Proxima Nova',
        lineHeight: '18px',

        color: '#000',
      },
    },
  },
  error: {
    '&.MuiInput-root': {
      borderColor: theme.color.red,
    },
  },
  endAdornment: {
    position: 'static',
    top: 0,
    right: 0,
  },
  indicator: {
    marginRight: 5,
    padding: 2,
    '& svg': {
      fontSize: 12,
      color: '#000',
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  clearIndicator: {
    padding: 4,
  },
  popupIndicator: {
    '& svg': {
      fontSize: 16,
    },
  },
  option: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    lineHeight: '18px',
  },
}));
