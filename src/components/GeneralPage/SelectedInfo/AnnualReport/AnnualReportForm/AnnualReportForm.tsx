import { useMemo } from 'react';
import useAnnualReportFormData from './useAnnualReportFormData';
import { useTranslation } from 'react-i18next';
import { CommonCooperativeModel, FiscalYearModel } from 'models';
import generalConfig from 'configs/general';

import CooperativesPicker from 'components/CooperativesPicker';
import FiscalYearPicker from 'components/FiscalYearPicker';
import CheckboxControl from 'components/CheckboxControl';
import ActionButton from 'components/ActionButton';
import CaretRightIcon from 'components/Icons/ArrowRightIcon';
import Box from '@mui/material/Box';

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
    selectedAll,
    handleChangeSelectedGroup,
    handleSelectAll,
  } = useAnnualReportFormData();

  const CheckboxClasses = useMemo(
    () => ({
      label: classes.checkboxLabel,
    }),
    [classes]
  );

  return (
    <div className={classes.root}>
      <div>
        <Box marginBottom="20px">
          <CooperativesPicker
            disabled
            cooperatives={filters.cooperatives.list}
            selectedCooperatives={
              filters.cooperatives.current ? [filters.cooperatives.current] : []
            }
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
            indeterminate={!!state.selectedGroups.length && !selectedAll}
          />
        </li>
        {generalConfig.annualReportPage.selectionList.map((group) => {
          const checked = state.selectedGroups.includes(group.id);
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
        <ActionButton palette="darkBlue" className={classes.loadBtn}>
          {t('#dialog.annualreport.button.load')}
        </ActionButton>
        <ActionButton palette="darkBlue">
          {t('#dialog.annualreport.button.savetodocuments')}
        </ActionButton>
      </div>
    </div>
  );
};

export default AnnualReportForm;
