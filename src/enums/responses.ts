export enum LockFiscalYearResponseCode {
  OK = 0,
  InsufficientPermission = 1,
}

export enum UnlockFiscalYearResponseCode {
  OK = 0,
  InsufficientPermission = 1,
}

export enum ValidateFiscalYearResponseCode {
  OK = 1,
  BadDates = 2,
  NotFullYear = 3,
  YearIntersects = 4,
}

export enum CopyFiscalYearResponseCode {
  OK,
  PreviousFiscalYearNotFound,
  AmbiguityFiscalYearNotFound,
}