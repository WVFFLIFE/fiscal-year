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
        {columns.map(({ sortable = true, style, field, align, label }) => {
          return sort && sortable ? (
            <SortedTableCell
              key={field}
              component="th"
              order={sort.order}
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
