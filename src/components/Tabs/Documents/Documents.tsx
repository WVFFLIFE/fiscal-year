import useDocumentsData from './useDocumentsData';

import Box from '@mui/material/Box';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import ActionButton from 'components/ActionButton';
import Breadcrumbs from './Breadcrumbs';
import DeleteConfirmation from 'components/DeleteConfirmation';
import Dialog from 'components/Dialog';
import SuccessDialogView from 'components/SuccessDialogView';
import {
  EditIcon,
  DeleteIcon,
  DownloadIcon,
  PublishedIcon,
  RefreshIcon,
  SharePointIcon,
  PlusIcon,
} from 'components/Icons';
import DocumentsTable from 'components/DocumentsTable';
import UploadForm from './UploadForm';

import clsx from 'clsx';
import { useStyles } from './style';

const options: QuickFilterOption[] = [
  { id: 'published', label: 'Published' },
  { id: 'unpublished', label: 'Unpublished' },
];

const Documents = () => {
  const classes = useStyles();

  const {
    activeFolder,
    list,
    breadcrumbsList,
    rootFolder,
    amount,
    selectedItems,
    openUploadForm,
    quickFilter,
    showSuccessDialog,
    deleteConfirmationState,
    saveFile,
    deleteEntity,
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
    handleSelectAll,
  } = useDocumentsData();

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
            <ActionButton className={classes.actionBtn} disabled>
              <EditIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton className={classes.actionBtn} disabled>
              <DeleteIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton className={classes.actionBtn} disabled>
              <DownloadIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton className={classes.actionBtn} disabled>
              <PublishedIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton className={classes.actionBtn}>
              <RefreshIcon className={classes.actionIcon} />
            </ActionButton>
            <ActionButton
              className={classes.actionBtn}
              disabled={!Boolean(rootFolder?.Url)}
              href={rootFolder?.Url}
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
        <DocumentsTable
          activeFolder={activeFolder}
          list={list}
          selected={selectedItems}
          handleChangeActiveFolder={handleChangeActiveFolder}
          handleChangeSelectedItems={handleChangeSelectedItems}
          handleOpenDeletConfirmationDialog={handleOpenDeleteConfirmationDialog}
          handleSelectAll={handleSelectAll}
          saveFile={saveFile}
        />
      ) : null}
      <Dialog
        open={openUploadForm}
        handleClose={handleCloseUploadForm}
        maxWidth="sm"
      >
        {rootFolder ? (
          <UploadForm
            rootFolder={rootFolder}
            fetchFolders={fetchFolders}
            onClose={handleCloseUploadForm}
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
        <DeleteConfirmation
          entity={
            deleteConfirmationState.entity?.type === 'doc'
              ? 'document'
              : 'folder'
          }
          apply={deleteEntity}
          cancel={handleCloseDeleteConfirmationDialog}
          loading={deleteConfirmationState.loading}
        />
      </Dialog>
      <Dialog
        open={showSuccessDialog}
        maxWidth="xs"
        handleClose={handleCloseSuccessDialog}
      >
        <SuccessDialogView />
      </Dialog>
    </Box>
  );
};

export default Documents;
