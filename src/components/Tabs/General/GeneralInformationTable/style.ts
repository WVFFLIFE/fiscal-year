import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  link: {
    fontWeight: 700,
    borderBottom: '1px solid #000',
    color: '#000',
    cursor: 'pointer',
    textDecoration: 'none',
  },
  icon: {
    fontSize: 12,
  },
  datepicker: {
    maxWidth: 170,
  },
  centered: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    marginRight: 10,
  },
  row: {
    background: theme.color.greyLight2,
  },
}));
