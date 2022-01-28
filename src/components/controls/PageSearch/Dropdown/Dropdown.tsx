import { FC, Fragment } from 'react';

import Popper, { PopperProps } from '@mui/material/Popper';
import Fade from '@mui/material/Fade';

interface DropdownProps extends PopperProps {}

const Dropdown: FC<DropdownProps> = (props) => {
  const { children, ...rest } = props;
  return (
    <Popper {...rest} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps}>
          <div>{children}</div>
        </Fade>
      )}
    </Popper>
  );
};

export default Dropdown;
