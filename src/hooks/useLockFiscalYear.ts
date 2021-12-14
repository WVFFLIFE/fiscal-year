import { useState, useContext, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralCtx } from 'contexts/GeneralContext';
import {
  UnlockFiscalYearCodes,
  LockFiscalYearCodes,
  CopyFiscalYearCodes,
} from 'models';
import { getFiscalYearId } from 'utils/fiscalYear';

import Services from 'services';

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
  const {
    state: { fiscalYear },
    fetchGeneralData,
  } = useContext(GeneralCtx);

  const fiscalYearId = getFiscalYearId(fiscalYear);

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
    if (fiscalYearId) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.lockFiscalYear(fiscalYearId);

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();
          await fetchGeneralData(fiscalYearId);
        } else {
          handleCloseConfirmationWindow();
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
            error: {
              type: 'lock',
              message:
                res.ResponseCode === LockFiscalYearCodes.InsufficientPermission
                  ? t('#error.fiscalyear.lock.insufficientpermission')
                  : res.Message,
            },
          }));
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
  }, [fiscalYearId]);

  const unlockFiscalYear = useCallback(async () => {
    if (fiscalYearId) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.unlockFiscalYear(fiscalYearId);

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();
          await fetchGeneralData(fiscalYearId);
        } else {
          handleCloseConfirmationWindow();
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
            error: {
              type: 'unlock',
              message:
                res.ResponseCode ===
                UnlockFiscalYearCodes.InsufficientPermission
                  ? t('#error.fiscalyear.lock.insufficientpermission')
                  : res.Message,
            },
          }));
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
  }, [fiscalYearId]);

  const copyFiscalYear = useCallback(async () => {
    if (fiscalYearId) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.copyFiscalYear(fiscalYearId);

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();
          await fetchGeneralData(fiscalYearId);
        } else {
          handleCloseConfirmationWindow();
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
            error: {
              type: 'unlock',
              message:
                res.ResponseCode ===
                CopyFiscalYearCodes.AmbiguityFiscalYearNotFound
                  ? t('#error.fiscalyear.copy.ambiguityfiscalyearnotfound')
                  : res.ResponseCode ===
                    CopyFiscalYearCodes.PreviousFiscalYearNotFound
                  ? t('#error.fiscalyear.copy.previousfiscalyearnotfound')
                  : res.Message,
            },
          }));
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
  }, [fiscalYearId]);

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
