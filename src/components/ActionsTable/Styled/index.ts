import TableCell from '@mui/material/TableCell';
import { styled } from '@mui/styles';

const DefaultTableCell = styled(TableCell)(() => ({
  padding: '14px 16px',
  fontFamily: 'Lato',
}));

export const HeadTableCell = styled(DefaultTableCell)(() => ({
  padding: '14px 16px',
  fontFamily: 'Lato',
  fontSize: 10,
  fontWeight: 700,
  color: 'rgba(51, 51, 51, 1)',
  border: 0,
  textTransform: 'uppercase',
}));
