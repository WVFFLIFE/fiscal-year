import { memo, FC, useMemo } from 'react';
import { Column, SortModel } from 'models';
import { RunningNumberSettingsItem } from 'utils/fiscalYear';
import { renderAs } from './utils';

import Table from '@mui/material/Table';
import TableHead from 'components/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import clsx from 'clsx';
import { useStyles } from './style';

interface RunningNumberSettingsTableProps {
  data: RunningNumberSettingsItem[];
}

const RunningNumberSettingsTable: FC<RunningNumberSettingsTableProps> = ({
  data,
}) => {
  const classes = useStyles();

  const columns: Column<RunningNumberSettingsItem>[] = useMemo(
    () => [
      {
        label: 'documentTypeCode',
        field: 'documentTypeCode',
        sortable: true,
        align: 'left',
        type: 'documentcode',
        bodyCellClassName: classes.semibold,
      },
      {
        label: 'startNumber',
        field: 'startNumber',
        type: 'numeric',
        sortable: true,
        align: 'right',
        bodyCellClassName: classes.light,
      },
      {
        label: 'currentNumber',
        field: 'currentNumber',
        type: 'numeric',
        sortable: true,
        align: 'right',
        bodyCellClassName: classes.light,
      },
      {
        label: 'ownerName',
        field: 'ownerName',
        sortable: true,
        align: 'left',
        bodyCellClassName: classes.semibold,
      },
      {
        label: 'createdOn',
        field: 'createdOn',
        sortable: true,
        align: 'right',
        type: 'datetime',
        bodyCellClassName: classes.light,
      },
    ],
    [classes]
  );

  return (
    <Table className={classes.table}>
      <TableHead columns={columns} />
      <TableBody>
        {data.map((item) => {
          return (
            <TableRow key={item.id} className={classes.row}>
              {columns.map((column) => {
                const {
                  field,
                  align = 'left',
                  type = 'string',
                  bodyCellClassName,
                } = column;
                return (
                  <TableCell
                    key={column.field}
                    align={align}
                    className={clsx(classes.cell, bodyCellClassName)}
                  >
                    {renderAs(item[field], type)}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default memo(RunningNumberSettingsTable);
