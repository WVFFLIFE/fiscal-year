import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const DoubleArrowsLeftIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.37181 6.35904L5.99837 8.91045L5.21531 9.7165L2.5887 7.16536L2.58759 7.1665L1.75733 6.36021L1.75853 6.35904L1.75569 6.35629L2.58595 5.55L2.58865 5.55277L5.21695 3L6 3.80605L3.37181 6.35904Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.37181 6.35904L9.99837 8.91045L9.21531 9.7165L6.5887 7.16536L6.58759 7.1665L5.75733 6.36021L5.75853 6.35904L5.75569 6.35629L6.58595 5.55L6.58865 5.55277L9.21695 3L10 3.80605L7.37181 6.35904Z"
      />
    </SvgIcon>
  );
};

export default DoubleArrowsLeftIcon;
