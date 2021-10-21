import {
  memo,
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  ChangeEvent,
} from 'react';
import { BaseEntityModel } from 'models';

import { filterBySearchTerm } from 'utils';

import Picker from 'components/controls/Picker';
import PickerSearch from 'components/controls/PickerSearch';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

import { useStyles } from './style';

interface SubstitutePickerProps {
  substitutors: BaseEntityModel[];
  selectedSubsitute: BaseEntityModel | null;
  onSelectSubstitute(subsitute: BaseEntityModel | null): void;
}

interface BodyProps extends SubstitutePickerProps {
  onClosePicker(): void;
}

const quickFilterOptions: QuickFilterOption[] = [
  { id: 'substitutedPerson', label: 'Substituted Person' },
  { id: 'all', label: 'All' },
];

const Body: React.FC<BodyProps> = ({
  substitutors,
  selectedSubsitute,
  onSelectSubstitute,
  onClosePicker,
}) => {
  const classes = useStyles();
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] =
    useState('substitutedPerson');

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  const handleChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleChangeQuickFilter = useCallback((quickFilter: string) => {
    setActiveQuickFilter(quickFilter);
  }, []);

  const handleClickMenuItem = (currentSubstitute: BaseEntityModel) => {
    onSelectSubstitute(currentSubstitute);
    onClosePicker();
  };

  const filteredList = useMemo(() => {
    return substitutors.filter((substitute) => {
      return filterBySearchTerm(substitute.Name, searchTerm);
    });
  }, [substitutors, searchTerm]);

  return (
    <div className={classes.wrapper}>
      <PickerSearch
        className={classes.pickerSearch}
        ref={searchRef}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <QuickFilter
        className={classes.quickFilter}
        active={activeQuickFilter}
        options={quickFilterOptions}
        onChange={handleChangeQuickFilter}
      />
      <MenuList className={classes.menuList}>
        {filteredList.map((substitute) => {
          const isActive = substitute.Id === selectedSubsitute?.Id;

          return (
            <MenuItem
              key={substitute.Id}
              className={classes.substituteItem}
              selected={isActive}
              onClick={
                isActive ? undefined : () => handleClickMenuItem(substitute)
              }
              disabled={isActive}
              classes={{
                selected: classes.selected,
              }}
            >
              {substitute.Name}
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
};

const SubstitutePicker: React.FC<SubstitutePickerProps> = ({
  substitutors,
  selectedSubsitute,
  onSelectSubstitute,
}) => {
  const renderValue = () => selectedSubsitute?.Name || null;
  const renderBody = (onClosePicker: () => void) => (
    <Body
      substitutors={substitutors}
      selectedSubsitute={selectedSubsitute}
      onSelectSubstitute={onSelectSubstitute}
      onClosePicker={onClosePicker}
    />
  );

  return (
    <Picker
      placeholder="- Select Substitute -"
      renderValue={renderValue}
      renderBody={renderBody}
    />
  );
};

export default memo(SubstitutePicker);
