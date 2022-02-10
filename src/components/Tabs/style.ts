import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
  },
  tabs: {
    background: theme.color.greyLight1,
  },
  tab: {
    minHeight: 48,

    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    lineHeight: '17px',
    color: theme.color.darkBlue,
    textTransform: 'capitalize',

    '& .MuiTab-iconWrapper': {
      marginLeft: 7,
    },
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
  loader: {
    color: theme.color.darkBlue,
  },
  counterText: {
    fontSize: 11,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
  },
}));
