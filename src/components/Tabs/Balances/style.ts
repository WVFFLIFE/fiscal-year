import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/system';

export const useStyles = makeStyles((theme) => ({
  subTitle: {
    marginBottom: 20,
  },
  propertyMaintenanceRow: {
    '&:first-child': {
      background: alpha(theme.color.green, 0.1),
    },
  },
  vatCalculationRow: {
    '&:first-child': {
      background: theme.color.greyLight2,
    },
  },
  addBtn: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    lineHeight: '16px',
    textTransform: 'none',
  },
  btnIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
}));