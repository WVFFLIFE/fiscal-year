import { Column } from 'models';

import { useTranslation } from 'react-i18next';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';
import SortedTableCell from 'components/SortedTableCell';
import { HeadTableCell } from 'components/Styled';

interface TableHeadProps {
  bgColor?: string;
  columns: Column[];
  sort?: {
    order: 'asc' | 'desc';
    orderBy: string;
  };
  onChangeSortParams?(orderBy: string): void;
}

const TableHead: React.FC<TableHeadProps> = ({
  columns,
  sort,
  onChangeSortParams,
  bgColor,
}) => {
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow style={bgColor ? { background: bgColor } : undefined}>
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
