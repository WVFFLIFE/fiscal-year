import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  centered: {
    display: 'inline-flex',
    alignItems: 'center',
  },
  row: {
    '&.MuiTableRow-hover': {
      '&:hover': {
        background: theme.color.transparentBlue,

        '& .cell-actions': {
          opacity: 1,
        },
      },
    },
    '&.MuiTableRow-selected': {
      background: theme.color.transparentBlue,
    },
  },
  cell: {
    padding: 16,
    fontSize: 14,
    fontFamily: 'Lato',
    fontWeight: 600,
    lineHeight: '16px',
    color: '#333',
  },
  actionBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  btn: {
    marginRight: 10,
    '&:last-child': {
      marginRight: 0,
    },
  },
  icon: {
    fontSize: 12,
  },
  folderName: {
    paddingBottom: 1,
    borderBottom: '1px solid #000',
  },
  folderIcon: {
    marginRight: 10,
    fontSize: 16,
    color: theme.color.green,
  },
  publishedIcon: {
    fontSize: 16,
    color: theme.color.green,
  },
}));
