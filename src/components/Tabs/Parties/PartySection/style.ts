import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    borderBottom: `1px solid ${theme.color.greyLight1}`,
    cursor: 'pointer',
  },
  cell: {
    padding: 16,
  },
  sectionName: {
    fontSize: 18,
    fontFamily: 'Lato',
    fontWeight: 700,
    color: theme.color.green,
    textTransform: 'uppercase',
  },
  btn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 'auto',
    padding: '18px 14px',
    borderRadius: 0,
    transition: '.15s linear',
  },
  btnExpanded: {
    transform: 'rotate(180deg)',
  },
  arrow: {
    fontSize: 12,
    color: '#000',
  },
  billet: {
    display: 'block',
    width: '100%',
    height: 20,
    background: '#fff',
    boxShadow: '0px 11px 15px rgba(0, 0, 0, 0.05)',
  },
  tableRow: {
    background: theme.color.greyLight2,
    borderBottom: `1px solid ${theme.color.greyLight1}`,
    '&:first-child': {
      borderTop: `1px solid ${theme.color.greyLight1}`,
    },
    '&:nth-child(2n)': {
      background: '#fff',
    },
  },
  cellColor: {
    color: '#333',
  },
  light: {
    fontWeight: 300,
  },
  semibold: {
    fontWeight: 600,
  },
  loader: {
    color: '#333',
  },
}));
