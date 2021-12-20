import { SortModel } from 'models';
import { Column } from 'models/TableModel';

import { useTranslation } from 'react-i18next';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import SortedTableCell from 'components/SortedTableCell';
import { HeadTableCell } from 'components/Styled';
import Checkbox from 'components/Checkbox';

import clsx from 'clsx';
import { CSSProperties } from 'react';

export type CheckboxProps = {
  HeadCellProps?: {
    className?: string;
    style?: CSSProperties;
  };
  BodyCellProps?: {
    className?: string;
    style?: CSSProperties;
  };
  selectedAll: boolean;
  onToggleSelectAll(): void;
};

export interface TableHeadClasses {
  root?: string;
  cell?: string;
}
//TODO: remove style;
interface NestedColumn<T extends object = { [key: string]: any }>
  extends Column<T> {
  style?: CSSProperties;
}

type TableHeadProps<T extends object = { [key: string]: any }> = {
  className?: string;
  classes?: TableHeadClasses;
  columns: NestedColumn<T>[];
  sort?: SortModel<T>;
  selectedAll?: boolean;
  onChangeSortParams?(orderBy: string, type?: 'alphanumeric' | 'date'): void;
  withCheckbox?: boolean;
  CheckboxProps?: CheckboxProps;
};

function switchColumnTypeToSort(colType: Column['type']) {
  switch (colType) {
    case 'string':
    case 'int':
      return 'alphanumeric';
    case 'date':
    case 'datetime':
      return 'date';
    default:
      return 'alphanumeric';
  }
}

const TableHead = <T extends object = { [key: string]: any }>({
  className,
  classes,
  columns,
  sort,
  onChangeSortParams,
  withCheckbox = false,
  CheckboxProps,
}: TableHeadProps<T>) => {
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow className={clsx(classes?.root, className)}>
        {withCheckbox && (
          <HeadTableCell
            className={CheckboxProps?.HeadCellProps?.className}
            style={CheckboxProps?.HeadCellProps?.style}
          >
            <Checkbox
              checked={CheckboxProps?.selectedAll}
              onChange={CheckboxProps?.onToggleSelectAll}
            />
          </HeadTableCell>
        )}

        {columns.map(
          ({
            sortable = true,
            style,
            field,
            align,
            label,
            type,
            HeadCellProps,
          }) => {
            const sortType = switchColumnTypeToSort(type);
            return sort && sortable ? (
              <SortedTableCell
                className={clsx(classes?.cell, HeadCellProps?.className)}
                key={field as string}
                type={sortType}
                component="th"
                order={sort.order}
                orderBy={sort.orderBy as string}
                onChangeSortParams={onChangeSortParams}
                field={field as string}
                align={align || 'left'}
                style={{ ...style, ...HeadCellProps?.style }}
              >
                {t(label)}
              </SortedTableCell>
            ) : (
              <HeadTableCell
                key={field as string}
                className={clsx(classes?.cell, HeadCellProps?.className)}
                component="th"
                align={align || 'left'}
                style={{ ...style, ...HeadCellProps?.style }}
              >
                {t(label)}
              </HeadTableCell>
            );
          }
        )}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
