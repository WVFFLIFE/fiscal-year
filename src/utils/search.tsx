import _toLower from 'lodash/toLower';
import _get from 'lodash/get';
import _includes from 'lodash/includes';
import { defaultFormat } from './dates';

function convertByType(data: any, type: 'string' | 'date') {
  switch (type) {
    case 'string':
      return data as string;
    case 'date':
      return data ? defaultFormat(new Date(data)) : 'No Date';
    default:
      return null;
  }
}

export interface AccessorModel<T extends {} = {}> {
  accessor: keyof T | ((el: T) => string | keyof T | null);
  type: 'string' | 'date';
}

export function search<T extends {}>(
  list: T[],
  accessorsList: AccessorModel<T>[],
  searchTerm: string
) {
  if (!searchTerm) return list;
  return list.filter((item) => {
    return accessorsList.some((accessorItem) => {
      const key =
        typeof accessorItem.accessor === 'function'
          ? accessorItem.accessor(item)
          : accessorItem.accessor;

      if (!key) return false;
      let data = convertByType(_get(item, key), accessorItem.type);
      if (!data) return false;
      return _includes(_toLower(data), _toLower(searchTerm));
    });
  });
}

export function getText(searchTerm: string) {
  return (input: any) => {
    if (typeof input !== 'string') {
      return input;
    }

    let index = _toLower(input).indexOf(_toLower(searchTerm));
    if (!searchTerm || index === -1) {
      return input;
    }

    let substr = input.substr(index, searchTerm.length);

    return (
      <>
        {input.slice(0, index)}
        <span className="highlighted">{substr}</span>
        {input.slice(index + substr.length)}
      </>
    );
  };
}
