import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  flex: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 17,
  },
  icon: {
    fontSize: 12,
    color: theme.color.darkBlue,
  },
  iconBtn: {
    padding: 3,
  },
  textWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  textBtn: {
    minWidth: 0,
    padding: 3,
    fontFamily: 'Lato',
    fontSize: 14,
    color: 'rgba(51, 51, 51, 1)',
    textTransform: 'none',
  },
}));
