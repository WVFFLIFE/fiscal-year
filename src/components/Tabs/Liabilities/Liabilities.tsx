import { useMemo } from 'react';
import useLiabilitiesData from './useLiabilitiesData';
import { ActionColumn, InnerTableComponentProps } from 'models/TableModel';
import { EnhancedLiability } from 'utils/liabilities';

import ActionsTable from 'components/ActionsTable';

import { useStyles } from './style';

const Liabilities = () => {
  const classes = useStyles();
  const { requestState } = useLiabilitiesData();

  const columns: ActionColumn<EnhancedLiability>[] = [
    {
      label: '#tab.liabilities.table.liabilityname',
      field: 'name',
      HeadCellProps: {
        className: classes.fixed,
        style: { width: 170, left: 0, background: '#fff' },
      },
      BodyCellProps: {
        className: classes.fixed,
        style: { left: 0 },
      },
    },
    {
      label: '#tab.liabilities.table.liabilitytype',
      field: 'liabilityTypeLabel',
      HeadCellProps: {
        style: { width: 150 },
      },
    },
    // {
    //   label: '#tab.liabilities.table.liabilityparty',
    //   field: ''
    // },
    {
      align: 'right',
      label: '#tab.liabilities.table.startdate',
      field: 'startDate',
      type: 'date',
      HeadCellProps: {
        style: { width: 120 },
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.enddate',
      field: 'endDate',
      type: 'date',
      HeadCellProps: {
        style: { width: 120 },
      },
    },
    {
      label: '#tab.liabilities.table.documentnumber',
      field: 'documentNumber',
      HeadCellProps: {
        style: { width: 200 },
      },
    },
    {
      label: '#tab.liabilities.table.usage',
      field: 'liabilityUsageLabel',
      HeadCellProps: {
        style: { width: 150 },
      },
    },
    {
      label: '#tab.liabilities.table.product',
      field: 'liabilityProductLabel',
      HeadCellProps: {
        style: { width: 200 },
      },
    },
    {
      label: '#tab.liabilities.table.type',
      field: 'liabilityTypeLabel',
      HeadCellProps: {
        style: { width: 150 },
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.quantity',
      field: 'quantity',
      type: 'float',
      HeadCellProps: {
        style: { width: 150 },
      },
    },
    {
      align: 'right',
      label: '#tab.liabilities.table.priceitemrate',
      field: 'priceItemRate',
      type: 'float',
      HeadCellProps: {
        style: { width: 150 },
      },
    },
    {
      align: 'left',
      label: '#tab.liabilities.table.action',
      field: null,
      type: 'action',
      sortable: false,
      actions: () => <div></div>,
      HeadCellProps: {
        style: { width: 200 },
      },
    },
  ];

  const ActionsTableRowProps: InnerTableComponentProps = useMemo(
    () => ({
      className: classes.row,
    }),
    [classes]
  );

  return (
    <div className={classes.root}>
      <ActionsTable
        className={classes.table}
        data={requestState.liabilities}
        columns={columns}
        BodyRowProps={ActionsTableRowProps}
      />
    </div>
  );
};

export default Liabilities;
