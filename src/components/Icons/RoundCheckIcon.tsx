import { forwardRef } from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const RoundCheckIcon: React.FC<SvgIconProps> = forwardRef(
  ({ viewBox = '0 0 12 12', ...rest }, ref) => {
    return (
      <SvgIcon {...rest} ref={ref} viewBox={viewBox}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6ZM1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6ZM5.98059 7.94174L5.98459 7.9377L5.98863 7.93371L8.99183 4.93051C9.18709 4.73525 9.18709 4.41866 8.99183 4.2234C8.79656 4.02814 8.47998 4.02814 8.28472 4.2234L5.6269 6.88122L4.26062 5.516C4.06533 5.32086 3.74886 5.32092 3.55365 5.51613C3.35833 5.71145 3.35839 6.02814 3.55378 6.22338L5.27362 7.94188C5.46891 8.13701 5.78538 8.13695 5.98059 7.94174Z"
        />
      </SvgIcon>
    );
  }
);

export default RoundCheckIcon;
