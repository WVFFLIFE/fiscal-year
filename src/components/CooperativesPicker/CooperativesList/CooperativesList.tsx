import { MockCooperative } from 'models';

import format from 'date-fns/format';
import { DEFAULT_FORMAT_PATTERN } from 'utils';

import { MenuList, MenuItem } from '@mui/material';
import CheckboxControl from 'components/CheckboxControl';

import clsx from 'clsx';
import { useStyles } from './style';

interface CooperativesListProps {
  cooperatives: MockCooperative[];
  selected: MockCooperative[];
  onClickItem(cooperative: MockCooperative, selected: boolean): void;
}

const CooperativesList: React.FC<CooperativesListProps> = ({
  cooperatives,
  selected,
  onClickItem,
}) => {
  const classes = useStyles();

  return (
    <MenuList className={classes.menuList}>
      {cooperatives.map((cooperative) => {
        const isSelected = selected.some(
          (currentCooperative) => currentCooperative.Id === cooperative.Id
        );

        return (
          <MenuItem
            key={cooperative.Id}
            selected={isSelected}
            className={clsx(classes.cooperativeItem, classes.text)}
            classes={{
              selected: classes.selected,
            }}
            onClick={() => onClickItem(cooperative, isSelected)}
          >
            <CheckboxControl
              checked={isSelected}
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
      })}
    </MenuList>
  );
};

export default CooperativesList;
