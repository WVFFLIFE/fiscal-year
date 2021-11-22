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
  const firstRender = useRef(true);

  const [bodyWidth, setBodyWidth] = useState<string | number>('auto');

  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState('myOwn');
  const [currentCooperative, setCurrentCooperative] =
    useState<T[]>(selectedCooperatives);

  /**
   * Focus search field when dropdown is opened
   */
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, []);

  /**
   * Set root width for avoiding its jumping
   * while searching or filtering
   */
  useEffect(() => {
    if (rootRef.current) {
      setBodyWidth(rootRef.current.offsetWidth);
    }
  }, []);

  /**
   * Reset selected cooperatives
   * while searching or filtering
   * if it's not the first render
   */
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    setCurrentCooperative([]);
  }, [searchTerm, activeQuickFilter]);

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

  const handleToggleSelectAll = (
    e: ChangeEvent<HTMLInputElement>,
    cooperatives: T[]
  ) => {
    const { checked } = e.target;

    setCurrentCooperative(checked ? cooperatives : []);
  };

  const filteredCooperativesByQuickFilter = useMemo(() => {
    return activeQuickFilter
      ? cooperatives.filter((cooperative) => {
          return activeQuickFilter === 'myOwn'
            ? cooperative.IsOwn
            : cooperative.IsPMCompanyEmployee;
        })
      : cooperatives;
  }, [cooperatives, activeQuickFilter]);

  const filteredCooperativesBySearchTerm = useMemo(() => {
    return filteredCooperativesByQuickFilter.filter((cooperative) => {
      return filterBySearchTerm(cooperative.Name, searchTerm);
    });
  }, [filteredCooperativesByQuickFilter, searchTerm]);

  const cooperativesList = useMemo(() => {
    return _orderBy(
      filteredCooperativesBySearchTerm,
      (coop) => coop.Name.toLowerCase(),
      'asc'
    );
  }, [filteredCooperativesBySearchTerm]);

  const selectedAll = cooperativesList.length === currentCooperative.length;

  return (
    <div
      className={classes.wrapper}
      ref={rootRef}
      style={{ width: bodyWidth, minWidth: 350 }}
    >
      <PickerSearch
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
            onChange={(e) => handleToggleSelectAll(e, cooperativesList)}
            label="Select All"
          />
          <Button
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
        cooperatives={cooperativesList}
        selected={currentCooperative}
        onClickItem={handleClickItem}
      />
      <Box display="flex" alignItems="center" justifyContent="flex-end">
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

function isAllMyOwn(cooperatives: CommonCooperativeModel[]) {
  return cooperatives.every((coop) => coop.IsOwn);
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

    if (isAllMyOwn(selectedCooperatives)) {
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
