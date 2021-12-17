import { CSSProperties } from 'react';

export type DefaultTableData = { [key: string]: any };
export type SortParamsType = 'alphanumeric' | 'date';
export type Order = 'asc' | 'desc';

export interface InnerTableComponentProps {
  className?: string;
  style?: CSSProperties;
}

export interface SortModel<T extends object = DefaultTableData> {
  order: Order;
  orderBy: keyof T;
  type: SortParamsType;
}

export type ColumnDataType =
  | 'string'
  | 'date'
  | 'datetime'
  | 'documentcode'
  | 'int'
  | 'float';

export type DefaultColumn = {
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  HeadCellProps?: InnerTableComponentProps;
  BodyCellProps?: InnerTableComponentProps;
};

export type Column<T extends object = DefaultTableData> = {
  field: keyof T | null;
  type?: ColumnDataType | 'action';
} & DefaultColumn;

export type DeprecatedColumn<T extends object = DefaultTableData> = {
  style?: CSSProperties;
} & Column<T>;

export type ActionColumn<T extends object = DefaultTableData> = DefaultColumn &
  (
    | {
        field: keyof T;
        type?: ColumnDataType;
      }
    | {
        field: null;
        type: 'action';
        actions: (data: T) => JSX.Element | null;
      }
  );
