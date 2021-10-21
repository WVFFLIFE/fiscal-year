import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  btn: {
    color: theme.color.darkBlue,
  },
  fill: {
    background: theme.color.darkBlue,
    color: '#fff',
    '&:hover': {
      color: theme.color.darkBlue,
    },
  },
  open: {},
  icon: {
    fontSize: 12,
  },
}));

export const useBodyStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    background: theme.color.greyLight2,
  },
  input: {
    minWidth: 250,
  },
}));
