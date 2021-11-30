import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  item: {
    minWidth: 'auto',
    marginRight: 10,
    padding: '3px 12px',
    background: 'transparent',
    border: `1px solid ${theme.color.greyBorder}`,
    borderRadius: 1,
    color: theme.color.greyDark,
    cursor: 'pointer',
    transition: 'all .15s linear',
    '&:hover': {
      background: 'transparent',
      color: theme.color.greyDark,
      opacity: 0.8,
    },
    '&:last-child': {
      marginRight: 0,
    },
  },
  activeItem: {
    background: theme.color.greyDark,
    color: '#fff',
    '&:hover': {
      background: theme.color.greyDark,
      color: '#fff',
      opacity: 1,
    },
    '&.Mui-disabled': {
      color: '#fff',
    },
  },
  label: {
    fontFamily: 'Proxima Nova',
    fontSize: 10,
    letterSpacing: 0.466667,
    color: 'inherit',
    textTransform: 'uppercase',
    transition: 'color .15s linear',
  },
}));
