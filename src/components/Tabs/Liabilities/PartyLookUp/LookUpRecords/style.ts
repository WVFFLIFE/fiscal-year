import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  description: {
    margin: 0,
    marginBottom: 30,
    padding: 0,
    fontSize: 16,
    fontFamily: 'Proxima Nova',
    lineHeight: '20px',
    textAlign: 'center',
  },
  searchField: {
    marginBottom: 40,
  },
  pagination: {
    marginTop: 30,
  },
  table: {
    borderTop: '1px solid rgba(240, 240, 240, 1)',
  },
  row: {
    background: 'rgba(240, 243, 247, 1)',
    borderBottom: `1px solid ${theme.color.greyLight1}`,
    '&:first-child': {
      borderTop: `1px solid ${theme.color.greyLight1}`,
    },
    '&:nth-child(2n)': {
      background: '#fff',
    },
    '&:hover': {
      background: theme.color.transparentBlue,
      cursor: 'pointer',
    },
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 40,
  },
  btnOffset: {
    marginRight: 10,
  },
}));
