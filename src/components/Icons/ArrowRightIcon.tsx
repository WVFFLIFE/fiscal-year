import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ArrowRightIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.62819 5.89096L4.00163 3.33955L4.78469 2.5335L7.4113 5.08464L7.41241 5.0835L8.24267 5.88979L8.24147 5.89096L8.24431 5.89371L7.41405 6.7L7.41135 6.69723L4.78305 9.25L4 8.44395L6.62819 5.89096Z"
      />
    </SvgIcon>
  );
};

export default ArrowRightIcon;
