import { ChangeEvent, useState } from 'react';
import { SortModel, DocumentModel } from 'models';

import useSort from 'hooks/useSort';

import clsx from 'clsx';
import { useStyles } from './style';

import {
  Table as MuiTable,
  TableBody as MuiTableBody,
  TableCell as MuiTableCell,
  TableRow as MuiTableRow,
} from '@mui/material';
import DocumentsTableHead from './DocumentsTableHead';
import Checkbox from 'components/Checkbox';
import ActionButton from 'components/ActionButton';
import {
  DeleteIcon,
  EditIcon,
  DownloadIcon,
  SharePointIcon,
} from 'components/Icons';

interface DocumentsTableProps {
  documents: DocumentModel[];
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({ documents }) => {
  const classes = useStyles();

  const { list, sortParams, onChangeSortParams } = useSort(documents, {
    order: 'asc',
    orderBy: 'Name',
  });
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const handleSelectRow = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: id, checked } = e.target;

    setSelectedRows((prevState) =>
      checked ? prevState.filter((item) => item !== id) : prevState.concat(id)
    );
  };

  return (
    <MuiTable>
      <DocumentsTableHead
        order={sortParams.order}
        orderBy={sortParams.orderBy}
        onChangeSortParams={onChangeSortParams}
        onToggleSelectAll={() => {}}
        selected={false}
      />
      <MuiTableBody>
        {list.map((item) => {
          const selected = selectedRows.includes(item.Id);

          return (
            <MuiTableRow
              key={item.Id}
              className={classes.row}
              hover
              selected={selected}
            >
              <MuiTableCell className={classes.cell}>
                <Checkbox
                  name={item.Id}
                  checked={selected}
                  onChange={handleSelectRow}
                />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}></MuiTableCell>
              <MuiTableCell className={classes.cell}>{item.Name}</MuiTableCell>
              <MuiTableCell className={classes.cell}></MuiTableCell>
              <MuiTableCell className={classes.cell}></MuiTableCell>
              <MuiTableCell className={classes.cell}></MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <div
                  className={clsx(classes.actionBtnsWrapper, 'cell-actions')}
                >
                  <ActionButton className={classes.btn} size="small">
                    <DeleteIcon className={classes.icon} />
                  </ActionButton>
                  <ActionButton className={classes.btn} size="small">
                    <EditIcon className={classes.icon} />
                  </ActionButton>
                  <ActionButton className={classes.btn} size="small">
                    <DownloadIcon className={classes.icon} />
                  </ActionButton>
                  <ActionButton className={classes.btn} size="small">
                    <SharePointIcon className={classes.icon} />
                  </ActionButton>
                </div>
              </MuiTableCell>
            </MuiTableRow>
          );
        })}
      </MuiTableBody>
    </MuiTable>
  );
};

export default DocumentsTable;
