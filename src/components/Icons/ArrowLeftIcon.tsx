import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ArrowLeftIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.37181 6.10904L7.99837 8.66045L7.21531 9.4665L4.5887 6.91536L4.58759 6.9165L3.75733 6.11021L3.75853 6.10904L3.75569 6.10629L4.58595 5.3L4.58865 5.30277L7.21695 2.75L8 3.55605L5.37181 6.10904Z"
      />
    </SvgIcon>
  );
};

export default ArrowLeftIcon;
