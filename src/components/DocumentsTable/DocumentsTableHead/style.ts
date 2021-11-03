import { makeStyles } from '@mui/styles';

export const useSortedTableCellStyles = makeStyles((theme) => ({
  active: {
    background: theme.color.greyLight2,
  },
  label: {
    display: 'inline-flex',
    alignItems: 'center',
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.8,
    },
  },
  sortIcon: {
    marginLeft: 10,
    fontSize: 12,
    transition: '.15s linear',
    color: 'inherit',
  },
  sortIconAsc: {
    transform: 'rotate(180deg)',
  },
}));

export const useTableHeadStyles = makeStyles(() => ({
  cell: {
    padding: 16,
    fontSize: 10,
    fontFamily: 'Lato',
    fontWeight: 700,
    lineHeight: '12px',
    color: '#333',
    textTransform: 'uppercase',
  },
}));
