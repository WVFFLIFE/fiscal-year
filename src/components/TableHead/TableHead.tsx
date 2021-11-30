import { Column, SortModel } from 'models';

import { useTranslation } from 'react-i18next';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import SortedTableCell from 'components/SortedTableCell';
import { HeadTableCell } from 'components/Styled';

import clsx from 'clsx';

export interface TableHeadClasses {
  root?: string;
  cell?: string;
}

interface TableHeadProps {
  className?: string;
  classes?: TableHeadClasses;
  columns: Column[];
  sort?: SortModel;
  onChangeSortParams?(orderBy: string): void;
}

const TableHead: React.FC<TableHeadProps> = ({
  className,
  classes,
  columns,
  sort,
  onChangeSortParams,
}) => {
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow className={clsx(classes?.root, className)}>
        {columns.map(({ sortable = true, style, field, align, label }) => {
          return sort && sortable ? (
            <SortedTableCell
              className={classes?.cell}
              key={field}
              component="th"
              order={sort.order}
              orderBy={sort.orderBy}
              onChangeSortParams={onChangeSortParams}
              field={field}
              align={align || 'left'}
              style={style}
            >
              {t(label)}
            </SortedTableCell>
          ) : (
            <HeadTableCell
              key={field}
              className={classes?.cell}
              component="th"
              align={align || 'left'}
              style={style}
            >
              {t(label)}
            </HeadTableCell>
          );
        })}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
