import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const CheckIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 24 24',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M9 16.17 4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"></path>
    </SvgIcon>
  );
};

export default CheckIcon;
