import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  collapse: {
    width: '100%',
  },
  item: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 20,
    paddingRight: 20,
    '&:hover': {
      background: theme.color.transparentBlue,
    },
  },
  sub: {
    paddingLeft: 40,
  },
  defaultCursor: {
    cursor: 'default',
  },
  wrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  f1: {
    flex: 1,
  },
  spaceBetween: {
    width: '100%',
    justifyContent: 'space-between',
  },
  arrowBtn: {
    marginRight: 15,
  },
  arrowIcon: {
    fontSize: 12,
    color: '#000',
  },
  name: {
    fontSize: 14,
    fontFamily: 'Lato',
    color: '#000',
  },
  editBtn: {
    opacity: 0,
  },
  editBtnVisible: {
    opacity: 1,
  },
  itemIcon: {
    fontSize: 16,
    color: theme.color.darkBlue,
  },
  reset: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  formControl: {
    flex: 1,
  },
}));

export const useEditableStyles = makeStyles((theme) => ({
  input: {
    height: 24,
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  loader: {
    marginLeft: 10,
    color: theme.color.darkBlue,
  },
  closeBtn: {
    marginLeft: 10,
    marginRight: 5,
  },
  icon: {
    fontSize: 16,
    color: theme.color.darkBlue,
  },
}));
