import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    marginBottom: 30,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    lineHeight: 1,
    color: '#000',
    textAlign: 'center',
  },
  uploadBtn: {
    marginLeft: 20,
  },
  loader: {
    color: '#fff',
  },
}));
