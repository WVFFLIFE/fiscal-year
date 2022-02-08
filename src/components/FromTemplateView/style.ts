import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  title: {
    margin: 0,
    marginBottom: 20,
    fontSize: 24,
    fontFamily: 'Proxima Nova',
    fontWeight: 600,
    textAlign: 'center',
  },
  iconWrapper: {
    marginBottom: 20,
    textAlign: 'center',
  },
  infoIcon: {
    fontSize: 48,
    color: 'rgba(0, 166, 231, 1)',
  },
  description: {
    margin: 0,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: 600,
    fontFamily: 'Proxima Nova',
    textAlign: 'center',
  },
  btnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 35,
  },
  cancelBtn: {
    marginRight: 20,
  },
  dialogIcon: {
    display: 'block',
    margin: '25px 0',
    fontSize: 40,
    color: '#00A6E7',
  },
}));
