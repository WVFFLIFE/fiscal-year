import { makeStyles } from '@mui/styles';
import { alpha } from '@mui/material';

export const useStyles = makeStyles((theme) => ({
  comment: {
    display: 'flex',
    padding: 10,
    borderRadius: 15,
    transition: '.15s linear',

    '&:hover': {
      background: alpha(theme.color.blue2, 0.1),

      '& $actions': {
        opacity: 1,
      },
    },
  },
  commentNotRead: {
    background: alpha(theme.color.green, 0.1),
  },
  commentEdit: {
    '&:hover': {
      background: 'transparent',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    marginLeft: 10,
  },
  contentTop: {
    display: 'flex',
    alignItems: 'center',
  },
  commentOwner: {
    flex: 1,
    fontSize: 18,
    fontFamily: 'Proxima Nova',
    fontWeight: 700,
    lineHeight: 1,
    color: '#000',
  },
  actions: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 20,
    opacity: 0,
  },
  btn: {
    padding: 2,
  },
  btnOffset: {
    marginLeft: 10,
  },
  icon: {
    fontSize: 12,
    color: theme.color.darkGrey,
  },
  disabledEditor: {
    padding: 0,
    background: 'transparent',
    border: 0,
    boxShadow: 'none',
  },
  edited: {
    fontSize: 14,
    fontFamily: 'Proxima Nova',
    lineHeight: '18px',
    color: theme.color.greyDark,
  },
  footer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
  },
  replyBtn: {
    minWidth: 'auto',
    marginLeft: 20,
    padding: 0,
    paddingLeft: 3,
    paddingRight: 3,
    background: 'transparent',

    fontSize: 14,
    fontFamily: 'Proxima Nova',
    lineHeight: '18px',
    color: theme.color.greyDark,
    textTransform: 'none',
  },
  editBtnsWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  loader: {
    color: theme.color.darkGrey,
  },
  warningIcon: {
    fontSize: 48,
    color: theme.color.red,
  },
  relatedCommentsWrapper: {
    paddingLeft: 50,
  },
  relatedCommentsWrapperOffset: {
    marginBottom: 30,
  },
  addNewCommentOffset: {
    paddingLeft: 50,
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 10,
    color: theme.color.darkBlue,
  },
  markingLoader: {
    display: 'block',
    marginLeft: 10,
    color: theme.color.greyDark,
  },
}));
