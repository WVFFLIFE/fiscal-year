import { MockCooperative } from 'models';

import MenuList from '@mui/material/MenuList';
import CooperativesListItem from './CooperativesListItem';

import { useStyles } from './style';

export interface CooperativesListProps {
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
          <CooperativesListItem
            key={cooperative.Id}
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
