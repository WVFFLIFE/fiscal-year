export namespace ResponseStatus {
  export enum FiscalYearValidatingStatus {
    OK = 1,
    BadDates = 2,
    NotFullYear = 3,
    YearIntersects = 4,
  }
}

/* eslint-disable */
import FiscalYearValidatingStatus = ResponseStatus.FiscalYearValidatingStatus;
/* eslint-enable */

export { FiscalYearValidatingStatus };
