import { FiscalYearModel } from 'models';

export function findFiscalYear(
  fiscalYearsList: FiscalYearModel[],
  id: string | null
) {
  return fiscalYearsList.find((fy) => fy.Id === id) || null;
}
