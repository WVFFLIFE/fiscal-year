import MuiTooltip, {
  TooltipProps as MuiTooltipProps,
} from '@mui/material/Tooltip';

import { useStyles } from './style';

const Tooltip: React.FC<MuiTooltipProps> = ({
  placement = 'bottom-start',
  children,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <MuiTooltip
      classes={{
        arrow: classes.arrow,
        tooltip: classes.tooltip,
      }}
      placement={placement}
      {...rest}
    >
      {children}
    </MuiTooltip>
  );
};

export default Tooltip;