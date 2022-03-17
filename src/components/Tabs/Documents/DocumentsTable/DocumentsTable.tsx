import { ChangeEvent } from 'react';
import { FolderModel, DocumentModel, EntityPublishModel } from 'models';
import { SortModel, SortParamsType } from 'models';
import _get from 'lodash/get';
import { isFolder, isPublished } from 'utils';
import {
  isSelectedAll,
  isItemSelected,
  isIndeterminated,
  getFolderDocuments,
} from './utils';

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
import Highlight from 'components/Highlight';
import {
  DeleteIcon,
  EditIcon,
  DownloadIcon,
  FolderIcon,
  PublishedIcon,
  UnpublishedIcon,
} from 'components/Icons';

interface DocumentsTableProps {
  activeFolder: FolderModel;
  handleChangeActiveFolder(folder: FolderModel): void;
  handleChangeSortParams(id: string, type?: SortParamsType): void;
  handleChangeSelectedItems(
    item: FolderModel | DocumentModel,
    folder: boolean
  ): void;
  handleOpenDeleteConfirmationDialog(
    entities: (DocumentModel | FolderModel)[]
  ): void;
  handleOpenEditDocumentDialog(document: DocumentModel): void;
  handleOpenEditFolderDialog(folder: FolderModel): void;
  handleSelectAll(e: ChangeEvent<HTMLInputElement>): void;
  list: (FolderModel | DocumentModel)[];
  publishing: boolean;
  publishDocuments(
    documents: EntityPublishModel[],
    type: 'publish' | 'unpublish'
  ): void;
  saveFile(id: string): Promise<any>;
  selected: (FolderModel | DocumentModel)[];
  sortParams: SortModel;
}

const DocumentsTable: React.FC<DocumentsTableProps> = ({
  activeFolder,
  handleChangeActiveFolder,
  handleChangeSelectedItems,
  handleChangeSortParams,
  handleSelectAll,
  handleOpenDeleteConfirmationDialog,
  handleOpenEditDocumentDialog,
  handleOpenEditFolderDialog,
  list,
  publishDocuments,
  publishing,
  saveFile,
  selected,
  sortParams,
}) => {
  const classes = useStyles();

  const selectedAll = !!(list.length && isSelectedAll(activeFolder, selected));
  const indeterminatedAll = selectedAll
    ? false
    : isIndeterminated(activeFolder, selected);

  return (
    <MuiTable>
      <DocumentsTableHead
        order={sortParams.order}
        orderBy={sortParams.orderBy}
        onChangeSortParams={handleChangeSortParams}
        onToggleSelectAll={handleSelectAll}
        selected={selectedAll}
        indeterminate={indeterminatedAll}
      />
      <MuiTableBody>
        {list.map((item) => {
          const folder = isFolder(item);
          const isSelected = isItemSelected(item, selected);
          let documents: EntityPublishModel[] = folder
            ? getFolderDocuments(item as FolderModel)
            : [{ id: item.Id, type: 'doc', published: isPublished(item) }];

          return (
            <MuiTableRow
              key={item.Id}
              className={classes.row}
              hover
              selected={isSelected}
            >
              <MuiTableCell className={classes.cell}>
                <Checkbox
                  name={item.Id}
                  checked={isSelected}
                  onChange={() => handleChangeSelectedItems(item, !isSelected)}
                />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                {item.IsPublished ? (
                  <Tooltip
                    arrow
                    title={t('#tab.documents.publishedtoportal')}
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
                    <Highlight text={item.Name} />
                  </span>
                </span>
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <Highlight
                  text={_get(item, 'Values.Service_x002f_Process', null)}
                />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <Highlight
                  text={_get(item, 'Values.Information_x0020_Group', null)}
                />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <Highlight text={_get(item, 'Values.Modified', null)} />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <Highlight text={_get(item, 'Values.Editor', null)} />
              </MuiTableCell>
              <MuiTableCell className={classes.cell}>
                <div
                  className={clsx(classes.actionBtnsWrapper, 'cell-actions')}
                >
                  <ActionButton
                    className={classes.btn}
                    size="small"
                    onClick={() => handleOpenDeleteConfirmationDialog([item])}
                  >
                    <DeleteIcon className={classes.icon} />
                  </ActionButton>
                  <ActionButton
                    className={classes.btn}
                    size="small"
                    onClick={() =>
                      folder
                        ? handleOpenEditFolderDialog(item as FolderModel)
                        : handleOpenEditDocumentDialog(item as DocumentModel)
                    }
                  >
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
                  {item.IsPublished === null ? null : (
                    <ActionButton
                      className={classes.btn}
                      size="small"
                      disabled={publishing}
                      onClick={() =>
                        publishDocuments(
                          documents,
                          item.IsPublished ? 'unpublish' : 'publish'
                        )
                      }
                    >
                      {item.IsPublished ? (
                        <UnpublishedIcon className={classes.icon} />
                      ) : (
                        <PublishedIcon className={classes.icon} />
                      )}
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
