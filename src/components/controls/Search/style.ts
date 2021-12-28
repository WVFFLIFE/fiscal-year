import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'relative',
  },
  iconWrapper: {
    position: 'absolute',
    top: '50%',
    left: 18,
    transform: 'translateY(-50%)',
  },
  input: {
    display: 'block',
    width: '100%',
    padding: '8px 18px',
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    background: '#fff',
    border: '1px solid rgba(242, 242, 242, 1)',
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
    color: '#000',
    '&:focus, &:active': {
      outline: 0,
      borderColor: theme.color.blue2,
    },
  },
  icon: {
    display: 'block',
    fontSize: 16,
    color: theme.color.darkBlue,
  },
  withIcon: {
    paddingLeft: 40,
  },
}));
