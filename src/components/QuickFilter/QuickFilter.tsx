import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

export interface QuickFilterOption {
  id: string;
  label: string;
}

export interface QuickFilterProps {
  className?: string;
  options: QuickFilterOption[];
  active: string;
  onChange(active: string): void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({
  className,
  options,
  active,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.root, className)}>
      {options.map((option) => {
        const isActive = option.id === active;

        return (
          <Button
            key={option.id}
            className={clsx(classes.item, {
              [classes.activeItem]: isActive,
            })}
            disabled={isActive}
            onClick={isActive ? undefined : () => onChange(option.id)}
          >
            <span className={classes.label}>{t(option.label)}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default memo(QuickFilter);
