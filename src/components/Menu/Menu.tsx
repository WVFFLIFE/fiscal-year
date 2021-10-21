import Popover, { PopoverProps } from '@mui/material/Popover';
import Fade from '@mui/material/Fade';

import { useTheme } from '@mui/material';
import { useStyles } from './style';

const OFFSET = 4;

const Menu: React.FC<PopoverProps> = ({ children, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  return (
    <Popover
      anchorOrigin={{
        vertical: theme.size.pickerHeight + OFFSET,
        horizontal: 'left',
      }}
      TransitionComponent={Fade}
      classes={{
        root: classes.menu,
      }}
      {...rest}
    >
      {children}
    </Popover>
  );
};

export default Menu;
