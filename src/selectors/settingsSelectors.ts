import { createDraftSafeSelector } from '@reduxjs/toolkit';
import { RootState } from 'store';

export const selectSettings = (state: RootState) => state.settings;

export const selectAnnualReportSettings = createDraftSafeSelector(
  selectSettings,
  (settings) => settings.annualReport
);
export const selectAppendexisSettings = createDraftSafeSelector(
  selectSettings,
  (settings) => settings.appendexis
);
export const selectBalanceSettings = createDraftSafeSelector(
  selectSettings,
  (settings) => settings.balance
);
export const selectLiabilitiesSettings = createDraftSafeSelector(
  selectSettings,
  (settings) => settings.liabilities
);
export const selectCommentsSettings = createDraftSafeSelector(
  selectSettings,
  (settings) => settings.comments
);
