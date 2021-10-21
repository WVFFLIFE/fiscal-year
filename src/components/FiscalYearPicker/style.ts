import { makeStyles } from '@mui/styles';

export const useBodyStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 12,
    background: 'rgba(248, 248, 248, 1)',
  },
  pickerSearch: {
    marginBottom: 20,
  },
  fiscalYearItem: {
    padding: '10px 16px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: '#000',
  },
  selected: {
    '&.Mui-selected': {
      background: theme.color.greyLight2,
    },
  },
  menuList: {
    maxHeight: 205,
    marginBottom: 20,
    padding: 0,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  cancelBtn: {
    marginRight: 20,
  },
}));
