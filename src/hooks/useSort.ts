import { useState, useCallback, useMemo } from 'react';

import _orderBy from 'lodash/orderBy';
import _get from 'lodash/get';

export type SortParamsType = 'alphanumeric' | 'date';

export interface SortModel<T extends { [key: string]: any } = {}> {
  order: 'asc' | 'desc';
  orderBy: keyof T | string | null;
  type: SortParamsType;
}

function prepareData<T extends {}, K extends keyof T>(
  item: T,
  key: K | string | null,
  type: SortParamsType
) {
  switch (type) {
    case 'alphanumeric':
      return key ? _get(item, key) : null;
    case 'date':
      return key && _get(item, key)
        ? new Date(_get(item, key)).getTime()
        : null;
    default:
      return null;
  }
}

const useSort = <T extends { [key: string]: any }>(
  list: T[],
  params?: Partial<SortModel<T>>
) => {
  const [sortParams, setSortParams] = useState<SortModel<T>>(() => ({
    order: params?.order || 'asc',
    orderBy: params?.orderBy || null,
    type: params?.type || 'alphanumeric',
  }));

  const onChangeSortParams = useCallback(
    (id: keyof T | string, type: SortParamsType = 'alphanumeric') => {
      setSortParams((prevState) => ({
        ...prevState,
        orderBy: id,
        order:
          prevState.orderBy === id
            ? prevState.order === 'asc'
              ? 'desc'
              : 'asc'
            : 'asc',
        type,
      }));
    },
    []
  );

  const sortedList = useMemo(() => {
    const { order, orderBy, type } = sortParams;

    if (!orderBy) return list;

    return _orderBy(list, (item) => prepareData(item, orderBy, type), order);
  }, [list, sortParams]);

  return { list: params ? sortedList : list, sortParams, onChangeSortParams };
};

export default useSort;
