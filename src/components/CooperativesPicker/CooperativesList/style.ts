import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  menuList: {
    maxHeight: 205,
    marginBottom: 20,
    padding: 0,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  cooperativeItem: {
    justifyContent: 'space-between',
    padding: '10px 16px',
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: '#000',
  },
  closedPeriodEndDate: {
    marginLeft: 15,
  },
  selected: {
    '&.Mui-selected': {
      background: theme.color.greyLight2,
    },
  },
}));
