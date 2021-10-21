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
  disabled?: boolean;
  fiscalYears: FiscalYearModel[];
  selectedFiscalYear: FiscalYearModel | null;
  onSelectFiscalYear(fiscalYear: FiscalYearModel | null): void;
}

interface BodyProps extends FiscalYearProps {
  onClosePicker(): void;
}

const Body: React.FC<BodyProps> = ({
  fiscalYears,
  selectedFiscalYear,
  onSelectFiscalYear,
  onClosePicker,
}) => {
  const classes = useBodyStyles();
  const { t } = useTranslation();

  const searchRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [currentFiscalYear, setCurrentFiscalYear] =
    useState<FiscalYearModel | null>(selectedFiscalYear);

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
    setCurrentFiscalYear(newFiscalYear);
  };

  const handleSelectFiscalYear = () => {
    onSelectFiscalYear(currentFiscalYear);
    onClosePicker();
  };

  const filteredList = useMemo(() => {
    return fiscalYears.filter((fiscalYear) => {
      return filterBySearchTerm(fiscalYear.Name, searchTerm);
    });
  }, [fiscalYears, searchTerm]);

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
          const isActive = fiscalYear.Id === currentFiscalYear?.Id;

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
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <CancelButton className={classes.cancelBtn} onClick={onClosePicker}>
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton onClick={handleSelectFiscalYear}>
          {t('#button.apply')}
        </ApplyButton>
      </Box>
    </div>
  );
};

const FiscalYearPicker: React.FC<FiscalYearProps> = ({
  disabled,
  fiscalYears,
  selectedFiscalYear,
  onSelectFiscalYear,
}) => {
  const { t } = useTranslation();

  const renderValue = () => selectedFiscalYear?.Name || null;
  const renderBody = (onClosePicker: () => void) => (
    <Body
      fiscalYears={fiscalYears}
      selectedFiscalYear={selectedFiscalYear}
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
