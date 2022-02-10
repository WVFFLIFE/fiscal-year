import { CSSProperties, MouseEvent, ChangeEvent } from 'react';
import {
  ActionColumn,
  DefaultTableData,
  InnerTableComponentProps,
  SortModel,
  SortParamsType,
} from './models';

import Table from '@mui/material/Table';
import TableHead from './TableHead';
import TableBody from '@mui/material/TableBody';
import ActionsTableRow from './ActionsTableRow';

export type CheckboxProps<T extends object = DefaultTableData> = {
  HeadProps: {
    show?: boolean;
    selectedAll: boolean;
    indeterminate?: boolean;
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
      onClick?: (e: MouseEvent<HTMLTableRowElement>) => void;
      onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    };
  };
};

type ActionsTableProps<T extends object = DefaultTableData> = {
  /**
   * Class name that applies to table
   */
  className?: string;
  /**
   * List of columns
   */
  columns: ActionColumn<T>[];
  data: T[];
  sortParams?: SortModel<T>;
  onChangeSortParams?(id: keyof T | string, type: SortParamsType): void;
  /**
   * If true - highlight searched text
   * @default false
   */
  highlight?: boolean;
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
    sortParams,
    onChangeSortParams,
    highlight = false,
    BodyRowProps,
    CheckboxProps,
  } = props;

  return (
    <Table className={className}>
      <TableHead
        columns={columns}
        sort={sortParams}
        onChangeSortParams={onChangeSortParams}
        CheckboxHeadProps={CheckboxProps?.HeadProps}
      />
      <TableBody>
        {data.map((item) => (
          <ActionsTableRow
            key={JSON.stringify(item)}
            highlight={highlight}
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
