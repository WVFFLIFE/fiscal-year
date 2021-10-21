import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const ArrowIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.10904 6.62819L8.66045 4.00163L9.4665 4.78469L6.91536 7.4113L6.9165 7.41241L6.11021 8.24267L6.10904 8.24147L6.10629 8.24431L5.3 7.41405L5.30277 7.41135L2.75 4.78305L3.55605 4L6.10904 6.62819Z"
      />
    </SvgIcon>
  );
};

export default ArrowIcon;
