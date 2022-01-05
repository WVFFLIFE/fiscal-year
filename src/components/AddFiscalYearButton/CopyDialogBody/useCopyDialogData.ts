import { useState, useCallback, useMemo } from 'react';
import { ErrorModel, FiscalYearModel } from 'models';

import useStateSelector from 'hooks/useStateSelector';
import { selectFiscalYearsList } from 'selectors/generalPageSelectors';

import { startOfYear, endOfYear, isSameDay, subYears } from 'utils/dates';

import { Services, FiscalYear } from 'services/s';

const FiscalYearService = new Services.FiscalYear();

interface Options {
  onClose(): void;
}

interface RequestState {
  creating: boolean;
  error: ErrorModel | null;
}

const getPrevFiscalYear = () => ({
  startDate: subYears(startOfYear(new Date()), 1),
  endDate: subYears(endOfYear(new Date()), 1),
});

export const findPrevFiscalYear = (fiscalYearsList: FiscalYearModel[]) => {
  const prevFiscalYear = getPrevFiscalYear();

  return (
    fiscalYearsList.find(
      (fiscalYear) =>
        isSameDay(new Date(fiscalYear.StartDate), prevFiscalYear.startDate) &&
        isSameDay(new Date(fiscalYear.EndDate), prevFiscalYear.endDate)
    ) || null
  );
};

const useCopyDialogData = (options: Options) => {
  const { onClose } = options;

  const fiscalYearsList = useStateSelector(selectFiscalYearsList);

  const prevFiscalYear = useMemo(
    () => findPrevFiscalYear(fiscalYearsList),
    [fiscalYearsList]
  );

  const [requestState, setRequestState] = useState<RequestState>({
    creating: false,
    error: null,
  });

  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState<FiscalYearModel | null>(prevFiscalYear);

  const handleCreateFromSource = async () => {
    if (!selectedFiscalYear) return;
    try {
      setRequestState((prevState) => ({
        ...prevState,
        creating: true,
      }));

      const res = await FiscalYearService.createFromSource(
        selectedFiscalYear.Id
      );

      if (res.IsSuccess) {
        onClose();
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        creating: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleChangeFiscalYear = useCallback((newFiscalYear: FiscalYear) => {
    setSelectedFiscalYear(newFiscalYear);
  }, []);

  const handleResetError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    hasPreviousFiscalYear: !!prevFiscalYear,
    fiscalYearsList,
    requestState,
    selectedFiscalYear,
    handleChangeFiscalYear,
    handleResetError,
    handleCreateFromSource,
  };
};

export default useCopyDialogData;
