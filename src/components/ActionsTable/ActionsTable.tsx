import {
  ActionColumn,
  DefaultTableData,
  InnerTableComponentProps,
  SortModel,
} from 'models/TableModel';
import useSort from 'hooks/useSort';

import Table from '@mui/material/Table';
import TableHead, { CheckboxProps } from 'components/TableHead';
import TableBody from '@mui/material/TableBody';
import ActionsTableRow from './ActionsTableRow';

type WithCheckboxType =
  | {
      withCheckbox?: false;
      CheckboxProps?: undefined;
    }
  | { withCheckbox: true; CheckboxProps: CheckboxProps };

type ActionsTableProps<T extends object = DefaultTableData> = {
  className?: string;
  columns: ActionColumn<T>[];
  data: T[];
  sortParams?: SortModel<T>;
  HeadRowProps?: InnerTableComponentProps;
  BodyRowProps?: InnerTableComponentProps;
} & WithCheckboxType;

const ActionsTable = <T extends object = DefaultTableData>(
  props: ActionsTableProps<T>
) => {
  const {
    className,
    columns,
    data,
    sortParams: defaultSortParams,
    BodyRowProps,
    withCheckbox = false,
    CheckboxProps,
  } = props;
  const { list, sortParams, onChangeSortParams } = useSort(
    data,
    defaultSortParams
  );

  return (
    <Table className={className}>
      <TableHead
        withCheckbox={withCheckbox}
        columns={columns}
        sort={sortParams}
        onChangeSortParams={onChangeSortParams}
        CheckboxProps={CheckboxProps}
      />
      <TableBody>
        {list.map((item) => (
          <ActionsTableRow
            key={JSON.stringify(item)}
            data={item}
            columns={columns}
            RowProps={BodyRowProps}
            CheckboxCellProps={CheckboxProps?.BodyCellProps}
            withCheckbox={withCheckbox}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export type CheckboxPropsModel = CheckboxProps;

export default ActionsTable;
