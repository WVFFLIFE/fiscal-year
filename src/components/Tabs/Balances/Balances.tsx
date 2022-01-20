import { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Column } from './BalancesTable/models';

import useBalancesData from './useBalancesData';

import { BalanceProductModel, CommonProductDataModel } from 'utils/fiscalYear';
import { toNumberFormat } from 'utils';
import { savingInterceptor } from './utils';

import AddForm from './AddForm';
import BalancesTable from './BalancesTable';
import Box from '@mui/material/Box';
import ActionButton from 'components/ActionButton';
import { SubTitle } from 'components/Styled';
import { PlusIcon } from 'components/Icons';
import Dialog from 'components/Dialog';
import Highlight from 'components/Highlight';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';

import clsx from 'clsx';
import { useStyles } from './style';

const Balances: FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();

  const {
    products,
    propertyMaintenanceData,
    vatCalculationData,
    isClosed,
    isDisabledAddNewProductBtn,
    requestState,
    showDialog,
    toggleShowDialog,
    handleSaveFields,
    handleInitError,
  } = useBalancesData();

  const btnCls = useMemo(
    () => ({
      startIcon: classes.btnIcon,
    }),
    [classes]
  );

  const propertyMaintenanceColumns: Column<CommonProductDataModel>[] = useMemo(
    () => [
      {
        id: 'PropertyMeintenanceProductName',
        label: '#tab.balances.propertymaintenance.productname',
        field: 'productName',
        editable: false,
        type: 'string',
        onSave: (output, ...rest) =>
          savingInterceptor(
            output,
            {
              type: 'property-maintenance',
              property: 'productName',
            },
            (req) => handleSaveFields(req, ...rest)
          ),
      },
      {
        id: 'PropertyMeintenanceSurplusDeficitPreviousFY',
        label: '#tab.balances.propertymaintenance.deficit',
        field: 'surplusDeficitPreviousFY',
        editable: true,
        type: 'number',
        render: (data) => {
          const text = toNumberFormat(data.surplusDeficitPreviousFY);
          return (
            <span className={classes.deficit}>
              {text && <Highlight text={text} />}
            </span>
          );
        },
        onSave: (output, ...rest) =>
          savingInterceptor(
            output,
            {
              type: 'property-maintenance',
              property: 'surplusDeficitPreviousFY',
            },
            (req) => handleSaveFields(req, ...rest)
          ),
      },
    ],
    [classes, handleSaveFields]
  );

  const vatCalculationColumns: Column<CommonProductDataModel>[] = useMemo(
    () => [
      {
        id: 'VATCalculationsProductName',
        label: '#tab.balances.vatcalculation.productname',
        field: 'productName',
        editable: false,
        type: 'string',
        onSave: (output, ...rest) =>
          savingInterceptor(
            output,
            {
              type: 'vat-calculation',
              property: 'productName',
            },
            (req) => handleSaveFields(req, ...rest)
          ),
      },
      {
        id: 'VATCalculationsSurplusDeficitPreviousFY',
        label: '#tab.balances.vatcalculation.deficit',
        field: 'surplusDeficitPreviousFY',
        editable: true,
        type: 'number',
        render: (data) => {
          const text = toNumberFormat(data.surplusDeficitPreviousFY);
          return (
            <span className={classes.deficit}>
              {text && <Highlight text={text} />}
            </span>
          );
        },
        onSave: (output, ...rest) =>
          savingInterceptor(
            output,
            {
              type: 'vat-calculation',
              property: 'surplusDeficitPreviousFY',
            },
            (req) => handleSaveFields(req, ...rest)
          ),
      },
    ],
    [classes, handleSaveFields]
  );

  const productsList:
    | [BalanceProductModel, Column<BalanceProductModel>[]][]
    | null = useMemo(() => {
    if (!products) return null;

    return products.map((product) => [
      product,
      [
        {
          id: `SpecFinCalcProductName${product.index}`,
          label: '#tab.balances.specialfinancialcalculation.productname',
          field: 'productName',
          editable: true,
          type: 'string',
          onSave: (output, ...rest) =>
            savingInterceptor(
              output,
              {
                type: 'product',
                index: product.index,
                property: 'productName',
              },
              (req) => handleSaveFields(req, ...rest)
            ),
        },
        {
          id: `SpecFinCalcSurplusDeficitPreviousFY${product.index}`,
          label: '#tab.balances.specialfinancialcalculation.deficit',
          field: 'surplusDeficitPreviousFY',
          editable: true,
          type: 'number',
          render: (data) => {
            const text = toNumberFormat(data.surplusDeficitPreviousFY);
            return (
              <span className={classes.deficit}>
                {text && <Highlight text={text} />}
              </span>
            );
          },
          onSave: (output, ...rest) =>
            savingInterceptor(
              output,
              {
                type: 'product',
                index: product.index,
                property: 'surplusDeficitPreviousFY',
              },
              (req) => handleSaveFields(req, ...rest)
            ),
        },
      ],
    ]);
  }, [classes, products, handleSaveFields]);

  return (
    <Box>
      <Box display="flex" marginBottom={8}>
        <Box flex={1} marginRight={4}>
          <SubTitle className={classes.subTitle}>
            {t('#tab.balances.propertymaintenance.header')}
          </SubTitle>
          {propertyMaintenanceData && (
            <BalancesTable
              columns={propertyMaintenanceColumns}
              data={propertyMaintenanceData}
              className={classes.propertyMaintenanceRow}
              disabled={isClosed}
            />
          )}
        </Box>
        <Box flex={1}>
          <SubTitle className={classes.subTitle}>
            {t('#tab.balances.vatcalculation.header')}
          </SubTitle>
          {vatCalculationData && (
            <BalancesTable
              columns={vatCalculationColumns}
              data={vatCalculationData}
              className={classes.vatCalculationRow}
              disabled={isClosed}
            />
          )}
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
              onClick={toggleShowDialog}
              disabled={isClosed || isDisabledAddNewProductBtn}
            >
              {t('#button.addnewproduct')}
            </ActionButton>
          </Box>
        </Box>
        <Box display="flex" flexWrap="wrap">
          {productsList &&
            productsList.map((productList) => {
              const [product, columns] = productList;

              return (
                product.visible && (
                  <Box
                    key={product.index}
                    width="100%"
                    maxWidth="calc(50% - 10px)"
                    marginBottom={8}
                    className={classes.oddBox}
                  >
                    <BalancesTable
                      columns={columns}
                      data={product}
                      className={classes.specFinCalcRow}
                      disabled={isClosed}
                    />
                  </Box>
                )
              );
            })}
        </Box>
      </Box>
      <Dialog open={showDialog} maxWidth="sm" handleClose={toggleShowDialog}>
        <AddForm onClose={toggleShowDialog} />
      </Dialog>
      <Backdrop loading={requestState.loading} />
      <DialogError error={requestState.error} initError={handleInitError} />
    </Box>
  );
};

export default Balances;
