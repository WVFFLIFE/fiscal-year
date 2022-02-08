import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  cooperativeItem: {
    justifyContent: 'space-between',
    padding: '5px 16px',
    '&.Mui-disabled': {
      opacity: 1,
    },
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
