import { FolderModel, DocumentModel } from 'services';

import useSort from 'hooks/useSort';
import _get from 'lodash/get';
import { isFolder, getDeepIdsList, isPublished } from 'utils';
import { isSelected, isIndeterminated } from './utils';

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
import Tooltip from 'components/Tooltip';
import {
  DeleteIcon,
  EditIcon,
  DownloadIcon,
  SharePointIcon,
  FolderIcon,
  PublishedIcon,
} from 'components/Icons';

interface DocumentsTableProps {
  list: (FolderModel | DocumentModel)[];
  idsList: string[];
  selected: string[];
  saveFile(id: string): Promise<void>;
  handleChangeActiveFolder(folder: FolderModel): void;
  handleChangeSelectedItems(
    item: FolderModel | DocumentModel,
    folder: boolean
  ): void;
  handleOpenDeletConfirmationDialog(entity: {
    id: string;
    type: 'doc' | 'folder';
  }): void;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  list,
  idsList,
  selected,
  saveFile,
  handleChangeActiveFolder,
  handleChangeSelectedItems,
  handleOpenDeletConfirmationDialog,
}) => {
  const classes = useStyles();

  const {
    list: sortedList,
    sortParams,
    onChangeSortParams,
  } = useSort(list, {
    order: 'asc',
    orderBy: 'Name',
  });

  const selectedAll = isSelected(selected, idsList);
  const indeterminatedAll = !selectedAll && isIndeterminated(selected, idsList);

  return (
    <MuiTable>
      <DocumentsTableHead
        order={sortParams.order}
        orderBy={sortParams.orderBy}
        onChangeSortParams={onChangeSortParams}
        onToggleSelectAll={() => {}}
        selected={selectedAll}
        indeterminate={indeterminatedAll}
      />
      <MuiTableBody>
        {sortedList.map((item) => {
          const folder = isFolder(item);
          const published = isPublished(item);
          const itemIdsList = getDeepIdsList(item);
          const isItemSelected = isSelected(selected, itemIdsList);
          const indeterminate =
            folder &&
            !isItemSelected &&
            isIndeterminated(selected, itemIdsList);
          const entity = {
            id: item.Id,
            type: folder ? ('folder' as const) : ('doc' as const),
          };

          return (
            <MuiTableRow
              key={item.Id}
              className={classes.row}
              hover
              selected={isItemSelected}
            >
              <MuiTableCell className={classes.cell}>
                <Checkbox
                  name={item.Id}
                  checked={isItemSelected}
                  indeterminate={indeterminate}
                  onChange={() =>
                    handleChangeSelectedItems(item, !isItemSelected)
                  }
                />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                {published ? (
                  <Tooltip
                    arrow
                    title={'Published to portal'}
                    placement="top-start"
                  >
                    <PublishedIcon className={classes.publishedIcon} />
                  </Tooltip>
                ) : null}
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <span
                  className={classes.centered}
                  onClick={
                    folder
                      ? () => handleChangeActiveFolder(item as FolderModel)
                      : undefined
                  }
                >
                  {folder && <FolderIcon className={classes.folderIcon} />}
                  <span
                    className={clsx({
                      [classes.folderName]: folder,
                    })}
                  >
                    {item.Name}
                  </span>
                </span>
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                {_get(item, 'Values.Service_x002f_Process')}
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                {_get(item, 'Values.Information_x0020_Group')}
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                {_get(item, 'Values.Modified')}
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                {_get(item, 'Values.Editor')}
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <div
                  className={clsx(classes.actionBtnsWrapper, 'cell-actions')}
                >
                  <ActionButton
                    className={classes.btn}
                    size="small"
                    onClick={() => handleOpenDeletConfirmationDialog(entity)}
                  >
                    <DeleteIcon className={classes.icon} />
                  </ActionButton>
                  <ActionButton className={classes.btn} size="small">
                    <EditIcon className={classes.icon} />
                  </ActionButton>
                  {!folder && (
                    <ActionButton
                      className={classes.btn}
                      size="small"
                      onClick={() => saveFile(item.Id)}
                    >
                      <DownloadIcon className={classes.icon} />
                    </ActionButton>
                  )}
                  {folder && (
                    <ActionButton
                      className={classes.btn}
                      size="small"
                      href={(item as FolderModel).Url}
                      target="_blank"
                    >
                      <SharePointIcon className={classes.icon} />
                    </ActionButton>
                  )}
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
