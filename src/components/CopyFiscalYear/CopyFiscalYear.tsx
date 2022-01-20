import { useTranslation } from 'react-i18next';
import useCopyFiscalYearData from './useCopyFiscalYearData';
import useStateSelector from 'hooks/useStateSelector';

import {
  selectIsClosedField,
  selectHasPreviousFiscalYear,
} from 'selectors/generalPageSelectors';

import ConfirmationWindow from 'components/ConfirmationWindow';
import ActionButton from 'components/ActionButton';
import DialogError from 'components/DialogError';
import { CopyIcon, TriangleWarningIcon } from 'components/Icons';

import { useStyles } from './style';

const CopyFiscalYear = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const { isClosed, hasPrevFiscalYear } = useStateSelector((state) => ({
    isClosed: selectIsClosedField(state),
    hasPrevFiscalYear: selectHasPreviousFiscalYear(state),
  }));

  const {
    requestState,
    openConfirmationDialog,
    handleCopyFiscalYear,
    handleInitError,
    toggleConfirmationDialogVisibility,
  } = useCopyFiscalYearData();

  const ApplyBtnProps = {
    label: t(hasPrevFiscalYear ? '#button.copy' : '#button.ok'),
    loading: requestState.loading,
    disabled: requestState.loading,
    onClick: hasPrevFiscalYear
      ? handleCopyFiscalYear
      : toggleConfirmationDialogVisibility,
  };
  const CancelBtnProps = hasPrevFiscalYear
    ? {
        label: t('#button.cancel'),
      }
    : undefined;

  return (
    <>
      <ActionButton
        size="large"
        startIcon={<CopyIcon />}
        disabled={isClosed}
        onClick={toggleConfirmationDialogVisibility}
      >
        {t('#button.copyfy')}
      </ActionButton>
      <ConfirmationWindow
        maxWidth="sm"
        open={openConfirmationDialog}
        handleClose={toggleConfirmationDialogVisibility}
        title={t('#common.copyfiscalyear')}
        description={t(
          hasPrevFiscalYear
            ? '#confirmation.copy.description'
            : '#confirmation.copy.description.noprevfy'
        )}
        Icon={<TriangleWarningIcon className={classes.confirmationIcon} />}
        ApplyBtnProps={ApplyBtnProps}
        CancelBtnProps={CancelBtnProps}
      />
      <DialogError error={requestState.error} initError={handleInitError} />
    </>
  );
};

export default CopyFiscalYear;
