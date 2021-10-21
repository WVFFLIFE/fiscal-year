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
