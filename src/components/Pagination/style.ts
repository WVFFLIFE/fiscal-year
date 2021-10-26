import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ul: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
  },
  nav: {
    display: 'block',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    background: 'transparent',
    border: 0,
    color: '#000',
    cursor: 'pointer',
    outline: 0,
    textTransform: 'capitalize',
  },
  disabledNav: {
    cursor: 'default',
    opacity: 0.3,
  },
  item: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    background: 'transparent',
    border: 0,
    color: '#000',
    cursor: 'pointer',
    outline: 0,
  },
  selectedItem: {
    textDecoration: 'underline',
  },
  count: {
    margin: 0,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: 0.2,
    color: '#000',
  },
  li: {
    '&:first-child': {
      marginRight: 15,
    },
    '&:last-child': {
      marginLeft: 15,
    },
  },
  rowsPerPageTitle: {
    marginRight: 15,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
  },
  icon: {
    fontSize: '1rem',
    color: '#000',
  },
  selectMenu: {
    minHeight: 'auto',
  },
  selectRoot: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 400,
    letterSpacing: 0.2,
    lineHeight: '18px',
    color: '#000',
  },
  select: {
    '&.MuiSelect-select': {
      minHeight: 0,
      '&.MuiInput-input': {
        paddingTop: 4,
        paddingBottom: 4,
        paddingRight: 17,
      },
    },
  },
  countWrapper: {
    maxWidth: 200,
    width: '100%',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  menuItem: {
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 14,
    fontFamily: 'Proxima Nova',
  },
}));
