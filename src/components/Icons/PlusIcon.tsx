import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const PlusIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.5 6C10.7761 6 11 6.22386 11 6.5C11 6.77614 10.7761 7 10.5 7H1.5C1.22386 7 1 6.77614 1 6.5C1 6.22386 1.22386 6 1.5 6H10.5Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5 11C6.5 11.2761 6.27614 11.5 6 11.5C5.72386 11.5 5.5 11.2761 5.5 11L5.5 2C5.5 1.72386 5.72386 1.5 6 1.5C6.27614 1.5 6.5 1.72386 6.5 2L6.5 11Z"
      />
    </SvgIcon>
  );
};

export default PlusIcon;
