import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const LockIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox} style={{ fill: 'none' }}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.5625 8.24122C6.89876 8.06831 7.125 7.74514 7.125 7.375C7.125 6.82272 6.62132 6.375 6 6.375C5.37868 6.375 4.875 6.82272 4.875 7.375C4.875 7.74514 5.10124 8.06831 5.4375 8.24122V8.8125C5.4375 9.12316 5.68934 9.375 6 9.375C6.31066 9.375 6.5625 9.12316 6.5625 8.8125V8.24122Z"
        fill="currentColor"
      />
      <rect
        x="2.16667"
        y="4.41667"
        width="7.66667"
        height="6.91667"
        rx="0.666667"
        stroke="currentColor"
        strokeWidth="1.33333"
      />
      <path
        d="M3.66667 3C3.66667 1.71134 4.71134 0.666667 6 0.666667C7.28866 0.666667 8.33333 1.71134 8.33333 3V4.00643C8.33333 4.04055 8.30567 4.0682 8.27156 4.0682H3.72844C3.69432 4.0682 3.66667 4.04055 3.66667 4.00643V3Z"
        stroke="currentColor"
        strokeWidth="1.33333"
      />
    </SvgIcon>
  );
};

export default LockIcon;
