import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  table: {
    tableLayout: 'fixed',
  },
  tableHeadRow: {
    borderBottom: `1px solid ${theme.color.greyLight1}`,
  },
  headCell: {
    padding: '7px 16px',
  },
  pagination: {
    marginTop: 20,
  },
  tableWrapper: {
    flex: 1,
    overflow: 'hidden',
    overflowX: 'auto',
  },
}));
