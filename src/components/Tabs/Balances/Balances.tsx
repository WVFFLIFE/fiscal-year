import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import PseudoTable, { PseudoTableColumn } from './PseudoTable';
import Box from '@mui/material/Box';
import ActionButton from 'components/ActionButton';
import { SubTitle } from 'components/Styled';
import { PlusIcon } from 'components/Icons';

import { useStyles } from './style';

export interface BalancesProps {
  PropertyMeintenanceProductName: string | null;
  PropertyMeintenanceSurplusDeficitPreviousFY: number | null;
  VATCalculationsProductName: string | null;
  VATCalculationsSurplusDeficitPreviousFY: number | null;
  SpecFinCalcProductName1: string | null;
  SpecFinCalcSurplusDeficitPreviousFY1: number | null;
  SpecFinCalcProductName2: string | null;
  SpecFinCalcSurplusDeficitPreviousFY2: number | null;
  SpecFinCalcProductName3: string | null;
  SpecFinCalcSurplusDeficitPreviousFY3: number | null;
  SpecFinCalcProductName4: string | null;
  SpecFinCalcSurplusDeficitPreviousFY4: number | null;
  SpecFinCalcProductName5: string | null;
  SpecFinCalcSurplusDeficitPreviousFY5: number | null;
}

type PropertyMaintenanceDataModel = Pick<
  BalancesProps,
  | 'PropertyMeintenanceProductName'
  | 'PropertyMeintenanceSurplusDeficitPreviousFY'
>;
type VATCalculationDataModel = Pick<
  BalancesProps,
  'VATCalculationsProductName' | 'VATCalculationsSurplusDeficitPreviousFY'
>;

const propertyMaintenanceColumns: PseudoTableColumn<PropertyMaintenanceDataModel>[] =
  [
    {
      label: '#tab.balances.propertymaintenance.productname',
      field: 'PropertyMeintenanceProductName',
      editable: true,
    },
    {
      label: '#tab.balances.propertymaintenance.deficit',
      field: 'PropertyMeintenanceSurplusDeficitPreviousFY',
      editable: true,
    },
  ];

const vatCalculationColumns: PseudoTableColumn<VATCalculationDataModel>[] = [
  {
    label: '#tab.balances.vatcalculation.productname',
    field: 'VATCalculationsProductName',
    editable: true,
  },
  {
    label: '#tab.balances.vatcalculation.deficit',
    field: 'VATCalculationsSurplusDeficitPreviousFY',
    editable: true,
  },
];

const Balances: React.FC<BalancesProps> = (props) => {
  const { t } = useTranslation();
  const classes = useStyles();

  const propertyMaintenanceData = {
    PropertyMeintenanceProductName: props.PropertyMeintenanceProductName,
    PropertyMeintenanceSurplusDeficitPreviousFY:
      props.PropertyMeintenanceSurplusDeficitPreviousFY,
  };

  const vatCalculationData = {
    VATCalculationsProductName: props.VATCalculationsProductName,
    VATCalculationsSurplusDeficitPreviousFY:
      props.VATCalculationsSurplusDeficitPreviousFY,
  };

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
          />
        </Box>
      </Box>
      <Box display="flex">
        <Box display="flex" width="100%">
          <Box flex={1} marginRight={4}>
            <SubTitle className={classes.subTitle}>
              {t('#tab.balances.specialfinancialcalculation.header')}
            </SubTitle>
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end">
            <ActionButton
              className={classes.addBtn}
              classes={{
                startIcon: classes.btnIcon,
              }}
              palette="darkBlue"
              startIcon={<PlusIcon />}
            >
              {t('#button.addnewproduct')}
            </ActionButton>
          </Box>
        </Box>
        <Box flex={1}></Box>
      </Box>
    </Box>
  );
};

export default Balances;
