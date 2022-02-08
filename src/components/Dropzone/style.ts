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
  },
  disabled: {
    opacity: 0.4,
  },
  dragActive: {
    background: theme.color.transparentBlue,
  },
  text: {
    margin: 0,
    padding: 0,
    fontSize: 18,
    fontWeight: 700,
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
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'uppercase',
  },
}));
