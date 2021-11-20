import { Column, SortModel } from 'models';

import { useTranslation } from 'react-i18next';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import SortedTableCell from 'components/SortedTableCell';
import { HeadTableCell } from 'components/Styled';

interface TableHeadProps {
  className?: string;
  columns: Column[];
  sort?: SortModel;
  onChangeSortParams?(orderBy: string): void;
}

const TableHead: React.FC<TableHeadProps> = ({
  className,
  columns,
  sort,
  onChangeSortParams,
}) => {
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow className={className}>
        {columns.map((column) => {
          return sort && column.sortable ? (
            <SortedTableCell
              key={column.field}
              component="th"
              order={sort.order}
              onChangeSortParams={onChangeSortParams}
              field={column.field}
              align={column.align || 'left'}
              style={column.style}
            >
              {t(column.label)}
            </SortedTableCell>
          ) : (
            <HeadTableCell
              key={column.field}
              component="th"
              align={column.align || 'left'}
              style={column.style}
            >
              {t(column.label)}
            </HeadTableCell>
          );
        })}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default TableHead;
