import { useState, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useDefault from '../useDefault';

import { CommonCooperativeModel } from 'models';

import { quickFilterOptions } from '../common';
import _uniqBy from 'lodash/uniqBy';

import PickerSearch from 'components/controls/PickerSearch';
import QuickFilter from 'components/QuickFilter';
import CooperativesList from '../CooperativesList';
import { BtnsWrapper } from 'components/Styled';
import CheckboxControl from 'components/CheckboxControl';
import ActionButton from 'components/ActionButton';
import CloseIcon from 'components/Icons/CloseIcon';

import { useBodyStyles, Hint } from '../style';
import { useStyles } from './style';

interface MultipleViewProps {
  cooperatives: CommonCooperativeModel[];
  selectedCooperatives: CommonCooperativeModel[];
  onClose: () => void;
  onSelect: (cooperatives: CommonCooperativeModel[]) => void;
}

const MultipleView: React.FC<MultipleViewProps> = (props) => {
  const commonClasses = useBodyStyles();
  const classes = useStyles();
  const { t } = useTranslation();

  const { cooperatives, selectedCooperatives, onClose, onSelect } = props;

  const [checkedCooperatives, setCheckedCooperatives] = useState([
    ...selectedCooperatives,
  ]);

  const {
    searchRef,
    activeQuickFilter,
    filteredCooperatives,
    handleChangeQuickFilter,
    handleChangeSearchTerm,
    handleResetDefaultFilters,
    searchTerm,
  } = useDefault(cooperatives);

  const handleClickItem = useCallback(
    (cooperative: CommonCooperativeModel, selected: boolean) => {
      setCheckedCooperatives((prevState) =>
        selected
          ? prevState.filter((prevCoop) => prevCoop.Id !== cooperative.Id)
          : prevState.concat(cooperative)
      );
    },
    []
  );

  const handleToggleSelectAll = useCallback(() => {
    setCheckedCooperatives((prevState) => {
      return prevState.length ? [] : [...filteredCooperatives];
    });
  }, [filteredCooperatives]);

  const liftedCooperatives = useMemo(() => {
    return _uniqBy(
      [...checkedCooperatives, ...filteredCooperatives],
      (cooperative) => cooperative.Id
    );
  }, [checkedCooperatives, filteredCooperatives]);

  const handleResetFilters = useCallback(() => {
    setCheckedCooperatives([]);
    handleResetDefaultFilters();
  }, [handleResetDefaultFilters]);

  const handleClickApplyBtn = useCallback(() => {
    onSelect(checkedCooperatives);
    onClose();
  }, [checkedCooperatives]);

  const selectedAll = useMemo(() => {
    return (
      !!cooperatives.length &&
      cooperatives.length === checkedCooperatives.length
    );
  }, [cooperatives, checkedCooperatives]);

  const isDisabledCooperativesList = useMemo(() => {
    return activeQuickFilter === 'all' && checkedCooperatives.length > 4;
  }, [activeQuickFilter, checkedCooperatives]);

  return (
    <>
      <PickerSearch
        autoFocus
        ref={searchRef}
        className={commonClasses.offset}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <QuickFilter
        className={commonClasses.offset}
        active={activeQuickFilter}
        options={quickFilterOptions}
        onChange={handleChangeQuickFilter}
      />
      <div className={commonClasses.controlsWrapper}>
        {activeQuickFilter === 'all' ? (
          <Hint>{t('#control.cooperativepicker.selectupto')}</Hint>
        ) : (
          <CheckboxControl
            checked={selectedAll}
            onChange={handleToggleSelectAll}
            label={t('#common.selectall')}
            indeterminate={!!checkedCooperatives.length && !selectedAll}
          />
        )}
        <ActionButton
          onClick={handleResetFilters}
          className={classes.closeBtn}
          classes={{
            startIcon: classes.closeIcon,
          }}
          size="small"
          startIcon={<CloseIcon />}
        >
          {t('#common.clearfilters')}
        </ActionButton>
      </div>
      <CooperativesList
        className={commonClasses.list}
        multiple
        disabled={isDisabledCooperativesList}
        cooperatives={liftedCooperatives}
        selected={checkedCooperatives}
        onClickItem={handleClickItem}
      />
      <BtnsWrapper>
        <ActionButton
          className={commonClasses.cancelBtnOffsetRight}
          onClick={onClose}
        >
          {t('#button.cancel')}
        </ActionButton>
        <ActionButton palette="darkBlue" onClick={handleClickApplyBtn}>
          {t('#button.apply')}
        </ActionButton>
      </BtnsWrapper>
    </>
  );
};

export default MultipleView;
