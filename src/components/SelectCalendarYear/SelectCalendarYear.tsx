import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  ChangeEvent,
} from 'react';
import { useTranslation } from 'react-i18next';

import format from 'date-fns/format';
import isSameDay from 'date-fns/isSameDay';
import { DEFAULT_FORMAT_PATTERN, filterBySearchTerm } from 'utils';

import MenuList from '@mui/material/MenuList';
import MenuItem from '@mui/material/MenuItem';
import Picker from 'components/controls/Picker';
import PickerSearch from 'components/controls/PickerSearch';

import { useBodyStyles } from './style';

export interface CalendarYearOption {
  start: Date;
  end: Date;
}

interface SelectCalendarYearProps {
  onChange(val: CalendarYearOption): void;
  options: CalendarYearOption[];
  value: CalendarYearOption | null;
  disabled: boolean;
}

interface BodyProps extends SelectCalendarYearProps {
  onClose(): void;
}

const Body: React.FC<BodyProps> = ({ value, options, onChange, onClose }) => {
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

  const handleSelectCalendarYear = (option: {
    start: Date;
    end: Date;
    label: string;
  }) => {
    onChange({ start: option.start, end: option.end });
    onClose();
  };

  const filteredList = useMemo(() => {
    return options
      .map((option) => ({
        ...option,
        label: `${format(option.start, DEFAULT_FORMAT_PATTERN)} - ${format(
          option.end,
          DEFAULT_FORMAT_PATTERN
        )}`,
      }))
      .filter((option) => {
        return filterBySearchTerm(option.label, searchTerm);
      }, []);
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
        {filteredList.map((item) => {
          const isActive = !!(
            value &&
            isSameDay(item.start, value.start) &&
            isSameDay(item.end, value.end)
          );

          return (
            <MenuItem
              key={item.label}
              className={classes.fiscalYearItem}
              selected={isActive}
              onClick={
                isActive ? undefined : () => handleSelectCalendarYear(item)
              }
              classes={{
                selected: classes.selected,
              }}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </MenuList>
    </div>
  );
};

const SelectCalendarYear: React.FC<SelectCalendarYearProps> = ({
  value,
  options,
  onChange,
  disabled,
}) => {
  const { t } = useTranslation();

  const renderValue = () => {
    return (
      value &&
      `${format(value.start, DEFAULT_FORMAT_PATTERN)} - ${format(
        value.end,
        DEFAULT_FORMAT_PATTERN
      )}`
    );
  };

  const renderBody = (onClose: () => void) => (
    <Body
      disabled={disabled}
      value={value}
      options={options}
      onChange={onChange}
      onClose={onClose}
    />
  );

  return (
    <Picker
      disabled={disabled}
      placeholder={`- ${t('#control.calendaryearpicker.placeholder')} -`}
      renderValue={renderValue}
      renderBody={renderBody}
    />
  );
};

export default SelectCalendarYear;
