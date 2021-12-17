import { ColumnDataType } from 'models/TableModel';

import { dateTimeFormat, defaultFormat } from 'utils/dates';
import { toIntFormat } from 'utils';

export function renderAs(data: any, type: ColumnDataType = 'string') {
  if (!data) return null;
  switch (type) {
    case 'string':
      return typeof data === 'string' ? data : String(data);
    case 'date':
      return typeof data === 'string' ? defaultFormat(new Date(data)) : null;
    case 'datetime':
      return typeof data === 'string' ? dateTimeFormat(new Date(data)) : null;
    case 'int':
      return data ? toIntFormat(data) : null;
    default:
      return null;
  }
}
