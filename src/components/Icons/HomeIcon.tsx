import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const HomeIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 16 18',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path d="M8.53245 0.413408C8.78457 0.212547 9.13233 0.197601 9.39817 0.364475L9.49368 0.435568L17.4937 7.43557C17.9874 7.8676 17.7239 8.66076 17.106 8.74305L16.9998 8.75H15.2818L15.282 15C15.282 15.3797 14.9998 15.6935 14.6338 15.7432L14.532 15.75H3.64646C3.26676 15.75 2.95297 15.4678 2.9033 15.1018L2.89646 15V9.10405C2.89646 8.68984 3.23224 8.35405 3.64646 8.35405C4.02615 8.35405 4.33995 8.63621 4.38961 9.00228L4.39646 9.10405L4.3958 14.25H13.7818L13.782 8C13.782 7.62031 14.0641 7.30651 14.4302 7.25685L14.532 7.25H15.0038L8.9768 1.976L1.93612 7.58659C1.64161 7.82124 1.22486 7.79844 0.957606 7.54896L0.882185 7.46734C0.647544 7.17283 0.670337 6.75608 0.919822 6.48883L1.00144 6.41341L8.53245 0.413408Z" />
    </SvgIcon>
  );
};

export default HomeIcon;