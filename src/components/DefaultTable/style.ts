import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  cell: {
    padding: 16,

    border: 0,
    fontSize: '1em',
    fontFamily: 'Lato',
    lineHeight: 1,
    color: '#333',
  },
  small: {
    paddingTop: 8,
    paddingBottom: 8,
  },
  large: {},
}));
