import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  fullWidth: {
    display: 'flex',
    flex: 1,
  },
  root: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: '#fff',
    border: '1px solid rgba(242, 242, 242, 1)',
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
    color: '#000',
  },
  focus: {
    border: `1px solid ${theme.color.blue2}`,
  },
  input: {
    height: 32,
    padding: '0px 20px',
  },
}));
