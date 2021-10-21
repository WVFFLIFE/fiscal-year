import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';

const SortArrows: React.FC<SvgIconProps> = ({
  viewBox = '0 0 10 11',
  ...rest
}) => {
  return (
    <SvgIcon {...rest} viewBox={viewBox}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.42873 4.92324L5.30018 2.73209L3.17171 4.92326L2.5 4.27071L5.30017 1.3877L8.10054 4.27072L7.42873 4.92324ZM5.30018 8.74416L7.42873 6.55302L8.10054 7.20553L5.30017 10.0886L2.5 7.20555L3.17171 6.553L5.30018 8.74416Z"
      />
    </SvgIcon>
  );
};

export default SortArrows;
