import { DraftInlineStyle } from 'draft-js';

import { SvgIconProps } from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

export interface Control {
  icon: React.JSXElementConstructor<SvgIconProps>;
  style: string;
  type: 'block' | 'inline';
  divider?: boolean;
  offset?: boolean;
}

interface ControlsPanelProps {
  controls: Control[];
  currentInlineStyle: DraftInlineStyle;
  onToggleInlineStyle(style: string): void;
  onToggleBlockType(type: string): void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  controls,
  currentInlineStyle,
  onToggleInlineStyle,
  onToggleBlockType,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {controls.map(
        ({ icon: Icon, style, type, divider = false, offset = true }) => {
          const active = currentInlineStyle.has(style);
          const handler =
            type === 'block' ? onToggleBlockType : onToggleInlineStyle;

          return (
            <>
              <Button
                key={style}
                className={clsx(classes.btn, {
                  [classes.activeBtn]: active,
                  [classes.btnOffset]: offset,
                })}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handler(style);
                }}
              >
                <Icon className={classes.icon} />
              </Button>
              {divider && <span className={classes.divider}></span>}
            </>
          );
        }
      )}
    </div>
  );
};

export default ControlsPanel;
