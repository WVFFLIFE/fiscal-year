import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useAppDispatch from 'hooks/useAppDispatch';
import useSuccessDialogState from 'hooks/useSuccessDialogState';
import { GeneralInformationDataModel } from './GeneralInformationTable';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';
import { serverFormat, defaultFormat, isSameDay } from 'utils/dates';
import unsavedChangesTracker from 'utils/unsavedChangesTracker';
import { getOverlapingField } from './utils';

import Services from 'services';

import { ErrorModel } from 'models';
import { FiscalYearValidatingStatus } from 'models/response-status-model';

interface RequestStateModel {
  saving: boolean;
  error: ErrorModel | null;
}

interface EditableDataModel {
  startDate: Date | null;
  startDateError: boolean;
  endDate: Date | null;
  endDateError: boolean;
  id: string | null;
}

function compareDates(prev: Date | null, next: Date | null) {
  if (prev && next) {
    return isSameDay(prev, next);
  }

  return prev === next;
}

function isOverlappingError(errName: string) {
  return (errName = 'OverlappingValidationError');
}

const useGeneralInformationTable = (list: GeneralInformationDataModel[]) => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();

  const confirmationDialog = useSuccessDialogState();
  const [requestState, setRequestState] = useState<RequestStateModel>({
    saving: false,
    error: null,
  });
  const [editableData, setEditableData] = useState<EditableDataModel>({
    id: null,
    startDate: null,
    startDateError: false,
    endDate: null,
    endDateError: false,
  });

  const setDateError = (
    overlappingFields: 'startDate' | 'endDate' | 'both' | null
  ) => {
    setEditableData((prevState) => ({
      ...prevState,
      startDateError:
        overlappingFields === 'startDate' || overlappingFields === 'both',
      endDateError:
        overlappingFields === 'endDate' || overlappingFields === 'both',
    }));
  };

  const handleResetStartDateError = () => {
    setEditableData((prevState) => ({
      ...prevState,
      startDateError: false,
    }));
  };

  const handleResetEndDateError = () => {
    setEditableData((prevState) => ({
      ...prevState,
      endDateError: false,
    }));
  };

  /**
   *  Validate selected fiscal year dates
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns true if validation is successfully completed,
   * else - undefined
   */
  const validate = async (startDate: Date, endDate: Date) => {
    if (!fiscalYear?.id) return;
    try {
      setRequestState((prevState) => ({
        ...prevState,
        saving: true,
      }));

      const res = await Services.validateFiscalYearChanges(
        null,
        fiscalYear.id,
        serverFormat(startDate),
        serverFormat(endDate)
      );

      if (res.IsSuccess) return true;

      if (res.ValidationResult === FiscalYearValidatingStatus.YearIntersects) {
        const intersectPeriodStartDate = new Date(res.IntersectPeriodStartDate),
          intersectPeriodEndDate = new Date(res.IntersectPeriodEndDate);
        setDateError(
          getOverlapingField(
            startDate,
            endDate,
            intersectPeriodStartDate,
            intersectPeriodEndDate
          )
        );

        const overlappingError = new Error(
          t(`#error.fiscalyear.validating.status.4`, {
            startDate: defaultFormat(startDate),
            endDate: defaultFormat(endDate),
          })
        );

        overlappingError.name = 'OverlappingValidationError';

        throw overlappingError;
      } else {
        throw new Error(
          res.ValidationResult
            ? t(`#error.fiscalyear.validating.status.${res.ValidationResult}`)
            : res.Message
        );
      }
    } catch (err: any) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        saving: false,
        error: {
          messages: [err.message],
          title: isOverlappingError(err.name)
            ? t('#error.overlappingperiod.title')
            : undefined,
        },
      }));
    }
  };

  const saveFiscalYear = async (id: string, startDate: Date, endDate: Date) => {
    return await Services.fiscalYearGeneralUpdate({
      FiscalYearId: id,
      StartDate: serverFormat(startDate),
      EndDate: serverFormat(endDate),
    });
  };

  const handleSaveFiscalYear = useCallback(
    async (startDate: Date, endDate: Date) => {
      if (!fiscalYear?.id) return;
      const isValid = await validate(startDate, endDate);

      if (isValid) {
        try {
          const res = await saveFiscalYear(fiscalYear.id, startDate, endDate);

          if (res.IsSuccess) {
            setRequestState((prevState) => ({
              ...prevState,
              saving: false,
            }));

            await dispatch(fetchGeneralFiscalYear(fiscalYear.id));

            return true;
          } else {
            throw new Error(res.Message);
          }
        } catch (err) {
          console.error(err);

          setRequestState((prevState) => ({
            ...prevState,
            saving: false,
            error: { messages: [String(err)] },
          }));
        }
      }
    },
    [fiscalYear?.id, dispatch]
  );

  const handleChangeEditableData = (
    key: keyof EditableDataModel,
    val: EditableDataModel[keyof EditableDataModel]
  ) => {
    setEditableData((prevState) => ({
      ...prevState,
      [key]: val,
    }));
  };

  const handleChangeStartDate = useCallback((d: Date | null) => {
    handleChangeEditableData('startDate', d);
  }, []);

  const handleChangeEndDate = useCallback((d: Date | null) => {
    handleChangeEditableData('endDate', d);
  }, []);

  const handleAllowEdit = (editableData: Partial<EditableDataModel>) => {
    setEditableData((prevState) => ({
      ...prevState,
      ...editableData,
    }));
  };

  const handleResetEditableData = () => {
    setEditableData({
      id: null,
      endDate: null,
      startDate: null,
      endDateError: false,
      startDateError: false,
    });
  };

  const handleSave = async () => {
    if (editableData.endDate && editableData.startDate) {
      confirmationDialog.close();
      await handleSaveFiscalYear(editableData.startDate, editableData.endDate);
    }
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const activeItem = useMemo(
    () => list.find((item) => item.id === editableData.id),
    [editableData, list]
  );

  useEffect(() => {
    if (editableData.startDateError) {
      handleResetStartDateError();
    }
  }, [editableData.startDate]);

  useEffect(() => {
    if (editableData.endDateError) {
      handleResetEndDateError();
    }
  }, [editableData.endDate]);

  useEffect(() => {
    if (
      fiscalYear?.id &&
      activeItem &&
      editableData.startDate &&
      editableData.endDate
    ) {
      const startDateActiveItem = activeItem.startDate
        ? new Date(activeItem.startDate)
        : null;
      const endDateActiveItem = activeItem.endDate
        ? new Date(activeItem.endDate)
        : null;

      if (
        !compareDates(startDateActiveItem, editableData.startDate) ||
        !compareDates(endDateActiveItem, editableData.endDate)
      ) {
        unsavedChangesTracker.addSaveAction(() =>
          handleSaveFiscalYear(
            editableData.startDate as Date,
            editableData.endDate as Date
          )
        );
      } else {
        unsavedChangesTracker.setHasUnsavedChanges(false);
      }
    }
  }, [
    activeItem,
    editableData.startDate,
    editableData.endDate,
    fiscalYear,
    handleSaveFiscalYear,
  ]);

  useEffect(() => {
    if (editableData.id) {
      handleResetEditableData();
    }
  }, [fiscalYear]);

  useEffect(() => {
    if (!editableData.id && unsavedChangesTracker.hasUnsavedChanges) {
      unsavedChangesTracker.setHasUnsavedChanges(false);
    }
  }, [editableData.id]);

  return {
    handleResetStartDateError,
    handleResetEndDateError,
    confirmationDialog,
    requestState,
    editableData,
    handleSave,
    handleInitError,
    handleResetEditableData,
    handleAllowEdit,
    handleChangeEndDate,
    handleChangeStartDate,
  };
};

export default useGeneralInformationTable;
