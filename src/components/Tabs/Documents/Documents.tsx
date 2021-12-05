import useDocumentsData from './useDocumentsData';
import { FiscalYearModel, DocumentModel, FolderModel } from 'models';

import Box from '@mui/material/Box';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import ActionButton from 'components/ActionButton';
import DialogError from 'components/DialogError';
import Breadcrumbs from './Breadcrumbs';
import DeleteConfirmation from 'components/DeleteConfirmation';
import Dialog from 'components/Dialog';
import SuccessDialogView from 'components/SuccessDialogView';
import Pagination from 'components/Pagination';
import {
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  PublishedIcon,
  RefreshIcon,
  SharePointIcon,
  PlusIcon,
  UnpublishedIcon,
} from 'components/Icons';
import DocumentsTable from './DocumentsTable';
import UploadForm from './UploadForm';
import EditDocument from './EditDocument';
import FolderEditor from './FolderEditor';
import EditDocuments from './EditDocuments';
import Backdrop from 'components/Backdrop';
import Tooltip from 'components/Tooltip';

import clsx from 'clsx';
import { useStyles } from './style';

const options: QuickFilterOption[] = [
  { id: 'published', label: 'Published' },
  { id: 'unpublished', label: 'Unpublished' },
];

const successMessages: { [key: string]: string } = {
  successUpdated: 'Document(s) have been successfully updated',
  successUploaded: 'Files have been successfully upload',
  folderNameUpdated: 'Folder Name has been successfully updated',
  successPublished: 'Document(s) have been successfully published',
  successUnpublished: 'Document(s) have been successfully unpublished',
  successDeleted: 'Selected entity(ies) have been successfully deleted',
  successDocumentsUpdated: 'Selected documents have been successfully updated',
};

const rowsPerPage = [5, 10, 15];

export interface DocumentsTabProps {
  fiscalYearId: string;
}

const Documents: React.FC<DocumentsTabProps> = ({ fiscalYearId }) => {
  const classes = useStyles();

  const {
    entitesType,
    loading,
    allPublished,
    sortParams,
    pagination,
    publishing,
    rootFolder,
    activeFolder,
    list,
    totalItems,
    error,
    refreshData,
    initError,
    breadcrumbsList,
    amount,
    selectedItems,
    openUploadForm,
    quickFilter,
    isDisabledEditButton,
    successDialogState,
    deleteConfirmationState,
    editDocumentDialogState,
    editDocumentsDialogState,
    editFolderDialogState,
    saveFile,
    publishDocuments,
    publishSelectedDocuments,
    saveSelected,
    deleteEntities,
    fetchFolders,
    handleChangeActiveFolder,
    handleChangeQuickFilter,
    handleChangeSelectedItems,
    handleOpenUploadForm,
    handleCloseUploadForm,
    handleInitDeleteEntity,
    handleOpenDeleteConfirmationDialog,
    handleSelectBreadcrumbsFolder,
    handleCloseDeleteConfirmationDialog,
    handleCloseSuccessDialog,
    handleInitSuccessDialogType,
    handleSelectAll,
    handleOpenEditDocumentsDialog,
    handleCloseEditDocumentsDialog,
    handleInitEditDocumentsDialogState,
    handleOpenEditFolderDialog,
    handleCloseEditFolderDialog,
    handleInitEditFolderDialogState,
    handleChangeCurrentPage,
    handleChangeRowsPerPage,
    handleChangeSortParams,
    handleOpenEditDocumentDialog,
    handleCloseEditDocumentDialog,
    handleInitEditDocumentDialog,
  } = useDocumentsData(fiscalYearId);

  return (
    <Box>
      <Breadcrumbs
        list={breadcrumbsList}
        selectItem={handleSelectBreadcrumbsFolder}
      />
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        marginBottom="20px"
      >
        <Box
          display="flex"
          alignItems="center"
          className={clsx(classes.amount, {
            [classes.zeroAmount]: !amount.docs && !amount.folders,
          })}
        >
          {`${amount.folders} ${amount.folders > 0 ? 'Rows' : 'Row'}`}
          {amount.docs ? (
            <>
              <span className={classes.divider}></span>
              {`${amount.docs} Documents`}
            </>
          ) : null}{' '}
          selected
        </Box>
        <Box display="flex" alignItems="center">
          <QuickFilter
            disabled={!!!activeFolder}
            itemClassName={classes.quickFilterItem}
            active={quickFilter}
            options={options}
            onChange={handleChangeQuickFilter}
          />
          <Box marginLeft="40px">
            <Tooltip title="Edit entity(ies)">
              <span className={classes.btnOffset}>
                <ActionButton
                  disabled={!!!selectedItems.length || isDisabledEditButton}
                  onClick={() => handleOpenEditDocumentsDialog()}
                >
                  <EditIcon className={classes.actionIcon} />
                </ActionButton>
              </span>
            </Tooltip>
            <Tooltip title="Delete entity(ies)">
              <span className={classes.btnOffset}>
                <ActionButton
                  disabled={!!!selectedItems.length}
                  onClick={() =>
                    handleOpenDeleteConfirmationDialog(selectedItems)
                  }
                >
                  <DeleteIcon className={classes.actionIcon} />
                </ActionButton>
              </span>
            </Tooltip>
            <Tooltip title="Download document(s)">
              <span className={classes.btnOffset}>
                <ActionButton disabled={!!!amount.docs} onClick={saveSelected}>
                  <DownloadIcon className={classes.actionIcon} />
                </ActionButton>
              </span>
            </Tooltip>
            {allPublished ? (
              <Tooltip title="Unpublish document(s)">
                <span className={classes.btnOffset}>
                  <ActionButton
                    disabled={!!!amount.docs || publishing}
                    onClick={() => publishSelectedDocuments(false)}
                  >
                    <UnpublishedIcon className={classes.actionIcon} />
                  </ActionButton>
                </span>
              </Tooltip>
            ) : (
              <Tooltip title="Publish document(s)">
                <span className={classes.btnOffset}>
                  <ActionButton
                    disabled={!!!amount.docs || publishing}
                    onClick={() => publishSelectedDocuments(true)}
                  >
                    <PublishedIcon className={classes.actionIcon} />
                  </ActionButton>
                </span>
              </Tooltip>
            )}
            <Tooltip title="Refresh documents">
              <span className={classes.btnOffset}>
                <ActionButton
                  disabled={loading || publishing}
                  onClick={refreshData}
                >
                  <RefreshIcon className={classes.actionIcon} />
                </ActionButton>
              </span>
            </Tooltip>
            <Tooltip title="Open sharepoint">
              <span className={classes.btnOffset}>
                <ActionButton
                  disabled={!!!activeFolder?.Url}
                  href={activeFolder?.Url}
                  target="_blank"
                >
                  <SharePointIcon className={classes.actionIcon} />
                </ActionButton>
              </span>
            </Tooltip>
            <Tooltip title="Upload new document(s)">
              <span className={classes.btnOffset}>
                <ActionButton
                  palette="darkBlue"
                  onClick={handleOpenUploadForm}
                  disabled={!!!activeFolder}
                >
                  <PlusIcon className={classes.actionIcon} />
                </ActionButton>
              </span>
            </Tooltip>
          </Box>
        </Box>
      </Box>
      {activeFolder ? (
        <>
          <DocumentsTable
            activeFolder={activeFolder}
            list={list}
            selected={selectedItems}
            handleChangeActiveFolder={handleChangeActiveFolder}
            handleChangeSelectedItems={handleChangeSelectedItems}
            handleChangeSortParams={handleChangeSortParams}
            handleOpenDeleteConfirmationDialog={
              handleOpenDeleteConfirmationDialog
            }
            handleOpenEditDocumentDialog={handleOpenEditDocumentDialog}
            handleOpenEditFolderDialog={handleOpenEditFolderDialog}
            handleSelectAll={handleSelectAll}
            saveFile={saveFile}
            sortParams={sortParams}
            publishing={publishing}
            publishDocuments={publishDocuments}
          />
          <Pagination
            className={classes.pagination}
            rowsPerPage={pagination.rowsPerPage}
            currentPage={pagination.currentPage}
            rowsPerPageOptions={rowsPerPage}
            totalItems={totalItems}
            onChangeCurrentPage={handleChangeCurrentPage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </>
      ) : null}
      <Dialog
        open={openUploadForm}
        handleClose={handleCloseUploadForm}
        maxWidth="sm"
      >
        {rootFolder && activeFolder ? (
          <UploadForm
            rootFolder={rootFolder}
            activeFolder={activeFolder}
            fetchFolders={fetchFolders}
            onClose={handleCloseUploadForm}
          />
        ) : null}
      </Dialog>
      <Dialog
        maxWidth="sm"
        open={editDocumentsDialogState.open}
        handleClose={handleCloseEditDocumentsDialog}
        TransitionProps={{
          onExited: handleInitEditDocumentsDialogState,
        }}
      >
        {entitesType === 'doc' && activeFolder && rootFolder ? (
          selectedItems.length === 1 ? (
            <EditDocument
              rootFolder={rootFolder}
              activeFolder={activeFolder}
              fetchFolders={fetchFolders}
              selectedDocument={selectedItems[0] as DocumentModel}
              onClose={handleCloseEditDocumentsDialog}
            />
          ) : selectedItems.length > 1 ? (
            <EditDocuments
              activeFolder={activeFolder}
              rootFolder={rootFolder}
              fetchFolders={fetchFolders}
              selectedDocuments={selectedItems as DocumentModel[]}
              onClose={handleCloseEditDocumentsDialog}
            />
          ) : null
        ) : entitesType === 'folder' && activeFolder && rootFolder ? (
          selectedItems.length === 1 ? (
            <FolderEditor
              selectedFolder={selectedItems[0] as FolderModel}
              fetchFolders={fetchFolders}
              onClose={handleCloseEditDocumentsDialog}
            />
          ) : null
        ) : null}
      </Dialog>
      <Dialog
        open={editDocumentDialogState.open}
        handleClose={handleCloseEditDocumentDialog}
        maxWidth="sm"
        TransitionProps={{
          onExited: handleInitEditDocumentDialog,
        }}
      >
        {rootFolder && activeFolder && editDocumentDialogState.document && (
          <EditDocument
            rootFolder={rootFolder}
            activeFolder={activeFolder}
            fetchFolders={fetchFolders}
            selectedDocument={editDocumentDialogState.document}
            onClose={handleCloseEditDocumentDialog}
          />
        )}
      </Dialog>
      <Dialog
        open={deleteConfirmationState.open}
        handleClose={handleCloseDeleteConfirmationDialog}
        maxWidth="xs"
        TransitionProps={{
          onExited: handleInitDeleteEntity,
        }}
      >
        {deleteConfirmationState.entities.length ? (
          <DeleteConfirmation
            apply={deleteEntities}
            cancel={handleCloseDeleteConfirmationDialog}
            loading={deleteConfirmationState.loading}
          />
        ) : null}
      </Dialog>
      <Dialog
        open={successDialogState.open}
        maxWidth="xs"
        handleClose={handleCloseSuccessDialog}
        TransitionProps={{
          onExited: handleInitSuccessDialogType,
        }}
      >
        {successDialogState.type ? (
          <SuccessDialogView text={successMessages[successDialogState.type]} />
        ) : null}
      </Dialog>
      <Dialog
        maxWidth="xs"
        open={editFolderDialogState.open}
        handleClose={handleCloseEditFolderDialog}
        TransitionProps={{
          onExited: handleInitEditFolderDialogState,
        }}
      >
        {editFolderDialogState.folder ? (
          <FolderEditor
            selectedFolder={editFolderDialogState.folder}
            fetchFolders={fetchFolders}
            onClose={handleCloseEditFolderDialog}
          />
        ) : null}
      </Dialog>
      <DialogError error={error} initError={initError} />
      <Backdrop loading={loading} />
    </Box>
  );
};

export default Documents;
