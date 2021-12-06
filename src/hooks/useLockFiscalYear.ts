import { useState, useContext, useCallback } from 'react';
import { GeneralCtx } from 'contexts/GeneralContext';

import Services from 'services';
import { ErrorModel } from 'models';

interface LockFiscalYearStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

interface ConfirmationWindowModel {
  open: boolean;
  type: 'lock' | 'unlock' | 'copy' | null;
}

const useLockFiscalYear = () => {
  const { state, fetchGeneralData } = useContext(GeneralCtx);

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
    if (state.generalInformation.data?.Id) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.lockFiscalYear(
          state.generalInformation.data.Id
        );

        if (res.IsSuccess) {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
          }));
          handleCloseConfirmationWindow();
          await fetchGeneralData(state.generalInformation.data.Id);
        } else {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [res.Message] },
          }));
        }
      } catch (err) {
        console.error(err);

        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    }
  }, [state.generalInformation.data?.Id]);

  const unlockFiscalYear = useCallback(async () => {
    if (state.generalInformation.data?.Id) {
      try {
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.unlockFiscalYear(
          state.generalInformation.data.Id
        );

        if (res.IsSuccess) {
          handleCloseConfirmationWindow();
          await fetchGeneralData(state.generalInformation.data.Id);
        } else {
          setLockFiscalYearState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [res.Message] },
          }));
        }
      } catch (err) {
        console.error(err);
        setLockFiscalYearState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    }
  }, [state.generalInformation.data?.Id]);

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
    handleInitError,
    handleInitConfirmationWindowType,
    isClosed: !!state.generalInformation.data?.IsClosed,
    showFYBtns: !!state.generalInformation.data,
  };
};

export default useLockFiscalYear;
