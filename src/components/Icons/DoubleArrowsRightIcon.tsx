import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const DoubleArrowsRightIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.62819 5.64096L6.00163 3.08955L6.78469 2.2835L9.4113 4.83464L9.41241 4.8335L10.2427 5.63979L10.2415 5.64096L10.2443 5.64371L9.41405 6.45L9.41135 6.44723L6.78305 9L6 8.19395L8.62819 5.64096Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.62819 5.64096L2.00163 3.08955L2.78469 2.2835L5.4113 4.83464L5.41241 4.8335L6.24267 5.63979L6.24147 5.64096L6.24431 5.64371L5.41405 6.45L5.41135 6.44723L2.78305 9L2 8.19395L4.62819 5.64096Z"
      />
    </SvgIcon>
  );
};

export default DoubleArrowsRightIcon;
