import { enGB, fi } from 'date-fns/locale';
import { format } from 'date-fns';

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
