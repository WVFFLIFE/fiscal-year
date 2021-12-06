import { useMemo, memo } from 'react';
import useLockFiscalYear from 'hooks/useLockFiscalYear';
import { useTranslation } from 'react-i18next';

import ConfirmationWindow from 'components/ConfirmationWindow';
import Button from 'components/Button';
import AddFiscalYearButton from 'components/AddFiscalYearButton';
import Title from 'components/Title';
import Box from '@mui/material/Box';
import DialogError from 'components/DialogError';
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
              disabled={isClosed}
              label={t('#button.copyfy')}
              startIcon={<CopyIcon />}
              onClick={handleOpenCopyConfirmationWindow}
            />
            <AddFiscalYearButton disabled={isClosed} />
          </Box>
        )}
      </Box>
      <DialogError
        error={lockFiscalYearState.error}
        initError={handleInitError}
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
          onClick: isClosed ? unlockFiscalYear : lockFiscalYear,
          loading: lockFiscalYearState.loading,
          disabled: lockFiscalYearState.loading,
        }}
      />
    </>
  );
};

export default memo(TopBar);
