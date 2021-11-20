import {
  memo,
  useState,
  useRef,
  useMemo,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FiscalYearModel } from 'models';
import { filterBySearchTerm } from 'utils';

import { ApplyButton, CancelButton } from 'components/Styled';
import Picker from 'components/controls/Picker';
import PickerSearch from 'components/controls/PickerSearch';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

import { useBodyStyles } from './style';

interface FiscalYearProps {
  multiple?: boolean;
  disabled?: boolean;
  options: FiscalYearModel[];
  value: FiscalYearModel | null;
  onSelectFiscalYear(fiscalYear: FiscalYearModel | null): void;
}

interface BodyProps extends FiscalYearProps {
  onClosePicker(): void;
}

const Body: React.FC<BodyProps> = ({
  options,
  value,
  onSelectFiscalYear,
  onClosePicker,
}) => {
  const classes = useBodyStyles();
  const { t } = useTranslation();

  const searchRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');

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

  const handleClickMenuItem = (newFiscalYear: FiscalYearModel) => {
    onSelectFiscalYear(newFiscalYear);
    onClosePicker();
  };

  const filteredList = useMemo(() => {
    return options.filter((fiscalYear) => {
      return filterBySearchTerm(fiscalYear.Name, searchTerm);
    });
  }, [options, searchTerm]);

  return (
    <div className={classes.wrapper}>
      <PickerSearch
        className={classes.pickerSearch}
        ref={searchRef}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <MenuList className={classes.menuList}>
        {filteredList.map((fiscalYear) => {
          const isActive = fiscalYear.Id === value?.Id;

          return (
            <MenuItem
              key={fiscalYear.Id}
              className={classes.fiscalYearItem}
              selected={isActive}
              onClick={
                isActive ? undefined : () => handleClickMenuItem(fiscalYear)
              }
              classes={{
                selected: classes.selected,
              }}
            >
              {fiscalYear.Name}
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
};

const FiscalYearPicker: React.FC<FiscalYearProps> = ({
  disabled,
  options,
  value,
  onSelectFiscalYear,
}) => {
  const { t } = useTranslation();

  const renderValue = () => value?.Name || null;
  const renderBody = (onClosePicker: () => void) => (
    <Body
      options={options}
      value={value}
      onSelectFiscalYear={onSelectFiscalYear}
      onClosePicker={onClosePicker}
    />
  );

  return (
    <Picker
      disabled={disabled}
      placeholder={`- ${t('#control.fiscalyearpicker.placeholder')} -`}
      renderValue={renderValue}
      renderBody={renderBody}
    />
  );
};

export default memo(FiscalYearPicker);
