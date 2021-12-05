import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  titleOffset: {
    marginBottom: 20,
  },
  commonTableCell: {
    fontSize: 16,
    fontFamily: 'Lato',
    color: '#000',
  },
  type: {
    fontWeight: 600,
    borderBottom: '1px solid #000',
  },
  date: {
    fontWeight: 300,
  },
  dropzone: {
    maxWidth: 500,
    flex: 1,
  },
  meetingTable: {
    marginBottom: theme.spacing(8),
  },
  preview: {
    marginLeft: 20,
  },
}));
