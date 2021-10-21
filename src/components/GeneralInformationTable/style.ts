import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  link: {
    fontWeight: 700,
    borderBottom: '1px solid #000',
    cursor: 'pointer',
    textTransform: 'capitalize',
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
}));
