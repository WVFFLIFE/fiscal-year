import { useCallback } from 'react';
import useDefault from '../useDefault';

import { CommonCooperativeModel } from 'models';

import { quickFilterOptions } from '../common';

import PickerSearch from 'components/controls/PickerSearch';
import QuickFilter from 'components/QuickFilter';
import CooperativesList from '../CooperativesList';

import { useBodyStyles } from '../style';

interface SingleViewProps {
  cooperatives: CommonCooperativeModel[];
  selectedCooperatives: CommonCooperativeModel[];
  onClose: () => void;
  onSelect: (cooperatives: CommonCooperativeModel[]) => void;
}

const SingleView: React.FC<SingleViewProps> = (props) => {
  const { cooperatives, selectedCooperatives, onSelect, onClose } = props;

  const classes = useBodyStyles();

  const {
    searchRef,
    activeQuickFilter,
    filteredCooperatives,
    handleChangeQuickFilter,
    handleChangeSearchTerm,
    searchTerm,
  } = useDefault(cooperatives);

  const handleClickItem = useCallback((cooperative: CommonCooperativeModel) => {
    onSelect([cooperative]);
    onClose();
  }, []);

  return (
    <>
      <PickerSearch
        autoFocus
        ref={searchRef}
        className={classes.offset}
        value={searchTerm}
        onChange={handleChangeSearchTerm}
      />
      <QuickFilter
        className={classes.offset}
        active={activeQuickFilter}
        options={quickFilterOptions}
        onChange={handleChangeQuickFilter}
      />
      <CooperativesList
        className={classes.list}
        cooperatives={filteredCooperatives}
        selected={selectedCooperatives}
        onClickItem={handleClickItem}
      />
    </>
  );
};

export default SingleView;
