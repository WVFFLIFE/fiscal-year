import { CSSProperties, MouseEvent, ChangeEvent } from 'react';
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

export type CheckboxProps<T extends object = DefaultTableData> = {
  HeadProps: {
    selectedAll: boolean;
    onToggleSelectAll(event: ChangeEvent<HTMLInputElement>): void;
    Cell?: {
      className?: string;
      style?: CSSProperties;
    };
  };
  BodyProps: {
    Cell?: {
      className?: string;
      style?: CSSProperties;
    };
    Row: (data: T) => {
      className?: string;
      style?: CSSProperties;
      checked: boolean;
      onClick(e: MouseEvent<HTMLTableRowElement>): void;
    };
  };
};

type ActionsTableProps<T extends object = DefaultTableData> = {
  className?: string;
  columns: ActionColumn<T>[];
  data: T[];
  sortParams?: SortModel<T>;
  HeadRowProps?: Omit<InnerTableComponentProps, 'onClick'>;
  BodyRowProps?: InnerTableComponentProps;
  CheckboxProps?: CheckboxProps<T>;
};

const ActionsTable = <T extends object = DefaultTableData>(
  props: ActionsTableProps<T>
) => {
  const {
    className,
    columns,
    data,
    sortParams: defaultSortParams,
    BodyRowProps,
    CheckboxProps,
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
        CheckboxHeadProps={CheckboxProps?.HeadProps}
      />
      <TableBody>
        {list.map((item) => (
          <ActionsTableRow
            key={JSON.stringify(item)}
            data={item}
            columns={columns}
            RowProps={BodyRowProps}
            CheckboxProps={CheckboxProps?.BodyProps}
          />
        ))}
      </TableBody>
    </Table>
  );
};

export default ActionsTable;
