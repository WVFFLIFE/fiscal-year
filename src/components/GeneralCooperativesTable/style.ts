import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  tableHeadRow: {
    borderBottom: `1px solid ${theme.color.greyLight1}`,
  },
  cell: {
    fontSize: 16,
    fontFamily: 'Lato',
    lineHeight: 1,
    color: 'rgba(51, 51, 51, 1)',
  },
  bold: {
    fontWeight: 600,
  },
  actionBtn: {
    padding: '8px 16px',
    marginLeft: 'auto',
    background: theme.color.darkBlue,
    borderRadius: 20,
    color: '#fff',
    '&:hover': {
      background: theme.color.blue2,
    },
  },
  icon: {
    fontSize: 16,
  },
}));
