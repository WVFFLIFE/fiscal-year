import { CommonCooperativeModel } from 'models';
import { SettledResponse } from 'services';

import { format, Locale } from 'date-fns';
import { enGB, fi } from 'date-fns/locale';
import _toLower from 'lodash/toLower';

export { default as isFolder } from './isFolder';
export { default as isPublished } from './isPublished';
export { default as buildFlatList } from './buildFlatList';
export { default as extractDocs } from './extractDocs';
export { default as sort } from './sort';
export * from './dates';

export const DEFAULT_PAGINATION_OPTIONS = [5, 10, 15];

export function filterBySearchTerm(val: string, searchTerm: string) {
  return _toLower(val).includes(_toLower(searchTerm));
}

export function getLangString(langCode: number) {
  return langCode === 1035 ? 'fi' : langCode === 1033 ? 'en' : 'en';
}

export function getLocale(langCode: number) {
  return langCode === 1035 ? fi : enGB;
}

export function localeFormat(
  date: Date,
  formatStr: string,
  locale: Locale = enGB
) {
  return format(date, formatStr, { locale });
}

export function getYearsList(from: number, to: number) {
  const list = [];

  for (let i = from; i <= to; i++) {
    list.push(i);
  }

  return list;
}

export function getMonthsList(locale: Locale = enGB) {
  const months = [];

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

export function isAllMyOwn(
  cooperatives: CommonCooperativeModel[],
  selectedCooperatives: CommonCooperativeModel[]
) {
  const allMyOwnCoops = cooperatives.filter((coop) => coop.IsOwn);
  return allMyOwnCoops.every(
    (coop) =>
      !!selectedCooperatives.find((selectedCoop) => selectedCoop.Id === coop.Id)
  );
}

export async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function readFile(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(String(reader.result));
    };
    reader.onerror = (error) => reject(error);
  });
}

export function toIntFormat(num: number | null | undefined) {
  if (!num) return null;
  return String(num)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace(/\./g, ',');
}

export function toNumberFormat(num: number | null | undefined) {
  if (!num) return null;
  return num
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    .replace(/\./g, ',');
}

export function isNull(input: any) {
  return input === null;
}
export function isArray(input: any) {
  return Array.isArray(input);
}
export function isObject(input: any) {
  return typeof input === 'object' && !isArray(input) && !isNull(input);
}

export function toFloatStr(input: string) {
  let value = input.replace(/[^0-9,]/g, '').replace(/[,](?=.*[,])/g, '');

  const [num, decimal] = value.split(',');

  if (decimal?.length > 2) {
    value = `${num.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')},${decimal.substring(
      0,
      2
    )}`;
  }

  return value;
}

export function toIntStr(input: string) {
  return input.replace(/[^0-9]/g, '');
}
