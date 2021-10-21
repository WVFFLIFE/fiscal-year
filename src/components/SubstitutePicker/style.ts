import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 12,
    background: 'rgba(248, 248, 248, 1)',
  },
  substituteItem: {
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
  pickerSearch: {
    marginBottom: 20,
  },
  quickFilter: {
    marginBottom: 12,
  },
  menuList: {
    maxHeight: 205,
    overflow: 'auto',
    overflowX: 'hidden',
  },
}));
