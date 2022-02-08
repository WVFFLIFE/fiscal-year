import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  offsetBottom: {
    marginBottom: 20,
  },
  filterItem: {
    marginRight: 0,
  },
  refreshBtn: {
    padding: '6px 8px',
    borderRadius: 20,
    color: theme.color.darkBlue,
  },
  refreshIcon: {
    fontSize: 12,
  },
  cooperativesPicker: {
    width: 350,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    flex: 1,
    marginTop: 10,
  },
}));
