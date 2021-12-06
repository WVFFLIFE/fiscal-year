import { useMemo, memo } from 'react';
import useLockFiscalYear from 'hooks/useLockFiscalYear';
import { useTranslation } from 'react-i18next';

import ConfirmationWindow from 'components/ConfirmationWindow';
import Button from 'components/Button';
import Error from 'components/Error';
import AddFiscalYearButton from 'components/AddFiscalYearButton';
import Title from 'components/Title';
import Box from '@mui/material/Box';
import {
  LockIcon,
  UnlockIcon,
  CopyIcon,
  RoundWarningIcon,
  TriangleWarningIcon,
} from 'components/Icons';

import { useStyles } from './style';

const TopBar: React.FC = () => {
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
    copyFiscalYear,
    handleOpenLockConfirmationWindow,
    handleOpenUnlockConfirmationWindow,
    handleOpenCopyConfirmationWindow,
    handleCloseConfirmationWindow,
    handleInitConfirmationWindowType,
  } = useLockFiscalYear();

  const cls = useMemo(
    () => ({
      startIcon: classes.icon,
    }),
    [classes]
  );

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
            <Button
              size="large"
              className={classes.offsetRight}
              classes={cls}
              label={t(
                isClosed ? '#common.unlockfiscalyear' : '#common.lockfiscalyear'
              )}
              startIcon={isClosed ? <UnlockIcon /> : <LockIcon />}
              onClick={
                isClosed
                  ? handleOpenUnlockConfirmationWindow
                  : handleOpenLockConfirmationWindow
              }
            />
            <Button
              className={classes.offsetRight}
              classes={cls}
              label={t('#button.copyfy')}
              startIcon={<CopyIcon />}
              onClick={handleOpenCopyConfirmationWindow}
            />
            <AddFiscalYearButton />
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
              : confirmationWindowState.type === 'copy'
              ? t('#common.copyfiscalyear')
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
            : confirmationWindowState.type === 'copy'
            ? t('#common.copyfiscalyear')
            : undefined
        }
        description={
          confirmationWindowState.type === 'unlock'
            ? t('#confirmation.unlock.description')
            : confirmationWindowState.type === 'lock'
            ? t('#confirmation.lock.description')
            : confirmationWindowState.type === 'copy'
            ? t('#confirmation.copy.description')
            : undefined
        }
        Icon={
          confirmationWindowState.type === 'copy' ? (
            <TriangleWarningIcon className={classes.yellowConfirmationIcon} />
          ) : (
            <RoundWarningIcon className={classes.redConfirmationIcon} />
          )
        }
        CancelBtnProps={{
          label: t('#button.cancel'),
        }}
        ApplyBtnProps={{
          label:
            confirmationWindowState.type === 'unlock'
              ? t('#button.unlock')
              : confirmationWindowState.type === 'lock'
              ? t('#button.lock')
              : confirmationWindowState.type === 'copy'
              ? t('#button.copy')
              : undefined,
          onClick:
            confirmationWindowState.type === 'unlock'
              ? unlockFiscalYear
              : confirmationWindowState.type === 'lock'
              ? lockFiscalYear
              : confirmationWindowState.type === 'copy'
              ? copyFiscalYear
              : undefined,
          loading: lockFiscalYearState.loading,
          disabled: lockFiscalYearState.loading,
        }}
      />
    </>
  );
};

export default memo(TopBar);
