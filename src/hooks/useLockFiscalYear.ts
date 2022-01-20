import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from './useStateSelector';
import useAppDispatch from './useAppDispatch';
import { selectFiscalYear } from 'selectors/generalPageSelectors';
import {
  refreshGeneralData,
  fetchGeneralFiscalYear,
} from 'features/generalPageSlice';

import { Services } from 'services/s';
import {
  LockFiscalYearResponseCode,
  UnlockFiscalYearResponseCode,
} from 'enums/responses';

const FiscalYearService = new Services.FiscalYear();

type EntityType = 'lock' | 'unlock' | null;

interface LockFiscalYearStateModel {
  loading: boolean;
  error: { message: string; type: EntityType } | null;
}

interface ConfirmationWindowModel {
  open: boolean;
  type: EntityType;
}

const useLockFiscalYear = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const { fiscalYear } = useStateSelector((state) => ({
    fiscalYear: selectFiscalYear(state),
  }));

  const [lockFiscalYearState, setLockFiscalYearState] =
    useState<LockFiscalYearStateModel>({
      loading: false,
      error: null,
    });
  const [confirmationWindowState, setConfirmationWindowState] =
    useState<ConfirmationWindowModel>({
      open: false,
      type: null,
    });

  const handleOpenLockConfirmationWindow = () => {
    setConfirmationWindowState({
      open: true,
      type: 'lock',
    });
  };

  const handleOpenUnlockConfirmationWindow = () => {
    setConfirmationWindowState({
      open: true,
      type: 'unlock',
    });
  };

  const handleCloseConfirmationWindow = () => {
    setConfirmationWindowState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleInitConfirmationWindowType = () => {
    setConfirmationWindowState({
      type: null,
      open: false,
    });
  };

  const lockFiscalYear = useCallback(async () => {
    if (fiscalYear?.id) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));
        const res = await FiscalYearService.lock(fiscalYear.id);

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();
          await dispatch(refreshGeneralData());
          await dispatch(fetchGeneralFiscalYear(fiscalYear.id));
        } else {
          handleCloseConfirmationWindow();

          throw new Error(
            res.ResponseCode ===
            LockFiscalYearResponseCode.InsufficientPermission
              ? t('#error.fiscalyear.lock.insufficientpermission')
              : res.Message
          );
        }
      } catch (err) {
        console.error(err);

        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: false,
          error: { type: null, message: String(err) },
        }));
      }
    }
  }, [fiscalYear]);

  const unlockFiscalYear = useCallback(async () => {
    if (fiscalYear?.id) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await FiscalYearService.unlock(fiscalYear?.id);

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();

          await dispatch(refreshGeneralData());
          await dispatch(fetchGeneralFiscalYear(fiscalYear.id));
        } else {
          handleCloseConfirmationWindow();

          throw new Error(
            res.ResponseCode ===
            UnlockFiscalYearResponseCode.InsufficientPermission
              ? t('#error.fiscalyear.lock.insufficientpermission')
              : res.Message
          );
        }
      } catch (err) {
        console.error(err);
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: false,
          error: { type: null, message: String(err) },
        }));
      }
    }
  }, [fiscalYear]);

  const handleInitError = () => {
    setLockFiscalYearState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    lockFiscalYearState,
    confirmationWindowState,
    handleOpenLockConfirmationWindow,
    handleOpenUnlockConfirmationWindow,
    handleCloseConfirmationWindow,
    lockFiscalYear,
    unlockFiscalYear,
    handleInitError,
    handleInitConfirmationWindowType,
    isClosed: !!fiscalYear?.isClosed,
    showFYBtns: !!fiscalYear,
  };
};

export default useLockFiscalYear;
