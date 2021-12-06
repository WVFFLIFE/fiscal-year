import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const UnlockIcon: React.FC<SvgIconProps> = ({
  viewBox = '0 0 16 16',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.75 10.9883C9.19835 10.7578 9.5 10.3269 9.5 9.83333C9.5 9.09695 8.82843 8.5 8 8.5C7.17157 8.5 6.5 9.09695 6.5 9.83333C6.5 10.3269 6.80165 10.7578 7.25 10.9883V11.8333C7.25 12.2015 7.54848 12.5 7.91667 12.5H8.08333C8.45152 12.5 8.75 12.2015 8.75 11.8333V10.9883Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.6667 6.33333H3.33333L3.33333 14.6667H12.6667V6.33333ZM3.33333 5C2.59695 5 2 5.59695 2 6.33333V14.6667C2 15.403 2.59695 16 3.33333 16H12.6667C13.403 16 14 15.403 14 14.6667V6.33333C14 5.59695 13.403 5 12.6667 5H3.33333Z"
      />
      <mask
        id="mask0_816_46614"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="4"
        y="0"
        width="8"
        height="7"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M10.6667 4.97983V4C10.6667 2.52724 9.47276 1.33333 8 1.33333C6.52724 1.33333 5.33333 2.52724 5.33333 4V4.97983H10.6667ZM8 0C5.79086 0 4 1.79086 4 4V5.34191C4 5.87831 4.43485 6.31316 4.97126 6.31316H11.0287C11.5652 6.31316 12 5.87831 12 5.3419V4C12 1.79086 10.2091 0 8 0Z"
        />
      </mask>
      <g mask="url(#mask0_816_46614)">
        <path d="M1.54309 2.74683L10.1999 -3.61425L13.3866 0.72257L4.72981 7.08364L1.54309 2.74683Z" />
      </g>
    </SvgIcon>
  );
};

export default UnlockIcon;
