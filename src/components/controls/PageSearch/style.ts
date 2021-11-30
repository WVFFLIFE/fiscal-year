import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export const useStyles = makeStyles((theme) => ({
  btn: {
    padding: '6px 8px',
    borderRadius: 20,
    color: theme.color.darkBlue,
  },
  fill: {
    background: theme.color.darkBlue,
    color: '#fff',
    '&:hover': {
      background: theme.color.blue2,
    },
  },
  open: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: alpha(theme.color.darkBlue, 0.15),
    borderRadius: 1,
  },
  icon: {
    fontSize: 12,
  },
}));

export const useBodyStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    padding: theme.spacing(2),
    background: theme.color.greyLight2,
  },
  input: {
    minWidth: 250,
    paddingLeft: 30,
  },
  searchIcon: {
    position: 'absolute',
    top: '50%',
    left: 22,
    transform: 'translateY(-50%)',

    fontSize: 12,
    color: theme.color.darkBlue,
  },
}));
