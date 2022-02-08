import { makeStyles } from '@mui/styles';

const ITEM_PART = 6;

function countItemWidth(fraction: number) {
  return `${(100 / ITEM_PART) * fraction}%`;
}

export interface CSSProps {
  background?: string;
}

export const useStyles = makeStyles((theme) => ({
  row: {
    display: 'flex',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.color.greyLight1}`,
    '&:first-child': {
      background: (props: CSSProps) => props.background,
      borderTop: `1px solid ${theme.color.greyLight1}`,
      '&:hover': {
        background: theme.color.transparentBlue,
      },
    },
    '&:hover': {
      background: theme.color.transparentBlue,
      '& $actions': {
        opacity: 1,
      },
    },
  },
  active: {
    '& $actions': {
      opacity: 1,
    },
  },
  disabled: {
    '&:first-child': {
      '&:hover': {
        background: (props: CSSProps) => props.background,
      },
    },
    '&:hover': {
      background: 'transparent',
      '& $actions': {
        opacity: 0,
      },
    },
  },

  input: {
    width: '100%',
  },
  item: {
    padding: '8px 16px',
    flexBasis: countItemWidth(1),

    fontSize: '1em',
    fontFamily: 'Lato',
    fontWeight: 600,
    lineHeight: '16px',
    color: '#333',
    '&:first-child': {
      flexBasis: countItemWidth(3),
    },
    '&:nth-child(2)': {
      flexBasis: countItemWidth(2),
    },
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    opacity: 0,
  },
  inputWrapper: {
    paddingTop: 4,
    paddingBottom: 4,
  },
  icon: {
    fontSize: 12,
  },
  btnOffset: {
    marginRight: 10,
  },
  textInput: {
    height: 24,
  },
  warning: {
    borderColor: theme.color.red,
    '&:focus': {
      borderColor: theme.color.red,
    },
  },
  rowDisabled: {
    background: theme.color.greyLight2,
    '&:first-child': {
      background: `${theme.color.greyLight2} !important`,
      '&:hover': {
        background: theme.color.greyLight2,
      },
    },

    '&:hover': {
      background: theme.color.greyLight2,
      '& $actions': {
        opacity: 0,
      },
    },

    '& $item': {
      color: theme.color.greyDark,
    },
  },
}));
