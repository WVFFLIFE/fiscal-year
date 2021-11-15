import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const MinusIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 24 24',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M19 13H5v-2h14v2z"></path>
    </SvgIcon>
  );
};

export default MinusIcon;
