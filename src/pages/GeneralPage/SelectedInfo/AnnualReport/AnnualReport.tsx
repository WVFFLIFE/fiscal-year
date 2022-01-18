import { memo, FC } from 'react';
import useToggleSwitch from 'hooks/useToggleSwitch';
import { useTranslation } from 'react-i18next';

import Dialog from 'components/Dialog';
import ActionButton from 'components/ActionButton';
import ReportIcon from 'components/Icons/ReportIcon';
import AnnualReportForm from './AnnualReportForm';

import { useStyles } from './style';

const AnnualReport: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const [openAnnualReportDialog, toggleAnnualReportDialogVisibility] =
    useToggleSwitch();

  return (
    <>
      <ActionButton
        className={classes.btn}
        startIcon={<ReportIcon />}
        onClick={toggleAnnualReportDialogVisibility}
      >
        {t('#button.annualreportpage')}
      </ActionButton>
      <Dialog
        open={openAnnualReportDialog}
        handleClose={toggleAnnualReportDialogVisibility}
        title={t('#dialog.annualreport.title')}
      >
        <AnnualReportForm />
      </Dialog>
    </>
  );
};

export default memo(AnnualReport);