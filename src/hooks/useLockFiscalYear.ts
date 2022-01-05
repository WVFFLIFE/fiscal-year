import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import useStateSelector from './useStateSelector';
import useAppDispatch from './useAppDispatch';
import { selectFiscalYear } from 'selectors/generalPageSelectors';
import { fetchGeneralFiscalYear } from 'features/generalPageSlice';

import { Services } from 'services/s';
import {
  LockFiscalYearResponseCode,
  UnlockFiscalYearResponseCode,
  CopyFiscalYearResponseCode,
} from 'enums/responses';

const FiscalYearService = new Services.FiscalYear();

type EntityType = 'lock' | 'unlock' | 'copy' | null;

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

  const handleOpenCopyConfirmationWindow = () => {
    setConfirmationWindowState({
      open: true,
      type: 'copy',
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
          dispatch(fetchGeneralFiscalYear(fiscalYear.id));
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
  }, [fiscalYear?.id]);

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

          dispatch(fetchGeneralFiscalYear(fiscalYear.id));
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
  }, [fiscalYear?.id]);

  const copyFiscalYear = useCallback(async () => {
    if (fiscalYear?.id) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await FiscalYearService.copy(fiscalYear.id);

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();

          dispatch(fetchGeneralFiscalYear(fiscalYear.id));
        } else {
          handleCloseConfirmationWindow();

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
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: false,
          error: { type: null, message: String(err) },
        }));
      }
    }
  }, [fiscalYear?.id]);

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
    handleOpenCopyConfirmationWindow,
    handleCloseConfirmationWindow,
    lockFiscalYear,
    unlockFiscalYear,
    copyFiscalYear,
    handleInitError,
    handleInitConfirmationWindowType,
    isClosed: !!fiscalYear?.isClosed,
    showFYBtns: !!fiscalYear,
  };
};

export default useLockFiscalYear;
