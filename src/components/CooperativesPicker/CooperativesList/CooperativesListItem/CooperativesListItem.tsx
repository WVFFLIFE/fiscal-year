import { BaseCooperativeModel } from 'models';

import format from 'date-fns/format';
import { DEFAULT_FORMAT_PATTERN } from 'utils';

import CheckboxControl from 'components/CheckboxControl';
import MenuItem from '@mui/material/MenuItem';

import clsx from 'clsx';
import { useStyles } from './style';

export interface CooperativesListItemProps<T extends BaseCooperativeModel> {
  multiple: boolean;
  cooperative: T;
  selected: boolean;
  onClick(cooperative: T, isSelected: boolean): void;
}

const CooperativesListItem = <T extends BaseCooperativeModel>({
  multiple,
  cooperative,
  selected,
  onClick,
}: CooperativesListItemProps<T>) => {
  const classes = useStyles();

  return (
    <MenuItem
      key={cooperative.Id}
      selected={selected}
      className={clsx(classes.cooperativeItem, classes.text)}
      classes={{
        selected: classes.selected,
      }}
      onMouseUp={() => onClick(cooperative, selected)}
      data-testid="cooperative-item"
    >
      {multiple ? (
        <CheckboxControl
          checked={selected}
          label={cooperative.Name}
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
