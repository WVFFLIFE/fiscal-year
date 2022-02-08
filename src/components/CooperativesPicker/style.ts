import { makeStyles, styled } from '@mui/styles';

export const Hint = styled('span')(() => ({
  fontSize: 14,
  fontWeight: 300,
}));

export const useBodyStyles = makeStyles(() => ({
  controlsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
    paddingLeft: 16,
    paddingRight: 0,
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
  list: {
    marginBottom: 40,
  },
  topOffset: {
    marginTop: 20,
  },
}));

export const useStyles = makeStyles(() => ({
  picker: { width: 300 },
  body: {
    width: 'auto',
    minWidth: 500,
    padding: 12,
    background: 'rgba(248, 248, 248, 1)',
  },
}));
