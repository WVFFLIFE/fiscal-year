import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const RoundWarningIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 48 49',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M25.8759 13.5173C25.727 12.4191 24.7856 11.5726 23.6465 11.5726C22.4038 11.5726 21.3965 12.58 21.3965 13.8226V25.9995L21.417 26.3048C21.566 27.4031 22.5074 28.2495 23.6465 28.2495C24.8891 28.2495 25.8965 27.2422 25.8965 25.9995V13.8226L25.8759 13.5173ZM23.9999 35.4375C25.2425 35.4375 26.2499 34.4301 26.2499 33.1875C26.2499 31.9448 25.2425 30.9375 23.9999 30.9375C22.7573 30.9375 21.7499 31.9448 21.7499 33.1875C21.7499 34.4301 22.7573 35.4375 23.9999 35.4375Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M48 24.9375C48 11.6827 37.2548 0.9375 24 0.9375C10.7452 0.9375 0 11.6827 0 24.9375C0 38.1923 10.7452 48.9375 24 48.9375C37.2548 48.9375 48 38.1923 48 24.9375ZM4.5 24.9375C4.5 14.1679 13.2304 5.4375 24 5.4375C34.7696 5.4375 43.5 14.1679 43.5 24.9375C43.5 35.7071 34.7696 44.4375 24 44.4375C13.2304 44.4375 4.5 35.7071 4.5 24.9375Z"
      />
    </SvgIcon>
  );
};

export default RoundWarningIcon;
