import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '60px 0',
    background: theme.color.greyLight2,
    border: `1px dashed ${theme.color.blue2}`,
    borderRadius: 15,
    transition: 'background .15s linear',
    cursor: 'pointer',
    '&:hover': {
      background: theme.color.transparentBlue,
    },
  },
  dragActive: {
    background: '#fff',
  },
  text: {
    margin: 0,
    padding: 0,
    fontSize: 18,
    lineHeight: '24px',
    color: '#000',
  },
  or: {
    margin: '0 10px',
    fontWeight: 600,
    color: '#64798F',
    textTransform: 'uppercase',
  },
  btn: {
    minWidth: 'auto',
    padding: '4px 16px',
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '16px',
    filter: 'drop-shadow(0px 2px 7px rgba(151, 151, 151, 0.4))',
    background: '#fff',
    borderRadius: 20,
    color: theme.color.darkBlue,
    textTransform: 'uppercase',
  },
}));
