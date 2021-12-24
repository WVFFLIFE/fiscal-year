import { CSSProperties, ChangeEvent } from 'react';
import { SortModel } from 'models';
import { Column } from 'models/TableModel';
import { CheckboxProps } from 'components/ActionsTable';

import { useTranslation } from 'react-i18next';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import SortedTableCell from 'components/SortedTableCell';
import { HeadTableCell } from 'components/Styled';
import Checkbox from 'components/Checkbox';

import clsx from 'clsx';

export interface TableHeadClasses {
  root?: string;
  cell?: string;
}
//TODO: remove style prop;
interface NestedColumn<T extends object = { [key: string]: any }>
  extends Column<T> {
  style?: CSSProperties;
}

type TableHeadProps<T extends object = { [key: string]: any }> = {
  className?: string;
  classes?: TableHeadClasses;
  columns: NestedColumn<T>[];
  sort?: SortModel<T>;
  onChangeSortParams?(orderBy: string, type?: 'alphanumeric' | 'date'): void;
  CheckboxHeadProps?: CheckboxProps['HeadProps'];
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
  CheckboxHeadProps,
}: TableHeadProps<T>) => {
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow className={clsx(classes?.root, className)}>
        {CheckboxHeadProps && (
          <HeadTableCell
            className={clsx(classes?.cell, CheckboxHeadProps.Cell?.className)}
            style={CheckboxHeadProps.Cell?.style}
          >
            <Checkbox
              checked={CheckboxHeadProps.selectedAll}
              onChange={CheckboxHeadProps.onToggleSelectAll}
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
