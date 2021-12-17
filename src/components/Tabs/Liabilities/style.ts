import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    overflow: 'hidden',
    overflowX: 'auto',
    '&::-webkit-scrollbar': {
      height: 12,
    },
    '&::-webkit-scrollbar-track': {
      background: theme.color.greyLight2,
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgba(100, 121, 143, 0.5)',
      border: `3.5px solid ${theme.color.greyLight2}`,
      borderRadius: 2.5,
      transition: '.15s linear',
      '&:hover': {
        background: 'rgba(100, 121, 143, 0.35)',
      },
    },
  },
  table: {
    tableLayout: 'fixed',
  },
  row: {
    background: theme.color.greyLight2,
    '& $fixed': {
      background: theme.color.greyLight2,
    },
    '&:nth-child(2n)': {
      background: '#fff',

      '& $fixed': {
        background: '#fff',
      },
    },
  },
  fixed: {
    position: 'sticky',
    zIndex: 1,
  },
}));
