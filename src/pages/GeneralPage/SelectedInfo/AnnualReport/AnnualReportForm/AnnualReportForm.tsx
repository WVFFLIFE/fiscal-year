import { useMemo } from 'react';
import useAnnualReportFormData from './useAnnualReportFormData';
import { useTranslation } from 'react-i18next';
import { CommonCooperativeModel, FiscalYearModel } from 'models';
import generalConfig from 'configs/general';

import Box from '@mui/material/Box';
import CooperativesPicker from 'components/CooperativesPicker';
import FiscalYearPicker from 'components/FiscalYearPicker';
import CheckboxControl from 'components/CheckboxControl';
import ActionButton from 'components/ActionButton';
import CaretRightIcon from 'components/Icons/ArrowRightIcon';
import Dialog from 'components/Dialog';
import SuccessDialogView from 'components/SuccessDialogView';
import DialogError from 'components/DialogError';

import { useStyles } from './style';

export interface AnnualReportFormProps {
  selectedCooperative: CommonCooperativeModel;
  selectedFiscalYear: FiscalYearModel;
}

const mock = () => {};

const Divider = () => {
  return (
    <Box
      sx={{
        marginLeft: '15px',
        marginRight: '15px',
      }}
    >
      <CaretRightIcon
        style={{ fontSize: 32, color: 'rgba(100, 121, 143, 1)' }}
      />
    </Box>
  );
};

const AnnualReportForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    state,
    filters,
    successDialog,
    handleLoadReports,
    handleChangeSelectedGroup,
    handleSelectAll,
    handleInitError,
    handleSaveToDocuments,
  } = useAnnualReportFormData();

  const CheckboxClasses = useMemo(
    () => ({
      label: classes.checkboxLabel,
    }),
    [classes]
  );

  const { isIndeterminated, selectedAll } = useMemo(() => {
    const valuesList = Object.values(state.selectedGroups);
    const selectedAll = valuesList.every(Boolean);
    const isIndeterminated = valuesList.some(Boolean) && !selectedAll;

    return { isIndeterminated, selectedAll };
  }, [state.selectedGroups]);

  const selectedCooperatives = useMemo(
    () => (filters.cooperatives.current ? [filters.cooperatives.current] : []),
    [filters.cooperatives]
  );

  return (
    <div className={classes.root}>
      <div>
        <Box marginBottom="20px">
          <CooperativesPicker
            disabled
            cooperatives={filters.cooperatives.list}
            selectedCooperatives={selectedCooperatives}
            onSelectCooperatives={mock}
          />
        </Box>
        <FiscalYearPicker
          disabled
          value={filters.fiscalYears.current}
          options={filters.fiscalYears.list}
          onSelectFiscalYear={mock}
        />
      </div>
      <Divider />
      <ul className={classes.selectionList}>
        <li className={classes.selectionListItem}>
          <CheckboxControl
            classes={CheckboxClasses}
            label={t('#dialog.annualreport.selection.all')}
            checked={selectedAll}
            onChange={handleSelectAll}
            indeterminate={isIndeterminated}
          />
        </li>
        {generalConfig.annualReportPage.selectionList.map((group) => {
          const checked = state.selectedGroups[group.id];
          return (
            <li key={group.id} className={classes.selectionListItem}>
              <CheckboxControl
                classes={CheckboxClasses}
                label={t(group.headerName)}
                name={group.id}
                checked={checked}
                onChange={handleChangeSelectedGroup}
              />
            </li>
          );
        })}
      </ul>
      <Divider />
      <div className={classes.btnsWrapper}>
        <ActionButton
          palette="darkBlue"
          className={classes.loadBtn}
          onClick={handleLoadReports}
          disabled={state.creating || state.saving}
          loading={state.creating}
        >
          {t('#dialog.annualreport.button.load')}
        </ActionButton>
        <ActionButton
          palette="darkBlue"
          onClick={handleSaveToDocuments}
          disabled={state.creating || state.saving}
          loading={state.saving}
        >
          {t('#dialog.annualreport.button.savetodocuments')}
        </ActionButton>
      </div>
      <Dialog
        maxWidth="xs"
        open={successDialog.isOpen}
        handleClose={successDialog.close}
        title={'Notification'}
      >
        <SuccessDialogView
          text={t('#dialog.annualreport.savetodocuments.success')}
          onClose={successDialog.close}
        />
      </Dialog>
      <DialogError error={state.error} initError={handleInitError} />
    </div>
  );
};

export default AnnualReportForm;
