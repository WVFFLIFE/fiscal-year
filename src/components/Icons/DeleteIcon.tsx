import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const DeleteIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 12 12',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.375 3.375H3.375V10.125H9.375V3.375ZM2.25 2.25V10.5C2.25 10.9142 2.58579 11.25 3 11.25H9.75C10.1642 11.25 10.5 10.9142 10.5 10.5V2.25H2.25Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.875 2.25H4.875V1.125H7.875V2.25ZM3.75 3.375V0.75C3.75 0.335786 4.08579 0 4.5 0H8.25C8.66421 0 9 0.335786 9 0.75V3.375H3.75Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 4.65527C5.56066 4.65527 5.8125 4.90711 5.8125 5.21777V8.21777C5.8125 8.52843 5.56066 8.78027 5.25 8.78027C4.93934 8.78027 4.6875 8.52843 4.6875 8.21777V5.21777C4.6875 4.90711 4.93934 4.65527 5.25 4.65527Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.5 4.65527C7.81066 4.65527 8.0625 4.90711 8.0625 5.21777V8.21777C8.0625 8.52843 7.81066 8.78027 7.5 8.78027C7.18934 8.78027 6.9375 8.52843 6.9375 8.21777V5.21777C6.9375 4.90711 7.18934 4.65527 7.5 4.65527Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M1.3125 2.625C1.3125 2.31434 1.56434 2.0625 1.875 2.0625H10.875C11.1857 2.0625 11.4375 2.31434 11.4375 2.625C11.4375 2.93566 11.1857 3.1875 10.875 3.1875H1.875C1.56434 3.1875 1.3125 2.93566 1.3125 2.625Z"
      />
    </SvgIcon>
  );
};

export default DeleteIcon;
