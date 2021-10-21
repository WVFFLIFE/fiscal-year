import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  button: {
    minWidth: 'auto',
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 500,
    background: '#fff',
    borderRadius: 20,
    color: theme.color.darkBlue,
    filter: 'drop-shadow(0px 2px 7px rgba(151, 151, 151, 0.4))',
    textTransform: 'capitalize',
  },
  largeSize: {
    padding: '12px 16px',
    height: 40,
  },
  mediumSize: {
    padding: '8px 16px',
    height: 32,
  },
  smallSize: {
    padding: '4px 16px',
    height: 24,
  },
  icon: {
    marginRight: 12,
    fontSize: '0.8rem',
    color: 'currentColor',
  },
  disabled: {
    '&.Mui-disabled': {
      opacity: 0.4,
      color: 'inherit',
    },
  },
}));
