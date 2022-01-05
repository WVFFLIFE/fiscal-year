import {
  memo,
  useMemo,
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
} from 'react';
import { useTranslation } from 'react-i18next';
import { FiscalYearModel } from 'models';
import { filterBySearchTerm } from 'utils';
import { defaultFormat } from 'utils/dates';
import _orderBy from 'lodash/orderBy';

import Picker from 'components/controls/Picker';
import PickerSearch from 'components/controls/PickerSearch';
import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';

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

  const sortedList = useMemo(() => {
    return _orderBy(
      filteredList,
      (item) => (item.StartDate ? new Date(item.StartDate).getTime() : null),
      'desc'
    );
  }, [filteredList]);

  return (
    <div className={classes.wrapper}>
      <PickerSearch
        className={classes.pickerSearch}
        ref={searchRef}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <MenuList className={classes.menuList}>
        {sortedList.map((fiscalYear) => {
          const isActive = fiscalYear.Id === value?.Id;
          const start = defaultFormat(new Date(fiscalYear.StartDate));
          const end = defaultFormat(new Date(fiscalYear.EndDate));

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
              <span
                className={classes.label}
              >{`Tilikausi ${start} - ${end}`}</span>
              <span>{fiscalYear.IsClosed ? 'Closed' : 'Open'}</span>
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

  const renderValue = () => {
    if (!value) return null;
    const start = defaultFormat(new Date(value.StartDate));
    const end = defaultFormat(new Date(value.EndDate));

    return `Tilikausi ${start} - ${end}`;
  };
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
      disablePortal={true}
    />
  );
};

export default memo(FiscalYearPicker);
