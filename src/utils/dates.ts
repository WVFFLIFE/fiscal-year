import format from 'date-fns/format';
export { default as isBefore } from 'date-fns/isBefore';

export const DEFAULT_FORMAT_PATTERN = 'd.M.yyyy';
export const REQUEST_DATE_FORMAT_PATTERN = 'yyyy-MM-ddT00:00:00';

export function defaultFormat(date: null): null;
export function defaultFormat(date: Date): string;
export function defaultFormat(date: Date | null) {
  if (!date) return null;

  return format(date, DEFAULT_FORMAT_PATTERN);
}
