import { RenderDataType } from 'models/TableModel';

import { dateTimeFormat, defaultFormat } from 'utils/dates';
import { toIntFormat, toNumberFormat } from 'utils';

export default function renderAs(data: any, type: RenderDataType = 'string') {
  if (!data) return null;
  switch (type) {
    case 'string':
      return typeof data === 'string' ? data : String(data);
    case 'date':
      return typeof data === 'string' ? defaultFormat(new Date(data)) : null;
    case 'datetime':
      return typeof data === 'string' ? dateTimeFormat(new Date(data)) : null;
    case 'float':
      return data ? toNumberFormat(data) : null;
    case 'float6':
      return data ? Number(data).toFixed(6).replace(/\./g, ',') : null;
    case 'int':
      return data ? toIntFormat(data) : null;
    case 'money':
      return data ? `${toNumberFormat(data)} €` : null;
    default:
      return null;
  }
}
