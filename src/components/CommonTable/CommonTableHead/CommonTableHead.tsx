import { useTranslation } from 'react-i18next';
import { CommonTableColumn } from '../CommonTable';

import MuiTableHead from '@mui/material/TableHead';
import MuiTableRow from '@mui/material/TableRow';

import { HeadTableCell } from '../style';
import { useStyles } from './style';

interface CommonTableHeadProps<D extends { Id: string }> {
  columns: CommonTableColumn<D>[];
}

const CommonTableHead = <D extends { Id: string }>({
  columns,
}: CommonTableHeadProps<D>) => {
  const classes = useStyles();
  const { t } = useTranslation();

  return (
    <MuiTableHead>
      <MuiTableRow className={classes.row}>
        {columns.map((column, idx) => (
          <HeadTableCell key={idx} style={column.headStyle}>
            {t(column.label)}
          </HeadTableCell>
        ))}
      </MuiTableRow>
    </MuiTableHead>
  );
};

export default CommonTableHead;
