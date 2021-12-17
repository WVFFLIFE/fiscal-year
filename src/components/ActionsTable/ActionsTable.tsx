import {
  ActionColumn,
  DefaultTableData,
  InnerTableComponentProps,
  SortModel,
} from 'models/TableModel';
import useSort from 'hooks/useSort';

import Table from '@mui/material/Table';
import TableHead from 'components/TableHead';
import TableBody from '@mui/material/TableBody';
import ActionsTableRow from './ActionsTableRow';

interface ActionsTableProps<T extends object = DefaultTableData> {
  className?: string;
  columns: ActionColumn<T>[];
  data: T[];
  sortParams?: SortModel<T>;
  HeadRowProps?: InnerTableComponentProps;
  BodyRowProps?: InnerTableComponentProps;
}

const ActionsTable = <T extends object = DefaultTableData>(
  props: ActionsTableProps<T>
) => {
  const {
    className,
    columns,
    data,
    sortParams: defaultSortParams,
    BodyRowProps,
  } = props;
  const { list, sortParams, onChangeSortParams } = useSort(
    data,
    defaultSortParams
  );

  return (
    <Table className={className}>
      <TableHead
        columns={columns}
        sort={sortParams}
        onChangeSortParams={onChangeSortParams}
      />
      <TableBody>
        {list.map((item) => (
          <ActionsTableRow
            key={JSON.stringify(item)}
            data={item}
            columns={columns}
            RowProps={BodyRowProps}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ActionsTable;
