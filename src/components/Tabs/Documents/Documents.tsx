import useDocumentsData from './useDocumentsData';
import { FiscalYearModel } from 'models';

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
import CircularProgress from '@mui/material/CircularProgress';

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
};

const rowsPerPage = [5, 10, 15];

export interface DocumentsTabProps {
  fiscalYear: FiscalYearModel | null;
}

const Documents: React.FC<DocumentsTabProps> = ({ fiscalYear }) => {
  const classes = useStyles();

  const {
    loading,
    allPublished,
    sortParams,
    pagination,
    publishing,
    rootFolder,
    activeFolder,
    list,
    error,
    refreshData,
    initError,
    breadcrumbsList,
    amount,
    selectedItems,
    openUploadForm,
    quickFilter,
    successDialogState,
    deleteConfirmationState,
    editDocumentDialogState,
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
    handleOpenEditDocumentDialog,
    handleCloseEditDocumentDialog,
    handleInitEditDocumentDialogState,
    handleOpenEditFolderDialog,
    handleCloseEditFolderDialog,
    handleInitEditFolderDialogState,
    handleChangeCurrentPage,
    handleChangeRowsPerPage,
    handleChangeSortParams,
  } = useDocumentsData(fiscalYear);

  if (!fiscalYear) return null;
  if (loading) {
    return (
      <Box>
        <CircularProgress size={20} />
      </Box>
    );
  }

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
            itemClassName={classes.quickFilterItem}
            active={quickFilter}
            options={options}
            onChange={handleChangeQuickFilter}
          />
          <Box marginLeft="40px">
            <ActionButton
              className={classes.actionBtn}
              disabled={!!!selectedItems.length}
            >
              <EditIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton
              className={classes.actionBtn}
              disabled={!!!selectedItems.length}
              onClick={() => handleOpenDeleteConfirmationDialog(selectedItems)}
            >
              <DeleteIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton
              className={classes.actionBtn}
              disabled={!!!amount.docs}
              onClick={saveSelected}
            >
              <DownloadIcon className={classes.actionIcon} />
            </ActionButton>
            {allPublished ? (
              <ActionButton
                className={classes.actionBtn}
                disabled={!!!amount.docs || publishing}
                onClick={() => publishSelectedDocuments(false)}
              >
                <UnpublishedIcon className={classes.actionIcon} />
              </ActionButton>
            ) : (
              <ActionButton
                className={classes.actionBtn}
                disabled={!!!amount.docs || publishing}
                onClick={() => publishSelectedDocuments(true)}
              >
                <PublishedIcon className={classes.actionIcon} />
              </ActionButton>
            )}
            <ActionButton
              className={classes.actionBtn}
              disabled={loading || publishing}
              onClick={refreshData}
            >
              <RefreshIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton
              className={classes.actionBtn}
              disabled={!!!activeFolder?.Url}
              href={activeFolder?.Url}
              target="_blank"
            >
              <SharePointIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton
              className={classes.actionBtn}
              palette="darkBlue"
              onClick={handleOpenUploadForm}
            >
              <PlusIcon className={classes.actionIcon} />
            </ActionButton>
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
            totalItems={list.length}
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
        open={editDocumentDialogState.open}
        handleClose={handleCloseEditDocumentDialog}
        TransitionProps={{
          onExited: handleInitEditDocumentDialogState,
        }}
      >
        {activeFolder && rootFolder && editDocumentDialogState.document ? (
          <EditDocument
            rootFolder={rootFolder}
            activeFolder={activeFolder}
            fetchFolders={fetchFolders}
            selectedDocument={editDocumentDialogState.document}
            onClose={handleCloseEditDocumentDialog}
          />
        ) : null}
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
    </Box>
  );
};

export default Documents;
