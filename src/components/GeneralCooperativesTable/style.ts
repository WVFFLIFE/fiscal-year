import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  tableHeadRow: {
    borderBottom: `1px solid ${theme.color.greyLight1}`,
  },
  headCell: {
    padding: '7px 16px',
  },
  pagination: {
    marginTop: 20,
  },
}));
