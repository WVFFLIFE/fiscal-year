import Button from '@mui/material/Button';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';

import { styled } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export const RootContainer = styled('div')(({ theme }) => ({
  paddingLeft: theme.size.sidebarWidth + parseInt(theme.spacing(8)),
  paddingTop: theme.spacing(7),
  paddingRight: theme.spacing(8),
  paddingBottom: theme.spacing(8),
}));

export const Logo = styled('img')(() => ({
  display: 'block',
  maxWidth: '100%',
  height: 'auto',
  margin: '0 auto',
}));

export const SideBarIconWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  background: alpha(theme.color.greyDark, 0.3),
  borderRadius: '50%',
  color: theme.color.white,
}));

export const FiltersWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  background: theme.color.greyLight2,
  borderRadius: 2,
}));

export const ButtonShape = styled(Button)(() => ({
  minWidth: 'auto',
  padding: '8px 16px',
  borderRadius: 20,
  textTransform: 'none',
  '&.Mui-disabled': {
    opacity: 0.4,
  },
  '&.MuiButton-sizeLarge': {
    height: 40,
  },
  '&.MuiButton-sizeMedium': {
    height: 32,
  },
}));

export const ApplyButton = styled(ButtonShape)(({ theme }) => ({
  fontSize: 14,
  fontFamily: 'Proxima Nova',
  fontWeight: 600,
  background: theme.color.darkBlue,
  color: '#fff',
  letterSpacing: 0.318182,
  '&:hover': {
    color: theme.color.darkBlue,
  },
  '&.Mui-disabled': {
    opacity: 1,
    background: theme.color.greyBorder,
    color: '#fff',
  },
}));

export const CancelButton = styled(ButtonShape)(({ theme }) => ({
  fontSize: 14,
  fontFamily: 'Proxima Nova',
  fontWeight: 600,
  background: '#fff',
  color: theme.color.darkBlue,
  filter: 'drop-shadow(0px 2px 7px rgba(151, 151, 151, 0.4))',
}));

export const IconButton = styled(Button)(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 'auto',
  padding: 6,
  borderRadius: '50%',
}));

export const SmallIconButton = styled(IconButton)(() => ({
  padding: 3,
}));

const DefaultTableCell = styled(TableCell)(() => ({
  padding: '14px 16px',
  fontFamily: 'Lato',
}));

export const HeadTableCell = styled(DefaultTableCell)(() => ({
  padding: '14px 16px',
  fontFamily: 'Lato',
  fontSize: 10,
  fontWeight: 700,
  color: 'rgba(51, 51, 51, 1)',
  textTransform: 'uppercase',
}));

export const BodyTableCell = styled(DefaultTableCell)(() => ({
  fontSize: 16,
  fontWeight: 300,
  color: '#000',
}));

export const BodyTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-hover': {
    '&:hover': {
      background: theme.color.transparentBlue,

      '& .cell-actions': {
        opacity: 1,
      },
    },
  },
}));

export const ActionButton = styled(Button)(({ theme }) => ({
  minWidth: 'auto',
  padding: '10px 16px',
  height: 32,
  background: theme.color.darkBlue,
  borderRadius: 20,
  color: '#fff',
  '&:hover': {
    color: theme.color.darkBlue,
  },
  '&.Mui-disabled': {
    opacity: 1,
    background: theme.color.greyBorder,
    color: '#fff',
  },
}));

export const DateBlock = styled(Button)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: 0,
  padding: 0,
  width: theme.size.calendarWidth / 3,
  height: 50,
  borderRadius: 0,

  transition: 'none',

  fontSize: 14,
  fontFamily: 'Lato',
  color: 'rgba(51, 51, 51, 1)',
  textTransform: 'capitalize',
  cursor: 'pointer',

  '&:hover': {
    background: 'rgba(34, 64, 96, 0.1)',
  },
}));
