import _get from 'lodash/get';
import _orderBy from 'lodash/orderBy';

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

function sort<T extends {}>(list: T[], sortParams: SortModel) {
  const { order, orderBy, type } = sortParams;
  return _orderBy(list, (item) => prepareData(item, orderBy, type), order);
}

export default sort;
