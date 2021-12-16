import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  cell: {
    padding: 16,

    border: 0,
    fontSize: 14,
    fontFamily: 'Lato',
    lineHeight: '16px',
    color: '#333',
  },
  small: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  large: {},
}));
