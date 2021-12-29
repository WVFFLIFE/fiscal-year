import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 20,
    overflow: 'hidden',
    overflowX: 'auto',
  },
  border: {
    borderRight: `1px solid ${theme.color.greyBorder}`,
  },
  table: {
    tableLayout: 'fixed',
  },
  row: {
    background: theme.color.greyLight2,
    borderBottom: `1px solid ${theme.color.greyLight1}`,
    cursor: 'pointer',
    '&:hover': {
      '& $actionCell > div': {
        opacity: 1,
      },

      '& > td': {
        background: 'rgba(215, 242, 249, 1)',
      },
    },
    '&:nth-child(2n)': {
      background: '#fff',
    },
  },
  fixed: {
    position: 'sticky',
    zIndex: 1,
    background: 'inherit',
    '&::before': {
      position: 'absolute',
      right: 0,
      width: 1,
      height: '100%',
      background: '#000',
    },
  },
  actionCell: {
    paddingTop: 8,
    paddingBottom: 8,

    '& > div': {
      opacity: 0,
    },
  },
  semibold: {
    fontWeight: 600,
  },
  questionIcon: {
    fontSize: 48,
    color: theme.color.red,
  },
  pagination: {
    marginTop: 20,
  },
}));
