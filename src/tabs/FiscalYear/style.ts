import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  icon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  btn: {
    marginRight: 20,
  },
  info: {
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 300,
    color: '#000',
  },
}));
