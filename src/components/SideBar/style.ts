import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: theme.size.sidebarWidth,
    height: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    background: theme.color.darkBlue,
    overflow: 'auto',
  },
  offset: {
    marginBottom: theme.spacing(4),
  },
}));
