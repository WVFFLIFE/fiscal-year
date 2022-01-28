import { FC } from 'react';
import useDocumentsData from './useDocumentsData';
import { useTranslation } from 'react-i18next';
import { DocumentModel, FolderModel } from 'models';

import Box from '@mui/material/Box';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import ActionButton from 'components/ActionButton';
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
import Tooltip from 'components/Tooltip';
import SuspenceFacade from 'components/SuspenceFacade';
import CreateRootFolder from './CreateRootFolder';

import clsx from 'clsx';
import { useStyles } from './style';

const options: QuickFilterOption[] = [
  { id: 'published', label: '#control.quickfilter.published' },
  { id: 'unpublished', label: '#control.quickfilter.unpublished' },
];

const successMessages = {
  successUpdated: '#tab.documents.notification.documentsupdated',
  successUploaded: '#tab.documents.confirmation.filesuploaded',
  folderNameUpdated: '#tab.documents.notification.foldernameupdated',
  successPublished: '#tab.documents.notification.successpublished',
  successUnpublished: '#tab.documents.notification.successunpublished',
  successDeleted: '#tab.documents.notification.entitesdeleted',
  successDocumentsUpdated: '#tab.documents.notification.selecteddocsupdated',
};

const rowsPerPage = [5, 10, 15];

export interface DocumentsTabProps {
  fiscalYearId: string;
}

const Documents: FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();

  const {
    hasFolder,
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
  } = useDocumentsData();

  const showCreateFolderBlock = !hasFolder;

  return (
    <SuspenceFacade loading={loading} error={error} onInitError={initError}>
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
            {t(
              amount.folders > 1
                ? '#tab.documents.rowsselected'
                : '#tab.documents.rowselected',
              { count: amount.folders }
            )}
            <span className={classes.divider}></span>
            {t(
              amount.docs > 1
                ? '#tab.documents.docsselected'
                : '#tab.documents.docselected',
              { count: amount.docs }
            )}
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
              <Tooltip title={t('#button.edit') as string}>
                <span className={classes.btnOffset}>
                  <ActionButton
                    disabled={!!!selectedItems.length || isDisabledEditButton}
                    onClick={() => handleOpenEditDocumentsDialog()}
                  >
                    <EditIcon className={classes.actionIcon} />
                  </ActionButton>
                </span>
              </Tooltip>
              <Tooltip title={t('#button.delete') as string}>
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
              <Tooltip title={t('#button.download') as string}>
                <span className={classes.btnOffset}>
                  <ActionButton
                    disabled={!!!amount.docs}
                    onClick={saveSelected}
                  >
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
                <Tooltip title={t('#button.publish') as string}>
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
              <Tooltip title={t('#button.refresh') as string}>
                <span className={classes.btnOffset}>
                  <ActionButton
                    disabled={loading || publishing}
                    onClick={refreshData}
                  >
                    <RefreshIcon className={classes.actionIcon} />
                  </ActionButton>
                </span>
              </Tooltip>
              <Tooltip
                title={t('#tab.documents.tooltip.opensharepoint') as string}
              >
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
              <Tooltip title={t('#button.upload') as string}>
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
        {showCreateFolderBlock ? (
          <CreateRootFolder />
        ) : activeFolder ? (
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
            <SuccessDialogView
              text={successMessages[successDialogState.type]}
            />
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
      </Box>
    </SuspenceFacade>
  );
};

export default Documents;
