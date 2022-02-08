import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useDialogState from 'hooks/useSuccessDialogState';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useAppDispatch from 'hooks/useAppDispatch';

import {
  updateFiscalYearsList,
  updateFiscalYear,
} from 'features/generalPageSlice';

import { ErrorModel } from 'models';
import { CopyFiscalYearResponseCode } from 'enums/responses';
import { Services } from 'services/s';

const FiscalYearService = new Services.FiscalYear();

interface RequestStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

const useFromTemplateViewData = (
  type: 'create' | 'copy',
  onClose: () => void
) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();
  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: false,
    error: null,
  });
  const successDialogState = useDialogState();

  const handleSave = async () => {
    if (!fiscalYear?.id || !fiscalYear.general.cooperativeId) return;
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      if (type === 'create') {
        let res = await FiscalYearService.createFromTemplate(
          fiscalYear.general.cooperativeId
        );

        if (!res.IsSuccess) throw new Error(res.Message);

        successDialogState.open();
      } else {
        let res = await FiscalYearService.copy(fiscalYear.id, 'template');

        if (!res.IsSuccess) {
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

        onClose();
        dispatch(updateFiscalYear(fiscalYear.id));
      }

      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
      }));
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [(err as Error).message] },
      }));
    }
  };

  const handleCloseSuccessDialog = () => {
    successDialogState.close();
    onClose();

    if (fiscalYear?.general.cooperativeId) {
      dispatch(updateFiscalYearsList(fiscalYear.general.cooperativeId));
    }
  };

  return {
    requestState,
    successDialogState,
    handleCloseSuccessDialog,
    handleSave,
  };
};

export default useFromTemplateViewData;
