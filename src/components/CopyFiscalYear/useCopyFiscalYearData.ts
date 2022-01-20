import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAppDispatch from 'hooks/useAppDispatch';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useToggleSwitch from 'hooks/useToggleSwitch';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';

import { ErrorModel } from 'models';
import { CopyFiscalYearResponseCode } from 'enums/responses';

import { Services } from 'services/s';

const FiscalYearService = new Services.FiscalYear();

interface RequestState {
  loading: boolean;
  error: ErrorModel | null;
}

const useCopyFiscalYearData = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();

  const [requestState, setRequestState] = useState<RequestState>({
    loading: false,
    error: null,
  });
  const [openConfirmationDialog, toggleConfirmationDialogVisibility] =
    useToggleSwitch();

  const handleCopyFiscalYear = async () => {
    if (!fiscalYear?.id) return;

    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await FiscalYearService.copy(fiscalYear.id);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
        }));

        toggleConfirmationDialogVisibility();
        dispatch(fetchGeneralFiscalYear(fiscalYear.id));
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
        error: { messages: [(err as Error).message] },
        loading: false,
      }));
    }
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    requestState,
    openConfirmationDialog,
    toggleConfirmationDialogVisibility,
    handleCopyFiscalYear,
    handleInitError,
  };
};

export default useCopyFiscalYearData;
