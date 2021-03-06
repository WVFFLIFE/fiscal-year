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
import { MockCooperative } from 'models';
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
    id: 'all',
    label: '#control.quickfilter.all',
  },
];

interface CooperativesPickerProps {
  cooperatives: MockCooperative[];
  selectedCooperatives: MockCooperative[];
  onSelectCooperatives(cooperatives: MockCooperative[]): void;
}

interface BodyProps extends CooperativesPickerProps {
  onClosePicker(): void;
}

const Body: React.FC<BodyProps> = ({
  cooperatives,
  onSelectCooperatives,
  selectedCooperatives,
  onClosePicker,
}) => {
  const classes = useBodyStyles();
  const { t } = useTranslation();

  const searchRef = useRef<HTMLInputElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const [bodyWidth, setBodyWidth] = useState<string | number>('auto');

  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState('myOwn');
  const [currentCooperative, setCurrentCooperative] =
    useState<MockCooperative[]>(selectedCooperatives);

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

  const handleClickItem = (
    currentCooperative: MockCooperative,
    remove = true
  ) => {
    setCurrentCooperative((prevCoops) =>
      remove
        ? prevCoops.filter((prevCoop) => prevCoop.Id !== currentCooperative.Id)
        : prevCoops.concat(currentCooperative)
    );
  };

  const handleSelectCooperatives = () => {
    onSelectCooperatives(currentCooperative);
    onClosePicker();
  };

  const handleToggleSelectAll = (
    e: ChangeEvent<HTMLInputElement>,
    cooperatives: MockCooperative[]
  ) => {
    const { checked } = e.target;

    setCurrentCooperative(checked ? cooperatives : []);
  };

  const filteredCooperativesBySearchTerm = useMemo(() => {
    return cooperatives.filter((cooperative) => {
      return filterBySearchTerm(cooperative.Name, searchTerm);
    });
  }, [cooperatives, searchTerm]);

  const cooperativesList = useMemo(() => {
    return _orderBy(
      filteredCooperativesBySearchTerm,
      (coop) => coop.Name.toLowerCase(),
      'asc'
    );
  }, [filteredCooperativesBySearchTerm]);

  const selectedAll = cooperativesList.length === currentCooperative.length;

  return (
    <div className={classes.wrapper} ref={rootRef} style={{ width: bodyWidth }}>
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
      <CooperativesList
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

const CooperativesPicker: React.FC<CooperativesPickerProps> = ({
  cooperatives,
  onSelectCooperatives,
  selectedCooperatives,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();

  const renderValue = () => {
    if (!selectedCooperatives.length) return null;

    if (selectedCooperatives.length === 1) {
      const [coop] = selectedCooperatives;
      return coop.Name;
    }

    if (selectedCooperatives.length === cooperatives.length) {
      return 'All my own cooperatives selected';
    }

    return `${selectedCooperatives.length} cooperatives selected`;
  };

  const renderBody = (onClosePicker: () => void) => (
    <Body
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
