import useDocumentsData from './useDocumentsData';

import Box from '@mui/material/Box';
import QuickFilter, { QuickFilterOption } from 'components/QuickFilter';
import ActionButton from 'components/ActionButton';
import Breadcrumbs from './Breadcrumbs';
import DeleteConfirmation from 'components/DeleteConfirmation';
import Dialog from 'components/Dialog';
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

import { useStyles } from './style';

const options: QuickFilterOption[] = [
  { id: 'published', label: 'Published' },
  { id: 'unpublished', label: 'Unpublished' },
];

const Documents = () => {
  const classes = useStyles();

  const {
    list,
    breadcrumbsList,
    rootFolder,
    selectedItems,
    deepIdsList,
    openUploadForm,
    quickFilter,
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
        <Box></Box>
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
            <ActionButton className={classes.actionBtn}>
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
      <DocumentsTable
        list={list}
        idsList={deepIdsList}
        selected={selectedItems}
        handleChangeActiveFolder={handleChangeActiveFolder}
        handleChangeSelectedItems={handleChangeSelectedItems}
        handleOpenDeletConfirmationDialog={handleOpenDeleteConfirmationDialog}
        saveFile={saveFile}
      />
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
    </Box>
  );
};

export default Documents;
