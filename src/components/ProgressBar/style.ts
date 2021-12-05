import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    height: 5,
    background: theme.color.greyLight2,
    borderRadius: 10,
    overflow: 'hidden',
  },
  loader: {
    display: 'block',
    width: '100%',
    height: 5,
    background: theme.color.blue2,
    borderRadius: 10,
    transition: '.2s linear',
  },
}));
