import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
  ChangeEvent,
} from 'react';

import { CommonCooperativeModel } from 'models';

import { filterBySearchTerm } from 'utils';
import _orderBy from 'lodash/orderBy';
import _toLower from 'lodash/toLower';

const useDefault = (cooperatives: CommonCooperativeModel[]) => {
  const searchRef = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuickFilter, setActiveQuickFilter] = useState<null | string>(
    'myOwn'
  );

  const handleChangeSearchTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSearchTerm(value);
    },
    []
  );

  const handleChangeQuickFilter = useCallback((newFilter: string) => {
    setActiveQuickFilter(newFilter);
  }, []);

  const handleResetDefaultFilters = useCallback(() => {
    setActiveQuickFilter('myOwn');
    setSearchTerm('');
  }, []);

  const filteredCooperativesByQuickFilter = useMemo(() => {
    return activeQuickFilter
      ? cooperatives.filter((cooperative) => {
          return activeQuickFilter === 'myOwn'
            ? cooperative.IsOwn
            : activeQuickFilter === 'pmCompany'
            ? cooperative.IsPMCompanyEmployee
            : true;
        })
      : cooperatives;
  }, [cooperatives, activeQuickFilter]);

  const filteredCooperativesBySearchTerm = useMemo(() => {
    return filteredCooperativesByQuickFilter.filter(({ Name }) =>
      filterBySearchTerm(Name, searchTerm)
    );
  }, [filteredCooperativesByQuickFilter, searchTerm]);

  const sortedCooperatives = useMemo(() => {
    return _orderBy(
      filteredCooperativesBySearchTerm,
      (cooperative) => _toLower(cooperative.Name),
      'asc'
    );
  }, [filteredCooperativesBySearchTerm]);

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [activeQuickFilter]);

  return {
    searchRef,
    filteredCooperatives: sortedCooperatives,
    searchTerm,
    activeQuickFilter,
    handleChangeSearchTerm,
    handleChangeQuickFilter,
    handleResetDefaultFilters,
  };
};

export default useDefault;
