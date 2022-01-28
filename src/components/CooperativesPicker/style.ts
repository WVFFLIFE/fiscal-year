import { makeStyles } from '@mui/styles';

export const useBodyStyles = makeStyles(() => ({
  wrapper: {
    width: 'auto',
    minWidth: 450,
    padding: 12,
    background: 'rgba(248, 248, 248, 1)',
  },
  controlsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingLeft: 16,
    paddingRight: 16,
  },
  offset: {
    marginBottom: 20,
  },
  text: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    color: '#000',
  },
  checkboxOffset: {
    marginRight: 15,
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
  list: {
    marginBottom: 40,
  },
  topOffset: {
    marginTop: 20,
  },
}));

export const useStyles = makeStyles(() => ({
  picker: { width: 300 },
}));
