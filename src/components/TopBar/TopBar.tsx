import { memo, FC } from 'react';
import useLockFiscalYear from 'hooks/useLockFiscalYear';
import { useTranslation } from 'react-i18next';

import ConfirmationWindow from 'components/ConfirmationWindow';
import Error from 'components/Error';
import ActionButton from 'components/ActionButton';
import AddFiscalYearButton from 'components/AddFiscalYearButton';
import CopyFiscalYear from 'components/CopyFiscalYear';
import Title from 'components/Title';
import Box from '@mui/material/Box';
import { LockIcon, UnlockIcon, RoundWarningIcon } from 'components/Icons';

import { useStyles } from './style';

const TopBar: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    confirmationWindowState,
    lockFiscalYearState,
    isClosed,
    showFYBtns,
    lockFiscalYear,
    unlockFiscalYear,
    handleInitError,
    handleOpenLockConfirmationWindow,
    handleOpenUnlockConfirmationWindow,
    handleCloseConfirmationWindow,
    handleInitConfirmationWindowType,
  } = useLockFiscalYear();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: (theme) => theme.spacing(5),
        }}
      >
        <Title>{t('#page.title')}</Title>
        {showFYBtns && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ActionButton
              size="large"
              className={classes.offsetRight}
              startIcon={isClosed ? <UnlockIcon /> : <LockIcon />}
              onClick={
                isClosed
                  ? handleOpenUnlockConfirmationWindow
                  : handleOpenLockConfirmationWindow
              }
            >
              {t(
                isClosed ? '#common.unlockfiscalyear' : '#common.lockfiscalyear'
              )}
            </ActionButton>
            <Box marginRight="20px">
              <CopyFiscalYear />
            </Box>
            <Box>
              <AddFiscalYearButton />
            </Box>
          </Box>
        )}
      </Box>
      <Error
        error={
          lockFiscalYearState.error ? lockFiscalYearState.error.message : null
        }
        title={
          lockFiscalYearState.error
            ? lockFiscalYearState.error.type === 'unlock'
              ? t('#common.unlockfiscalyear')
              : confirmationWindowState.type === 'lock'
              ? t('#common.lockfiscalyear')
              : 'Error'
            : 'Error'
        }
        onInitError={handleInitError}
      />
      <ConfirmationWindow
        maxWidth="sm"
        open={confirmationWindowState.open}
        handleClose={handleCloseConfirmationWindow}
        TransitionProps={{
          onExited: handleInitConfirmationWindowType,
        }}
        title={
          confirmationWindowState.type === 'unlock'
            ? t('#common.unlockfiscalyear')
            : confirmationWindowState.type === 'lock'
            ? t('#common.lockfiscalyear')
            : undefined
        }
        description={
          confirmationWindowState.type === 'unlock'
            ? t('#confirmation.unlock.description')
            : confirmationWindowState.type === 'lock'
            ? t('#confirmation.lock.description')
            : undefined
        }
        Icon={<RoundWarningIcon className={classes.redConfirmationIcon} />}
        CancelBtnProps={{
          label: t('#button.cancel'),
        }}
        ApplyBtnProps={{
          label:
            confirmationWindowState.type === 'unlock'
              ? t('#button.unlock')
              : confirmationWindowState.type === 'lock'
              ? t('#button.lock')
              : undefined,
          onClick:
            confirmationWindowState.type === 'unlock'
              ? unlockFiscalYear
              : confirmationWindowState.type === 'lock'
              ? lockFiscalYear
              : undefined,
          loading: lockFiscalYearState.loading,
          disabled: lockFiscalYearState.loading,
        }}
      />
    </>
  );
};

export default memo(TopBar);
