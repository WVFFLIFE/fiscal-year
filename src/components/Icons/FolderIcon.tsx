import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const FolderIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 16 16',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1 3.33832C1 2.59918 1.59709 2 2.33364 2H6.66795C6.86585 2 7.05353 2.08821 7.18022 2.24077L8.64732 4.00747H14.3364C15.0729 4.00747 15.67 4.60665 15.67 5.34579V13.3757C15.67 14.1148 15.0729 14.714 14.3364 14.714H2.33364C1.5971 14.714 1 14.1148 1 13.3757V3.33832ZM6.35563 3.33832H2.33364V13.3757H14.3364V5.34579H8.335C8.1371 5.34579 7.94943 5.25758 7.82274 5.10502L6.35563 3.33832Z"
      />
    </SvgIcon>
  );
};

export default FolderIcon;
