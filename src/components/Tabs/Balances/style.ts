import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  subTitle: {
    marginRight: 20,
  },
  addBtn: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'none',
  },
  btnIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  oddBox: {
    '&:nth-child(2n-1)': {
      marginRight: 20,
    },
  },
  initMargin: {
    margin: 0,
  },
  deficit: {
    fontSize: '1rem',
    fontFamily: 'Lato',
    fontWeight: 300,
    color: '#333',
  },
}));
