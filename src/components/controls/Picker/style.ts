import Button from '@mui/material/Button';
import { styled, makeStyles } from '@mui/styles';

export const PickerInput = styled(Button)(({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minWidth: 250,
  height: theme.size.pickerHeight,
  padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
  background: '#fff',
  border: '1px solid rgba(242, 242, 242, 1)',
  borderRadius: 3,
  boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
  cursor: 'pointer',
  transitionProperty: 'background',
  '&.Mui-focusVisible': {
    border: `1px solid ${theme.color.blue2}`,
  },
  '&.Mui-disabled': {
    background: theme.color.greyLight2,
  },
}));

export const IconButton = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'auto',
  padding: 2,
  lineHeight: 1,
  background: 'transparent',
  borderRadius: '50%',
}));

export const useStyles = makeStyles((theme) => ({
  inputWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  text: {
    fontFamily: 'Proxima Nova',
    fontSize: 14,
    letterSpacing: 0.23,
    textTransform: 'none',
  },
  value: {
    fontWeight: 700,
    color: '#000',
  },
  placeholder: {
    color: theme.color.greyDark,
  },
  arrowIcon: {
    marginLeft: 10,
    fontSize: '0.75rem',
    color: '#000',
    transition:
      'transform 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    transformOrigin: 'center',
  },
  open: {
    transform: 'rotate(180deg)',
  },
  focus: {
    border: `1px solid ${theme.color.blue2}`,
  },
  menu: {
    background: theme.color.modalBackground,
  },
}));
