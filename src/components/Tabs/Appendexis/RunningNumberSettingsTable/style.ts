import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    borderTop: '1px solid #f1f1f1',
  },
  row: {
    '&:first-child': {
      borderTop: '1px solid',
      borderColor: theme.color.greyLight1,
    },
    '&:nth-child(2n-1)': {
      background: theme.color.greyLight2,
    },
  },
  cell: {
    padding: 16,
    fontFamily: 'Lato',
    fontSize: 16,
  },
  light: {
    fontWeight: 300,
  },
  semibold: {
    fontWeight: 600,
  },
}));
