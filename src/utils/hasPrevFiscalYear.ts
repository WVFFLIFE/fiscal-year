import { FiscalYearModel } from 'models';

import { isBefore } from 'utils/dates';

function hasPrevFiscalYear(
  currentFiscalYear: FiscalYearModel,
  fiscalYearsList: FiscalYearModel[]
) {
  const startDateCurrentFiscalYear = new Date(currentFiscalYear.StartDate);

  return fiscalYearsList.some((fiscalYear) => {
    const starDateFiscalYear = new Date(fiscalYear.StartDate);

    return isBefore(starDateFiscalYear, startDateCurrentFiscalYear);
  });
}

export default hasPrevFiscalYear;
