import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from 'hooks/useStateSelector';
import useAppDispatch from 'hooks/useAppDispatch';

import { ErrorModel, FiscalYearModel } from 'models';
import { CopyFiscalYearResponseCode } from 'enums/responses';

import {
  selectFiscalYearsList,
  selectNextFiscalYear,
  selectFiscalYear,
} from 'selectors/generalPageSelectors';

import { updateFiscalYear } from 'features/generalPageSlice';

import { Services, FiscalYear } from 'services/s';

const FiscalYearService = new Services.FiscalYear();

interface RequestState {
  loading: boolean;
  error: ErrorModel | null;
}

const useCopyData = (onClose: () => void) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const { fiscalYear, fiscalYearsList, nextFiscalYear } = useStateSelector(
    (state) => ({
      fiscalYear: selectFiscalYear(state),
      fiscalYearsList: selectFiscalYearsList(state),
      nextFiscalYear: selectNextFiscalYear(state),
    })
  );

  const [requestState, setRequestState] = useState<RequestState>({
    loading: false,
    error: null,
  });
  const [selectedFiscalYear, setSelectedFiscalYear] =
    useState<FiscalYearModel | null>(nextFiscalYear && { ...nextFiscalYear });

  const handleCreateFromSource = async () => {
    if (!selectedFiscalYear || !nextFiscalYear || !fiscalYear?.id) return;
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await FiscalYearService.copyFromSource(
        nextFiscalYear.Id,
        selectedFiscalYear.Id
      );

      if (res.IsSuccess) {
        onClose();

        dispatch(updateFiscalYear(fiscalYear.id));
      } else {
        throw new Error(
          res.ResponseCode ===
          CopyFiscalYearResponseCode.AmbiguityFiscalYearNotFound
            ? t('#error.fiscalyear.copy.ambiguityfiscalyearnotfound')
            : res.ResponseCode ===
              CopyFiscalYearResponseCode.PreviousFiscalYearNotFound
            ? t('#error.fiscalyear.copy.previousfiscalyearnotfound')
            : res.Message
        );
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [(err as Error).message] },
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

export default useCopyData;
