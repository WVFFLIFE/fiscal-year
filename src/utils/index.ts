import { SettledResponse } from 'services';

import { enGB, fi } from 'date-fns/locale';
import { format } from 'date-fns';

export { default as isFolder } from './isFolder';
export { default as isPublished } from './isPublished';
export { default as buildFlatList } from './buildFlatList';
export { default as extractDocs } from './extractDocs';
export { default as sort } from './sort';

export const DEFAULT_FORMAT_PATTERN = 'd.M.yyyy';

export function filterBySearchTerm(val: string, searchTerm: string) {
  return val.toLowerCase().includes(searchTerm.toLowerCase());
}

export function getLangString() {
  return window.USER_LANGUAGE_CODE === 1035
    ? 'fi'
    : window.USER_LANGUAGE_CODE === 1033
    ? 'en'
    : 'en';
}

export function getLocale() {
  return window.USER_LANGUAGE_CODE === 1035 ? fi : enGB;
}

export function localeFormat(date: Date, formatStr: string) {
  return format(date, formatStr, { locale: getLocale() });
}

export function getYearsList(from: number, to: number) {
  const list = [];

  for (let i = from; i <= to; i++) {
    list.push(i);
  }

  return list;
}

export function getMonthsList() {
  const months = [];
  const locale = getLocale();

  for (let i = 0; i < 12; i++) {
    months.push(locale.localize?.month(i, { width: 'wide' }));
  }

  return months;
}

export function getIdsList<T extends { Id: string }>(list: T[]) {
  return list.map((item) => item.Id);
}

export function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export function getErrorsList(res: SettledResponse) {
  return res.reduce((acc, next) => {
    if (next.status === 'fulfilled') {
      if (!next.value.IsSuccess) {
        acc.push(next.value.Message);
        return acc;
      }
    } else {
      acc.push(String(next.reason));
    }

    return acc;
  }, [] as string[]);
}
