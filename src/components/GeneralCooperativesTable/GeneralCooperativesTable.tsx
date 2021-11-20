import { useState } from 'react';
import { SortModel, Column, ExtendedCooperativeModel } from 'models';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from 'components/TableHead';
import { BodyTableCell, BodyTableRow, IconButton } from 'components/Styled';
import { IcList } from 'components/Icons';

import clsx from 'clsx';
import { useStyles } from './style';

const columns: Column[] = [
  {
    field: 'Name',
    label: '#table.generalinfo.cooperative',
    style: { width: '90%' },
  },
  {
    field: '_action',
    label: '#table.generalinfo.action',
    align: 'right',
    style: { width: 80 },
  },
];

interface GeneralCooperativeTableProps {
  cooperatives: ExtendedCooperativeModel[];
  onSelectCooperative(cooperative: ExtendedCooperativeModel): void;
}

const GeneralCooperativeTable: React.FC<GeneralCooperativeTableProps> = ({
  cooperatives,
  onSelectCooperative,
}) => {
  const classes = useStyles();

  const [sortParams, setSortParams] = useState<SortModel>({
    order: 'asc',
    orderBy: 'Name',
    type: 'alphanumeric',
  });

  const handleChangeSortParams = (orderBy: string) => {
    setSortParams((prevState) => ({
      order:
        orderBy === prevState.orderBy
          ? prevState.order === 'asc'
            ? 'desc'
            : 'asc'
          : 'asc',
      orderBy,
      type: 'alphanumeric',
    }));
  };

  return (
    <Table>
      <TableHead
        className={classes.tableHeadRow}
        columns={columns}
        sort={sortParams}
        onChangeSortParams={handleChangeSortParams}
      />
      <TableBody>
        {cooperatives.map((cooperative) => {
          return (
            <BodyTableRow>
              <BodyTableCell className={clsx(classes.cell, classes.bold)}>
                {cooperative.Name}
              </BodyTableCell>
              <BodyTableCell>
                <IconButton
                  className={classes.actionBtn}
                  onClick={() => onSelectCooperative(cooperative)}
                >
                  <IcList className={classes.icon} />
                </IconButton>
              </BodyTableCell>
            </BodyTableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default GeneralCooperativeTable;
