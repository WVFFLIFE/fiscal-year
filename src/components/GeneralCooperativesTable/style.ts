import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  tableHeadRow: {
    borderBottom: `1px solid ${theme.color.greyLight1}`,
  },
  headCell: {
    padding: 7,
    '&:first-child': {
      paddingLeft: 16,
    },
    '&:last-child': {
      paddingRight: 16,
    },
  },
  pagination: {
    marginTop: 20,
  },
}));
