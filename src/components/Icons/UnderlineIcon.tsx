import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const UnderlineIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 16 16',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.66667 1.36572C4.03486 1.36572 4.33333 1.6642 4.33333 2.03239V7.3334C4.33333 9.35844 5.97496 11.0001 8 11.0001C10.025 11.0001 11.6667 9.35844 11.6667 7.3334V2.03239C11.6667 1.6642 11.9651 1.36572 12.3333 1.36572C12.7015 1.36572 13 1.6642 13 2.03239V7.3334C13 10.0948 10.7614 12.3334 8 12.3334C5.23858 12.3334 3 10.0948 3 7.3334V2.03239C3 1.6642 3.29848 1.36572 3.66667 1.36572ZM2 14.6667C2 14.2985 2.29848 14.0001 2.66667 14.0001H13.3333C13.7015 14.0001 14 14.2985 14 14.6667C14 15.0349 13.7015 15.3334 13.3333 15.3334H2.66667C2.29848 15.3334 2 15.0349 2 14.6667Z"
      />
    </SvgIcon>
  );
};

export default UnderlineIcon;
