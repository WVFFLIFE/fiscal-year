import { CSSProperties, MouseEvent } from 'react';

export type DefaultTableData = Record<string, any>;
export type SortParamsType = 'alphanumeric' | 'date';
export type Order = 'asc' | 'desc';

export interface InnerTableComponentProps {
  className?: string;
  style?: CSSProperties;
  onClick?: (event: MouseEvent<HTMLTableRowElement>) => void;
}

export interface SortModel<T extends object = DefaultTableData> {
  order: Order;
  orderBy: keyof T | string | null;
  type: SortParamsType;
}

export type RenderDataType =
  | 'string'
  | 'date'
  | 'datetime'
  | 'documentcode'
  | 'int'
  | 'float'
  | 'float6'
  | 'money'
  | 'translate';

export type DefaultColumn = {
  label: string;
  align?: 'left' | 'center' | 'right';
  sortable?: boolean;
  HeadCellProps?: InnerTableComponentProps;
  BodyCellProps?: InnerTableComponentProps;
};

export type Column<T extends object = DefaultTableData> = {
  field: keyof T | null;
  type?: RenderDataType | 'action';
} & DefaultColumn;

export type DeprecatedColumn<T extends object = DefaultTableData> = {
  style?: CSSProperties;
} & Column<T>;

export type ActionColumn<T extends object = DefaultTableData> = DefaultColumn &
  (
    | {
        field: keyof T;
        type?: RenderDataType;
        render?: (data: T) => JSX.Element | null;
      }
    | {
        field: null;
        type?: undefined;
        render: (data: T) => JSX.Element | null;
      }
  );
