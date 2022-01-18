import { Fragment, JSXElementConstructor } from 'react';
import { DraftInlineStyle } from 'draft-js';

import { SvgIconProps } from '@mui/material/SvgIcon';
import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

export interface Control {
  icon: JSXElementConstructor<SvgIconProps>;
  style: string;
  type: 'block' | 'inline';
  divider?: boolean;
  offset?: boolean;
}

interface ControlsPanelProps {
  className?: string;
  controls: Control[];
  currentCharactersLength: number;
  isLimitExceeded: boolean;
  maxCharactersLength?: number;
  currentInlineStyle: DraftInlineStyle;
  onToggleInlineStyle(style: string): void;
  onToggleBlockType(type: string): void;
}

const ControlsPanel: React.FC<ControlsPanelProps> = ({
  className,
  controls,
  currentCharactersLength,
  currentInlineStyle,
  isLimitExceeded,
  maxCharactersLength,
  onToggleInlineStyle,
  onToggleBlockType,
}) => {
  const classes = useStyles();

  const showCharactersControl = typeof maxCharactersLength === 'number';

  return (
    <div className={clsx(classes.root, className)}>
      <div className={classes.panel}>
        {controls.map(
          ({ icon: Icon, style, type, divider = false, offset = true }) => {
            const active = currentInlineStyle.has(style);
            const handler =
              type === 'block' ? onToggleBlockType : onToggleInlineStyle;

            return (
              <Fragment key={style}>
                <Button
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
              </Fragment>
            );
          }
        )}
      </div>
      {showCharactersControl && (
        <div className={clsx(classes.panel, classes.counterDescription)}>
          <span className={classes.counterCharacters}>
            <span
              className={clsx({
                [classes.limitExceeded]: isLimitExceeded,
              })}
            >
              {currentCharactersLength}
            </span>

            {'/'}
            {maxCharactersLength}
          </span>
        </div>
      )}
    </div>
  );
};

export default ControlsPanel;
