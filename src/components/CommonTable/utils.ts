import { defaultFormat, dateTimeFormat } from 'utils/dates';

export type DataType = 'string' | 'date' | 'datetime';

export function getDataByType(data: unknown, type: DataType) {
  try {
    switch (type) {
      case 'string':
        return typeof data === 'string' ? data : null;
      case 'date':
        return typeof data === 'string' ? defaultFormat(new Date(data)) : null;
      case 'datetime':
        return typeof data === 'string' ? dateTimeFormat(new Date(data)) : null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}
