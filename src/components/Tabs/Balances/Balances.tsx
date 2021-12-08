import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { GeneralFiscalYearModel } from 'models';
import useBalancesData, { isProductEmpty } from './useBalancesData';
import { toNumberFormat } from 'utils';
import _get from 'lodash/get';

import AddForm from './AddForm';
import PseudoTable, { PseudoTableColumn } from './PseudoTable';
import Box from '@mui/material/Box';
import ActionButton from 'components/ActionButton';
import { SubTitle } from 'components/Styled';
import { PlusIcon } from 'components/Icons';
import Dialog from 'components/Dialog';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';

import clsx from 'clsx';
import { useStyles } from './style';

type PropertyMaintenanceDataModel = Pick<
  GeneralFiscalYearModel,
  | 'PropertyMeintenanceProductName'
  | 'PropertyMeintenanceSurplusDeficitPreviousFY'
>;
type VATCalculationDataModel = Pick<
  GeneralFiscalYearModel,
  'VATCalculationsProductName' | 'VATCalculationsSurplusDeficitPreviousFY'
>;

function makeData<T extends { field: string }>(
  columns: T[],
  data: { [key: string]: any } | null
) {
  return columns.reduce((acc, next) => {
    const { field } = next;

    acc[field] = data ? data[field] : null;
    return acc;
  }, {} as { [key: string]: any });
}

const Balances: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const btnCls = useMemo(
    () => ({
      startIcon: classes.btnIcon,
    }),
    [classes]
  );

  const {
    isClosed,
    isDisabledAddNewProductBtn,
    requestState,
    generalData,
    openAddProductDialog,
    handleCloseProductDialog,
    handleOpenProductDialog,
    handleSaveFields,
    handleInitError,
  } = useBalancesData();

  const propertyMaintenanceColumns: PseudoTableColumn<PropertyMaintenanceDataModel>[] =
    useMemo(
      () => [
        {
          label: '#tab.balances.propertymaintenance.productname',
          field: 'PropertyMeintenanceProductName',
          editable: true,
        },
        {
          label: '#tab.balances.propertymaintenance.deficit',
          field: 'PropertyMeintenanceSurplusDeficitPreviousFY',
          editable: true,
          type: 'number',
          render: (data: PropertyMaintenanceDataModel) => (
            <span className={classes.deficit}>
              {toNumberFormat(data.PropertyMeintenanceSurplusDeficitPreviousFY)}
            </span>
          ),
        },
      ],
      [classes]
    );

  const vatCalculationColumns: PseudoTableColumn<VATCalculationDataModel>[] =
    useMemo(
      () => [
        {
          label: '#tab.balances.vatcalculation.productname',
          field: 'VATCalculationsProductName',
          editable: true,
        },
        {
          label: '#tab.balances.vatcalculation.deficit',
          field: 'VATCalculationsSurplusDeficitPreviousFY',
          editable: true,
          type: 'number',
          render: (data: VATCalculationDataModel) => (
            <span className={classes.deficit}>
              {toNumberFormat(data.VATCalculationsSurplusDeficitPreviousFY)}
            </span>
          ),
        },
      ],
      [classes]
    );

  const specFinCalcColumnsList: Array<PseudoTableColumn[]> = Array.from(
    { length: 5 },
    (_, i) => i + 1
  ).map((n) => [
    {
      label: '#tab.balances.specialfinancialcalculation.productname',
      field: `SpecFinCalcProductName${n}`,
      editable: true,
    },
    {
      label: '#tab.balances.specialfinancialcalculation.deficit',
      field: `SpecFinCalcSurplusDeficitPreviousFY${n}`,
      editable: true,
      type: 'number',
      render: (data) => (
        <span className={classes.deficit}>
          {toNumberFormat(
            _get(data, `SpecFinCalcSurplusDeficitPreviousFY${n}`)
          )}
        </span>
      ),
    },
  ]);

  const propertyMaintenanceData = useMemo(
    () => ({
      PropertyMeintenanceProductName:
        generalData?.PropertyMeintenanceProductName || null,
      PropertyMeintenanceSurplusDeficitPreviousFY:
        generalData?.PropertyMeintenanceSurplusDeficitPreviousFY || null,
    }),
    [generalData]
  );

  const vatCalculationData = useMemo(
    () => ({
      VATCalculationsProductName:
        generalData?.VATCalculationsProductName || null,
      VATCalculationsSurplusDeficitPreviousFY:
        generalData?.VATCalculationsSurplusDeficitPreviousFY || null,
    }),
    [generalData]
  );

  return (
    <Box>
      <Box display="flex" marginBottom={8}>
        <Box flex={1} marginRight={4}>
          <SubTitle className={classes.subTitle}>
            {t('#tab.balances.propertymaintenance.header')}
          </SubTitle>
          <PseudoTable
            columns={propertyMaintenanceColumns}
            data={propertyMaintenanceData}
            className={classes.propertyMaintenanceRow}
            onSave={handleSaveFields}
            disabled={isClosed}
          />
        </Box>
        <Box flex={1}>
          <SubTitle className={classes.subTitle}>
            {t('#tab.balances.vatcalculation.header')}
          </SubTitle>
          <PseudoTable
            columns={vatCalculationColumns}
            data={vatCalculationData}
            className={classes.vatCalculationRow}
            onSave={handleSaveFields}
            disabled={isClosed}
          />
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        <Box display="flex" width="100%" marginBottom={4}>
          <Box flex={1} marginRight={4}>
            <SubTitle className={clsx(classes.subTitle, classes.initMargin)}>
              {t('#tab.balances.specialfinancialcalculation.header')}
            </SubTitle>
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <ActionButton
              className={classes.addBtn}
              classes={btnCls}
              palette="darkBlue"
              startIcon={<PlusIcon />}
              onClick={handleOpenProductDialog}
              disabled={isClosed || isDisabledAddNewProductBtn}
            >
              {t('#button.addnewproduct')}
            </ActionButton>
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {specFinCalcColumnsList.map((specFinCalcColumn, i) => {
            const data = makeData(specFinCalcColumn, generalData);
            const visible =
              !isProductEmpty(
                data[`SpecFinCalcProductName${i + 1}`],
                data[`SpecFinCalcSurplusDeficitPreviousFY${i + 1}`]
              ) &&
              generalData &&
              (generalData as { [key: string]: any })[`Show${i + 1}`];
            return (
              visible && (
                <Box
                  width="100%"
                  maxWidth="calc(50% - 10px)"
                  marginBottom={8}
                  className={classes.oddBox}
                  key={`SpecFinCalcProductName${i + 1}`}
                >
                  <PseudoTable
                    columns={specFinCalcColumn}
                    data={data}
                    className={classes.specFinCalcRow}
                    onSave={handleSaveFields}
                    disabled={isClosed}
                  />
                </Box>
              )
            );
          })}
        </Box>
      </Box>
      <Dialog
        open={openAddProductDialog}
        maxWidth="sm"
        handleClose={handleCloseProductDialog}
      >
        <AddForm onClose={handleCloseProductDialog} />
      </Dialog>
      <Backdrop loading={requestState.loading} />
      <DialogError error={requestState.error} initError={handleInitError} />
    </Box>
  );
};

export default Balances;
