import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material/styles';

export const useStyles = makeStyles((theme) => ({
  tab: {
    '&.MuiTab-root': {
      minWidth: 'auto',
      minHeight: 0,
      marginBottom: theme.spacing(4),
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
      paddingBottom: theme.spacing(0),
      paddingTop: theme.spacing(0),

      fontSize: 12,
      fontFamily: 'Proxima Nova',
      fontWeight: 600,
      color: '#fff',

      opacity: 1,
      textTransform: 'none',

      transition: 'color .15s linear',
      '&:last-child': {
        marginBottom: 0,
      },
      '&.Mui-disabled': {
        color: theme.color.greyBorder,
        '& div': {
          background: alpha(theme.color.greyDark, 0.3),
          color: theme.color.greyDark,
        },
      },
      '&.Mui-selected': {
        '& div': {
          background: theme.color.white,
          color: theme.color.darkBlue,
        },
      },
    },
  },
  icon: {
    '&.MuiSvgIcon-root': {
      fontSize: '1rem',
    },
  },
}));
