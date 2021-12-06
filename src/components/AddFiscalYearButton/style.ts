import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  btnIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  addBtn: {
    background: theme.color.darkBlue,
    color: '#fff',
    '&:hover': {
      color: theme.color.darkBlue,
    },
    '&.Mui-disabled': {
      background: theme.color.greyBorder,
      color: '#fff',
      opacity: 1,
    },
  },
  list: {
    background: 'rgba(248, 248, 248, 1)',
    borderRadius: 0,
    boxShadow: '0px 0px 10px rgba(216, 225, 232, 1)',
  },
  menuItem: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: theme.color.darkBlue,
  },
  menuItemIcon: {
    marginRight: 10,
    fontSize: '1rem',
  },
  arrowIcon: {
    transition: 'all .15s linear',
  },
  rotatedArrowIcon: {
    transform: 'rotate(180deg)',
  },
}));
