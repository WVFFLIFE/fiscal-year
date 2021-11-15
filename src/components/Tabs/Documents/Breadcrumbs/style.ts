import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    height: 25,
    marginBottom: 20,
  },
  icon: {
    fontSize: 16,
    color: '#000',
  },
  divider: {
    display: 'block',
    width: 1,
    height: 18,
    marginLeft: 10,
    marginRight: 10,
    background: '#000',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Proxima Nova',
  },
  activeFolder: {
    fontWeight: 600,
  },
  pointer: {
    cursor: 'pointer',
  },
}));
