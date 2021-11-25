import {
  memo,
  useState,
  useRef,
  useEffect,
  useCallback,
  ChangeEvent,
  useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { CommonCooperativeModel } from 'models';
import _orderBy from 'lodash/orderBy';
import _toLower from 'lodash/toLower';
import { filterBySearchTerm } from 'utils';

import Picker from 'components/controls/Picker';
import PickerSearch from 'components/controls/PickerSearch';
import Button from 'components/Button';
import CheckboxControl from 'components/CheckboxControl';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import CooperativesList from './CooperativesList';
import { Box } from '@mui/material';
import { ApplyButton, CancelButton } from 'components/Styled';
import { CloseIcon } from 'components/Icons';

import { useStyles, useBodyStyles } from './style';

function sortCooperatives<T extends CommonCooperativeModel>(coops: T[]) {
  return _orderBy(coops, (coop) => _toLower(coop.Name), 'asc');
}

const quickFilterOptions: QuickFilterOption[] = [
  {
    id: 'myOwn',
    label: '#control.quickfilter.myown',
  },
  {
    id: 'pmCompany',
    label: '#control.quickfilter.pmcompany',
  },
];

interface CooperativesPickerProps<T extends CommonCooperativeModel> {
  multiple?: boolean;
  cooperatives: T[];
  selectedCooperatives: T[];
  onSelectCooperatives(cooperatives: T[]): void;
}

interface BodyProps<T extends CommonCooperativeModel>
  extends CooperativesPickerProps<T> {
  onClosePicker(): void;
}

const Body = <T extends CommonCooperativeModel>({
  multiple = false,
  cooperatives,
  onSelectCooperatives,
  selectedCooperatives,
  onClosePicker,
}: BodyProps<T>) => {
  const classes = useBodyStyles();
  const { t } = useTranslation();

  const searchRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState('myOwn');
  const [currentCooperative, setCurrentCooperative] =
    useState<T[]>(selectedCooperatives);

  const selectedAll =
    !!cooperatives.length && cooperatives.length === currentCooperative.length;

  const focusSearchField = () => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  };

  /**
   * Reset selected cooperatives
   * while searching or filtering
   * if it's not the first render
   */
  useEffect(() => {
    focusSearchField();
  }, [activeQuickFilter]);

  const handleChangeSearchTerm = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    },
    []
  );

  const handleChangeQuickFilter = useCallback((newFilter: string) => {
    setActiveQuickFilter(newFilter);
  }, []);

  const handleClickItem = (currentCooperative: T, remove = true) => {
    if (multiple) {
      setCurrentCooperative((prevCoops) =>
        remove
          ? prevCoops.filter(
              (prevCoop) => prevCoop.Id !== currentCooperative.Id
            )
          : prevCoops.concat(currentCooperative)
      );
    } else {
      setCurrentCooperative(remove ? [] : [currentCooperative]);
    }
  };

  const handleSelectCooperatives = () => {
    onSelectCooperatives(currentCooperative);
    onClosePicker();
  };

  const handleToggleSelectAll = () => {
    setCurrentCooperative(currentCooperative.length ? [] : [...cooperatives]);
  };

  const resetFilters = () => {
    setCurrentCooperative([]);
    setSearchTerm('');
    setActiveQuickFilter('myOwn');
  };

  const groupedList = useMemo(() => {
    return selectedAll || !multiple
      ? sortCooperatives(cooperatives)
      : sortCooperatives([...currentCooperative]).concat(
          sortCooperatives(
            cooperatives.filter(
              (coop) =>
                !!!currentCooperative.find(
                  (currentCoop) => currentCoop.Id === coop.Id
                )
            )
          )
        );
  }, [selectedAll, cooperatives, currentCooperative, multiple]);

  const filteredCooperativesByQuickFilter = useMemo(() => {
    return activeQuickFilter
      ? groupedList.filter((cooperative) => {
          return activeQuickFilter === 'myOwn'
            ? cooperative.IsOwn
            : cooperative.IsPMCompanyEmployee;
        })
      : groupedList;
  }, [groupedList, activeQuickFilter]);

  const filteredCooperativesBySearchTerm = useMemo(() => {
    return filteredCooperativesByQuickFilter.filter((cooperative) => {
      return filterBySearchTerm(cooperative.Name, searchTerm);
    });
  }, [filteredCooperativesByQuickFilter, searchTerm]);

  return (
    <div
      className={classes.wrapper}
      ref={rootRef}
      style={{ width: 'auto', minWidth: 350 }}
    >
      <PickerSearch
        ref={searchRef}
        className={classes.offset}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <QuickFilter
        className={classes.offset}
        options={quickFilterOptions}
        active={activeQuickFilter}
        onChange={handleChangeQuickFilter}
      />
      {multiple && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          marginBottom={3}
          paddingLeft="16px"
          paddingRight="16px"
        >
          <CheckboxControl
            checked={selectedAll}
            onChange={handleToggleSelectAll}
            label="Select All"
            indeterminate={!!currentCooperative.length && !selectedAll}
          />
          <Button
            onClick={resetFilters}
            className={classes.closeBtn}
            classes={{
              startIcon: classes.closeIcon,
            }}
            size="small"
            startIcon={<CloseIcon />}
            label={'Clear filters'}
          />
        </Box>
      )}
      <CooperativesList
        multiple={multiple}
        cooperatives={filteredCooperativesBySearchTerm}
        selected={currentCooperative}
        onClickItem={handleClickItem}
      />
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-end"
        marginTop="20px"
      >
        <CancelButton
          className={classes.cancelBtnOffsetRight}
          onClick={onClosePicker}
        >
          {t('#button.cancel')}
        </CancelButton>
        <ApplyButton onClick={handleSelectCooperatives}>
          {t('#button.apply')}
        </ApplyButton>
      </Box>
    </div>
  );
};

function isAllMyOwn(
  cooperatives: CommonCooperativeModel[],
  selectedCooperatives: CommonCooperativeModel[]
) {
  const allMyOwnCoops = cooperatives.filter((coop) => coop.IsOwn);
  return allMyOwnCoops.every(
    (coop) =>
      !!selectedCooperatives.find((selectedCoop) => selectedCoop.Id === coop.Id)
  );
}

const CooperativesPicker = <T extends CommonCooperativeModel>({
  multiple = false,
  cooperatives,
  onSelectCooperatives,
  selectedCooperatives,
}: CooperativesPickerProps<T>) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderValue = () => {
    if (!selectedCooperatives.length) return null;

    if (selectedCooperatives.length === 1) {
      const [coop] = selectedCooperatives;
      return coop.Name;
    }

    if (isAllMyOwn(cooperatives, selectedCooperatives)) {
      return 'All my own cooperatives selected';
    }

    return `${selectedCooperatives.length} cooperatives selected`;
  };

  const renderBody = (onClosePicker: () => void) => (
    <Body
      multiple={multiple}
      cooperatives={cooperatives}
      selectedCooperatives={selectedCooperatives}
      onSelectCooperatives={onSelectCooperatives}
      onClosePicker={onClosePicker}
    />
  );

  return (
    <Picker
      className={classes.picker}
      placeholder={`- ${t('#control.cooperativepicker.placeholder')} -`}
      renderValue={renderValue}
      renderBody={renderBody}
    />
  );
};

export default memo(CooperativesPicker);
