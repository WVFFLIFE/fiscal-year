import { makeStyles } from '@mui/styles';

import commentsLogo from 'assets/images/chat.png';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: `url(${commentsLogo})`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right top',
  },
  container: {
    width: `${(100 / 3) * 2}%`,
  },
  centeredLoader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  divider: {
    width: '100%',
    height: 1,
    marginTop: 30,
    marginBottom: 40,
    background: theme.color.greyBorder,
  },
  billet: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
    padding: 24,

    background: '#fff',
    boxShadow: '0px 5px 10px rgba(0,0,0,0.1)',
    color: 'rgba(0,0,0,0.75)',
    fontSize: 18,
    lineHeight: '24px',
  },
  commentsWrapper: {
    maxHeight: 400,
    paddingRight: 20,
    paddingBottom: 20,
  },
  comment: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));
