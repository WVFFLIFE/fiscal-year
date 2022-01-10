import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  section: {
    marginBottom: 10,
    padding: 20,
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
  titleOffset: {
    marginBottom: 20,
  },
  root: {
    display: 'flex',
    '&:hover $actions': {
      opacity: 1,
    },
  },
  rootDisabled: {
    '&:hover $actions': {
      opacity: 0,
    },
  },
  btn: {
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    lineHeight: '16px',
    textTransform: 'none',
  },
  editor: {
    flex: 8,
    marginRight: 20,
  },
  actions: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    flex: 2,
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
