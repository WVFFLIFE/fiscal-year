import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  selectionList: {
    margin: 0,
    padding: 0,
    listStyle: 'none',
  },
  selectionListItem: {
    marginBottom: 10,
    '&:first-child': {
      paddingBottom: 10,
      borderBottom: `1px solid ${theme.color.greyBorder}`,
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
  btnsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  loadBtn: {
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 10,
  },
  alignLeft: {
    textAlign: 'left',
  },
}));
