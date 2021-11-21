import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  },
  tabs: {
    background: theme.color.greyLight1,
  },
  tab: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    lineHeight: '17px',
    color: theme.color.darkBlue,
    textTransform: 'capitalize',
  },
  selected: {
    '&.Mui-selected': {
      background: '#fff',
      color: theme.color.darkBlue,
    },
  },
  indicator: {
    '&.MuiTabs-indicator': {
      display: 'none',
    },
  },
  box: {
    padding: '25px 20px',
    background: '#fff',
  },
}));
