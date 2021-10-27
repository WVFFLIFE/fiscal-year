import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  editorWrapper: {
    marginTop: 10,
    padding: '12px 19px',
    border: `1px solid ${theme.color.blue2}`,
    borderRadius: 3,
    boxShadow: 'inset 0px 1px 4px rgba(0, 0, 0, 0.15)',
  },
}));
