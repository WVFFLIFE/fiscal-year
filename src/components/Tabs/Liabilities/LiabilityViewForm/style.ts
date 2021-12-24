import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  top: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modifiedInfo: {
    flex: 1,
  },
  divider: {
    width: '100%',
    height: 1,
    margin: '30px 0',
    background: theme.color.greyLight1,
  },
  columnsWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    margin: 0,
    padding: 0,
    listStyle: 'none',
    '&:first-child': {
      marginRight: 20,
    },
  },
  listItem: {
    marginBottom: 20,
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));
