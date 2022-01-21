import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  offsetTop: {
    marginTop: 10,
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
}));
