import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  btn: {
    fontWeight: 600,
  },
  list: {
    background: 'rgba(248, 248, 248, 1)',
    borderRadius: 0,
    boxShadow: '0px 0px 10px rgba(216, 225, 232, 1)',
  },
  link: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: theme.color.darkBlue,
  },
  arrowIcon: {
    transition: 'transform .15s linear',
  },
  active: {
    transform: 'rotate(180deg)',
  },
}));
