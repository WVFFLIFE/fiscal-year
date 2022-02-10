import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  refreshBtn: {
    padding: '6px 8px',
    borderRadius: 20,
    color: theme.color.darkBlue,
  },
  refreshIcon: {
    fontSize: 12,
  },
  cooperativePicker: {
    width: 350,
  },
  stretchedContainer: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginTop: 10,
  },
}));
