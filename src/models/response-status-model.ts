export namespace ResponseStatus {
  export enum FiscalYearValidatingStatus {
    OK = 1,
    BadDates = 2,
    NotFullYear = 3,
    YearIntersects = 4,
  }
}
