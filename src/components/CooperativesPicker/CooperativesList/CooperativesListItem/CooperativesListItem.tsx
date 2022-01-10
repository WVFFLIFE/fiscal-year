import { CSSProperties, useEffect } from 'react';
import { CommonCooperativeModel } from 'models';

import format from 'date-fns/format';
import { DEFAULT_FORMAT_PATTERN } from 'utils';

import CheckboxControl from 'components/CheckboxControl';
import MenuItem from '@mui/material/MenuItem';

import clsx from 'clsx';
import { useStyles } from './style';

export interface CooperativesListItemProps<T extends CommonCooperativeModel> {
  disabled?: boolean;
  multiple: boolean;
  cooperative: T;
  selected: boolean;
  onClick(cooperative: T, isSelected: boolean): void;
  style?: CSSProperties;
  measure?: () => void;
}

const CooperativesListItem = <T extends CommonCooperativeModel>({
  disabled,
  multiple,
  cooperative,
  selected,
  onClick,
  style,
  measure,
}: CooperativesListItemProps<T>) => {
  const classes = useStyles();

  useEffect(() => {
    if (measure) {
      measure();
    }
  }, [measure]);

  const isDisabled = !selected && disabled;

  return (
    <MenuItem
      key={cooperative.Id}
      selected={selected}
      className={clsx(classes.cooperativeItem, classes.text)}
      classes={{
        selected: classes.selected,
      }}
      onMouseUp={() => onClick(cooperative, selected)}
      disabled={isDisabled}
      data-testid="cooperative-item"
      style={style}
      component="div"
    >
      {multiple ? (
        <CheckboxControl
          disabled={isDisabled}
          checked={selected}
          label={cooperative.Name}
          classes={{ label: classes.checkboxLabel }}
          tabIndex={-1}
        />
      ) : (
        <span>{cooperative.Name}</span>
      )}
      {cooperative.LatestClosedDate ? (
        <span className={classes.closedPeriodEndDate}>
          {format(
            new Date(cooperative.LatestClosedDate),
            DEFAULT_FORMAT_PATTERN
          )}
        </span>
      ) : null}
    </MenuItem>
  );
};

export default CooperativesListItem;
