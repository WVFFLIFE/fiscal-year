import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const selectFiscalYearsList = (state: RootState) =>
  state.generalPage.filters.fiscalYears.list;
export const selectFiscalYear = (state: RootState) =>
  state.generalPage.generalFiscalYear;
export const selectFiscalYearId = createDraftSafeSelector(
  selectFiscalYear,
  (fiscalYear) => fiscalYear?.id || null
);
export const selectIsClosedField = createDraftSafeSelector(
  selectFiscalYear,
  (fiscalYear) => !!fiscalYear?.isClosed
);

export const selectConsumptionData = createDraftSafeSelector(
  selectFiscalYear,
  (fiscalYear) => fiscalYear?.consumption || null
);
export const selectBalancesData = createDraftSafeSelector(
  selectFiscalYear,
  (fiscalYear) => fiscalYear?.balances || null
);
export const selectBalancesProducts = createDraftSafeSelector(
  selectBalancesData,
  (balances) => balances?.products || null
);
export const selectPropertyMaintenanceData = createDraftSafeSelector(
  selectBalancesData,
  (balances) =>
    balances
      ? {
          productName: balances.propertyMaintenanceProductName,
          surplusDeficitPreviousFY:
            balances.propertyMaintenanceSurplusDeficitPreviousFY,
        }
      : null
);
export const selectVATCalculationData = createDraftSafeSelector(
  selectBalancesData,
  (balances) =>
    balances
      ? {
          productName: balances.vatCalculationsProductName,
          surplusDeficitPreviousFY:
            balances.vatCalculationsSurplusDeficitPreviousFY,
        }
      : null
);
export const selectAppendexisData = createDraftSafeSelector(
  selectFiscalYear,
  (fiscalYear) => fiscalYear?.appendexis || null
);
export const selectRunningNumberSettings = createDraftSafeSelector(
  selectAppendexisData,
  (appendexis) => appendexis?.runningNumberSettings || null
);
export const selectEvents = createDraftSafeSelector(
  selectFiscalYear,
  (fiscalYear) => fiscalYear?.events || null
);
