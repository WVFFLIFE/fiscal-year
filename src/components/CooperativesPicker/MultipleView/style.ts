import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  closeBtn: {
    fontSize: 12,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    textTransform: 'none',
  },
  closeIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
}));
