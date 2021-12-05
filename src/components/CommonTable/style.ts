import { styled, makeStyles } from '@mui/styles';
import MuiTableCell from '@mui/material/TableCell';

export const useStyles = makeStyles(() => ({
  table: {
    width: '100%',
  },
}));

export const TableCell = styled(MuiTableCell)(() => ({
  padding: '14px 16px',
}));

export const HeadTableCell = styled(TableCell)(() => ({
  fontSize: 10,
  fontFamily: 'Lato',
  fontWeight: 700,
  color: 'rgba(51,51,51,1)',
  textTransform: 'uppercase',
}));
