import format from 'date-fns/format';
export { default as isValid } from 'date-fns/isValid';
export { default as isBefore } from 'date-fns/isBefore';
export { default as isSameDay } from 'date-fns/isSameDay';
export { format };

export const DEFAULT_FORMAT_PATTERN = 'd.M.yyyy';
export const REQUEST_DATE_FORMAT_PATTERN = "yyyy-MM-dd'T'00:00:00";
export const DATE_TIME_FORMAT_PATTERN = 'd.M.yyyy HH:mm';

export function dateTimeFormat(date: null): null;
export function dateTimeFormat(date: Date): string;
export function dateTimeFormat(date: Date | null) {
  if (!date) return null;

  return format(date, DATE_TIME_FORMAT_PATTERN);
}

export function serverFormat(date: Date) {
  return format(date, REQUEST_DATE_FORMAT_PATTERN);
}

export function defaultFormat(date: null): null;
export function defaultFormat(date: Date): string;
export function defaultFormat(date: Date | null) {
  if (!date) return null;

  return format(date, DEFAULT_FORMAT_PATTERN);
}
