import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    margin: 0,
    marginBottom: 20,
    padding: 0,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: '#000',
  },
  description: {
    margin: 0,
    marginTop: 20,
    padding: 0,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    color: 'rgba(48, 52, 75, 1)',
  },
  icon: {
    fontSize: 48,
    color: theme.color.red,
  },
  btnsRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
    marginTop: 30,
  },
  cancelBtn: {
    marginRight: 20,
  },
  loader: {
    color: 'inherit',
  },
}));
