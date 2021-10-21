import { makeStyles } from '@mui/styles';

export const useBodyStyles = makeStyles((theme) => ({
  wrapper: {
    padding: 12,
    background: 'rgba(248, 248, 248, 1)',
  },
  offset: {
    marginBottom: 20,
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
  checkboxOffset: {
    marginRight: 15,
  },
  closedPeriodEndDate: {
    marginLeft: 15,
  },
  menuList: {
    maxHeight: 205,
    marginBottom: 20,
    padding: 0,
    overflow: 'auto',
    overflowX: 'hidden',
  },
  selected: {
    '&.Mui-selected': {
      background: theme.color.greyLight2,
    },
  },
  cancelBtnOffsetRight: {
    marginRight: 20,
  },
  pointer: {
    cursor: 'pointer',
  },
  closeBtn: {
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    textTransform: 'none',
  },
  closeIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
}));

export const useStyles = makeStyles(() => ({
  picker: { minWidth: 350 },
}));
