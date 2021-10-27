import { MockCooperative } from 'models';

import format from 'date-fns/format';
import { DEFAULT_FORMAT_PATTERN } from 'utils';

import CheckboxControl from 'components/CheckboxControl';
import MenuItem from '@mui/material/MenuItem';

import clsx from 'clsx';
import { useStyles } from './style';

export interface CooperativesListItemProps {
  cooperative: MockCooperative;
  selected: boolean;
  onClick(cooperative: MockCooperative, isSelected: boolean): void;
}

const CooperativesListItem: React.FC<CooperativesListItemProps> = ({
  cooperative,
  selected,
  onClick,
}) => {
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
      <CheckboxControl
        checked={selected}
        label={cooperative.Name}
        tabIndex={-1}
      />
      {cooperative.ClosedPeriodEndDate ? (
        <span className={classes.closedPeriodEndDate}>
          {format(
            new Date(cooperative.ClosedPeriodEndDate),
            DEFAULT_FORMAT_PATTERN
          )}
        </span>
      ) : null}
    </MenuItem>
  );
};

export default CooperativesListItem;
