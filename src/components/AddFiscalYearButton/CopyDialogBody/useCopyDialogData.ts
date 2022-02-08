import { useState, useCallback } from 'react';
import { ErrorModel, FiscalYearModel } from 'models';

import useStateSelector from 'hooks/useStateSelector';
import {
  selectFiscalYearsList,
  selectNextFiscalYear,
} from 'selectors/generalPageSelectors';

import { Services, FiscalYear } from 'services/s';

const FiscalYearService = new Services.FiscalYear();

interface Options {
  onClose(): void;
}

interface RequestState {
  creating: boolean;
  error: ErrorModel | null;
}

const useCopyDialogData = (options: Options) => {
  const { onClose } = options;

  const { fiscalYearsList, nextFiscalYear } = useStateSelector((state) => ({
    fiscalYearsList: selectFiscalYearsList(state),
    nextFiscalYear: selectNextFiscalYear(state),
  }));

  const [requestState, setRequestState] = useState<RequestState>({
    creating: false,
    error: null,
  });

  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState<FiscalYearModel | null>(nextFiscalYear && { ...nextFiscalYear });

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
    fiscalYearsList,
    requestState,
    selectedFiscalYear,
    handleChangeFiscalYear,
    handleResetError,
    handleCreateFromSource,
  };
};

export default useCopyDialogData;
