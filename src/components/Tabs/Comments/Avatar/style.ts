import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  avatar: {
    background: theme.color.greyLight1,
    borderRadius: '50%',
  },
  avatarOffset: {
    padding: 8,
  },
  userIcon: {
    fontSize: 24,
    color: theme.color.greyBorder,
  },
  userPhoto: {
    display: 'block',
    maxWidth: '100%',
    height: 'auto',
    borderRadius: '50%',
  },
}));
