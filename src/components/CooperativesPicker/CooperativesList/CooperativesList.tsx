import { CommonCooperativeModel } from 'models';

import MenuList from '@mui/material/MenuList';
import CooperativesListItem from './CooperativesListItem';

import { useStyles } from './style';

export interface CooperativesListProps<T extends CommonCooperativeModel> {
  multiple: boolean;
  cooperatives: T[];
  selected: T[];
  onClickItem(cooperative: T, selected: boolean): void;
}

const CooperativesList = <T extends CommonCooperativeModel>({
  multiple,
  cooperatives,
  selected,
  onClickItem,
}: CooperativesListProps<T>) => {
  const classes = useStyles();

  return (
    <MenuList className={classes.menuList}>
      {cooperatives.map((cooperative) => {
        const isSelected = selected.some(
          (currentCooperative) => currentCooperative.Id === cooperative.Id
        );

        return (
          <CooperativesListItem
            key={cooperative.Id}
            multiple={multiple}
            cooperative={cooperative}
            selected={isSelected}
            onClick={onClickItem}
          />
        );
      })}
    </MenuList>
  );
};

export default CooperativesList;
