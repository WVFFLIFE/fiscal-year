import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
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
  checkboxLabel: {
    whiteSpace: 'normal',
  },
}));
