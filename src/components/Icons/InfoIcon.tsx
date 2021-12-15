import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const InfoIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 6C12 2.68629 9.31371 0 6 0C2.68629 0 0 2.68629 0 6C0 9.31371 2.68629 12 6 12C9.31371 12 12 9.31371 12 6ZM1 6C1 3.23858 3.23858 1 6 1C8.76142 1 11 3.23858 11 6C11 8.76142 8.76142 11 6 11C3.23858 11 1 8.76142 1 6ZM6.5 3.5C6.5 3.77614 6.27614 4 6 4C5.72386 4 5.5 3.77614 5.5 3.5C5.5 3.22386 5.72386 3 6 3C6.27614 3 6.5 3.22386 6.5 3.5ZM6.5 8.5C6.5 8.77614 6.27614 9 6 9C5.72386 9 5.5 8.77614 5.5 8.5V5.5C5.5 5.22386 5.72386 5 6 5C6.27614 5 6.5 5.22386 6.5 5.5V8.5Z"
      />
    </SvgIcon>
  );
};

export default InfoIcon;
