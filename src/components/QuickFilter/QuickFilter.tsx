import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Button from '@mui/material/Button';

import clsx from 'clsx';
import { useStyles } from './style';

export interface QuickFilterOption {
  id: string;
  label: string;
  disabled?: boolean;
}

export interface QuickFilterProps {
  className?: string;
  itemClassName?: string;
  options: QuickFilterOption[];
  active: string | null;
  disabled?: boolean;
  onChange(active: string): void;
}

const QuickFilter: React.FC<QuickFilterProps> = ({
  className,
  itemClassName,
  options,
  disabled = false,
  active,
  onChange,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <div className={clsx(classes.root, className)}>
      {options.map((option) => {
        const isActive = option.id === active;
        const disabledOption = option.disabled || disabled;

        return (
          <Button
            key={option.id}
            className={clsx(classes.item, itemClassName, {
              [classes.activeItem]: isActive,
            })}
            disabled={disabledOption}
            onClick={disabledOption ? undefined : () => onChange(option.id)}
          >
            <span className={classes.label}>{t(option.label)}</span>
          </Button>
        );
      })}
    </div>
  );
};

export default memo(QuickFilter);
