import { FC } from 'react';

import Menu, { MenuProps } from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Fade from '@mui/material/Fade';

import { useStyles } from './style';

type DropdownProps = {
  anchorEl: MenuProps['anchorEl'];
  open: boolean;
  onClose(): void;
};

type DropdownComponent = FC<DropdownProps> & { Item: typeof MenuItem };

const Dropdown: DropdownComponent = ({ anchorEl, open, onClose, children }) => {
  const classes = useStyles();

  return (
    <Menu
      open={open}
      onClose={onClose}
      anchorEl={anchorEl}
      TransitionComponent={Fade}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: -4,
        horizontal: 'right',
      }}
      PaperProps={{
        className: classes.list,
      }}
    >
      {children}
    </Menu>
  );
};

Dropdown.Item = MenuItem;

export default Dropdown;
