import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: 10,
    padding: 20,
    '&:hover $actions': {
      opacity: 1,
    },
    '&:nth-child(2n)': {
      background: theme.color.greyLight2,

      '& $controlPanel': {
        background: '#fff',
      },
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  disabledSection: {
    '&:hover $actions': {
      opacity: 0,
    },
  },
  titleOffset: {
    marginBottom: 20,
  },
  root: {
    display: 'flex',
  },
  btn: {
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    lineHeight: '16px',
    textTransform: 'none',
  },
  editor: {
    maxWidth: '80%',
    width: '100%',
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    maxWidth: '20%',
    width: '100%',
    opacity: 0,
  },
  active: {
    opacity: 1,
  },
  cancelBtnOffset: {
    marginRight: 20,
  },
  startIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  loader: {
    color: 'inherit',
  },
  controlPanel: {},
}));
