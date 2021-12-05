import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
    width: 145,
    height: 145,
    padding: 12,
    border: '1px solid',
    borderColor: theme.color.greyBorder,
    '&:hover $mask': {
      opacity: 1,
    },
  },
  mask: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    left: 0,
    width: 145,
    height: 145,
    background: 'rgba(0,0,0,0.3)',
    opacity: 0,
    transition: '.2s linear',
  },
  progressRoot: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: 145,
    height: 145,
    padding: 12,
    border: '1px dashed',
    borderColor: theme.color.greyBorder,
  },
  img: {
    display: 'block',
    width: '100%',
    height: '100%',
  },
  loadingText: {
    display: 'block',
    marginBottom: 25,
    fontSize: 16,
    fontWeight: 400,
    fontFamily: 'Lato',
    textAlign: 'center',
  },
  btn: {
    background: '#fff',
    color: theme.color.darkBlue,
    '&:hover': {
      background: '#fff',
      color: theme.color.blue2,
    },
  },
  btnOffset: {
    marginRight: 10,
  },
  icon: {
    fontSize: 12,
  },
  title: {
    margin: 0,
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    lineHeight: 1,
    color: '#000',
    textAlign: 'center',
  },
}));
