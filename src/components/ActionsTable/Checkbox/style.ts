import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  checkboxIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 12,
    height: 12,
    border: '1px solid #979797',
  },
  checkedCheckboxIcon: {
    background: '#218D7A',
    borderColor: '#218D7A',
  },
  checkIcon: {
    fontSize: '0.8rem',
    color: '#fff',
  },
  checkboxRoot: {
    padding: 0,
    color: '#218D7A',
  },
  colorSecondary: {
    '&.Mui-disabled': {
      opacity: 0.3,
    },
  },
}));
