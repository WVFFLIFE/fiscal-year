import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  title: {
    margin: 0,
    marginBottom: 10,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    lineHeight: 1,
    color: '#000',
    textAlign: 'center',
  },
  addBtn: {
    display: 'flex',
    margin: '0 auto',
    marginBottom: 10,
    fontSize: 12,
  },
  addIcon: {
    '& .MuiSvgIcon-root': {
      fontSize: 12,
    },
  },
  input: {
    marginRight: 20,
    flex: 1,
  },
  closeIcon: {
    fontSize: 16,
    color: theme.color.greyDark,
  },
  uploadBtn: {
    marginLeft: 20,
  },
  uploadLoader: {
    color: '#fff',
  },
  loader: {
    display: 'block',
    margin: '0 auto',
    marginTop: 30,
    color: theme.color.darkBlue,
  },
}));
