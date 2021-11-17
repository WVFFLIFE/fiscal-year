import { useMemo, useEffect, useCallback, useState, ChangeEvent } from 'react';
import { EntityModel, ErrorModel } from 'models';
import Services, { FolderModel, DocumentModel } from 'services';

import { saveAs } from 'file-saver';
import _first from 'lodash/first';
import _last from 'lodash/last';
import { isPublished, extractDocs, getErrorsList } from 'utils';
import { prepareData, limitFoldersDepth, countEntitiesAmount } from './utils';

interface DeleteConfirmationStateModel {
  open: boolean;
  entity: EntityModel | null;
  loading: boolean;
}

interface EditDocumentDialogStateModel {
  open: boolean;
  document: DocumentModel | null;
}

interface State {
  loading: boolean;
  error: ErrorModel | null;
  breadcrumbsList: FolderModel[];
  quickFilter: string | null;
  selectedItems: (DocumentModel | FolderModel)[];
}

const useDocumentsData = () => {
  const [state, setState] = useState<State>({
    breadcrumbsList: [],
    loading: false,
    error: null,
    quickFilter: null,
    selectedItems: [],
  });
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [deleteConfirmationState, setDeleteConfirmationState] =
    useState<DeleteConfirmationStateModel>({
      open: false,
      entity: null,
      loading: false,
    });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [editDocumentDialogState, setEditDocumentDialogState] =
    useState<EditDocumentDialogStateModel>({
      open: false,
      document: null,
    });

  const { loading, error, breadcrumbsList, quickFilter, selectedItems } = state;

  const rootFolder = _first(breadcrumbsList) || null;
  const activeFolder = _last(breadcrumbsList) || null;

  const filteredActiveFolder = useMemo(() => {
    if (!quickFilter) return activeFolder;
    return activeFolder
      ? {
          ...activeFolder,
          Documents: activeFolder.Documents.filter((doc) =>
            quickFilter === 'published' ? isPublished(doc) : !isPublished(doc)
          ),
        }
      : undefined;
  }, [activeFolder, quickFilter]);

  const list = useMemo(() => {
    return filteredActiveFolder ? prepareData(filteredActiveFolder) : [];
  }, [filteredActiveFolder]);

  const amount = useMemo(() => {
    return countEntitiesAmount(selectedItems);
  }, [selectedItems]);

  const fetchFolders = async () => {
    const res = await Services.getDocumentsList(
      '53820CFC-8E4A-E711-8106-005056AC126A'
    );

    setState((prevState) => ({
      ...prevState,
      breadcrumbsList: [
        {
          ...res.Folder,
          Name: 'Home',
          Folders: limitFoldersDepth(res.Folder.Folders),
        },
      ],
    }));
  };

  const setError = (messages: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      error: { messages: Array.isArray(messages) ? messages : [messages] },
      loading: false,
    }));
  };

  const initError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const initSelectedItems = () => {
    setState((prevState) => ({
      ...prevState,
      selectedItems: [],
    }));
  };

  const handleChangeQuickFilter = useCallback((newFilter: string) => {
    setState((prevState) => ({
      ...prevState,
      quickFilter: prevState.quickFilter === newFilter ? null : newFilter,
    }));
  }, []);

  const handleChangeActiveFolder = useCallback((newFolder: FolderModel) => {
    setState((prevState) => ({
      ...prevState,
      breadcrumbsList: prevState.breadcrumbsList.concat(newFolder),
    }));
  }, []);

  const handleSelectBreadcrumbsFolder = (idx: number) => {
    setState((prevState) => ({
      ...prevState,
      breadcrumbsList: prevState.breadcrumbsList.slice(0, idx + 1),
    }));
  };

  const handleChangeSelectedItems = (
    item: FolderModel | DocumentModel,
    selected: boolean
  ) => {
    setState((prevState) => ({
      ...prevState,
      selectedItems: selected
        ? prevState.selectedItems.concat(item)
        : prevState.selectedItems.filter((prevItem) => prevItem.Id !== item.Id),
    }));
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (filteredActiveFolder) {
      const { checked } = e.target;

      setState((prevState) => ({
        ...prevState,
        selectedItems: checked
          ? [...filteredActiveFolder.Documents, ...filteredActiveFolder.Folders]
          : [],
      }));
    }
  };

  const handleOpenEditDocumentDialog = (document: DocumentModel) => {
    setEditDocumentDialogState({
      document,
      open: true,
    });
  };

  const handleCloseEditDocumentDialog = () => {
    setEditDocumentDialogState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const handleInitEditDocumentDialogState = () => {
    setEditDocumentDialogState({
      document: null,
      open: false,
    });
  };

  const handleOpenDeleteConfirmationDialog = (entity: EntityModel) => {
    setDeleteConfirmationState((prevState) => ({
      ...prevState,
      entity,
      open: true,
    }));
  };

  const handleCloseDeleteConfirmationDialog = () => {
    setDeleteConfirmationState((prevState) => ({
      ...prevState,
      loading: false,
      open: false,
    }));
  };

  const handleInitDeleteEntity = () => {
    setDeleteConfirmationState((prevState) => ({
      ...prevState,
      entity: null,
      open: false,
    }));
  };

  const showDeleteConfirmationLoader = () => {
    setDeleteConfirmationState((prevState) => ({
      ...prevState,
      loading: true,
    }));
  };

  const hideDeleteConfirmationLoader = () => {
    setDeleteConfirmationState((prevState) => ({
      ...prevState,
      loading: false,
    }));
  };

  const deleteEntity = async () => {
    const { entity } = deleteConfirmationState;

    if (entity) {
      try {
        const deleteAction =
          entity.type === 'doc'
            ? Services.documentDelete
            : Services.folderDelete;

        showDeleteConfirmationLoader();

        const res = await deleteAction(entity.id);

        if (res.IsSuccess) {
          await fetchFolders();
          handleCloseDeleteConfirmationDialog();
        } else {
          hideDeleteConfirmationLoader();
        }
      } catch (err) {
        console.error(err);
        hideDeleteConfirmationLoader();
      }
    }
  };

  const handleShowSuccessDialog = () => setShowSuccessDialog(true);
  const handleCloseSuccessDialog = () => setShowSuccessDialog(false);
  const handleOpenUploadForm = () => setOpenUploadForm(true);
  const handleCloseUploadForm = (val?: string) => {
    setOpenUploadForm(false);

    if (val === 'success') {
      handleShowSuccessDialog();
    }
  };

  const saveFile = async (fileId: string) => {
    const res = await Services.documentDownload(fileId);

    if (res.IsSuccess) {
      saveAs(res.File.FileDataUrl, res.File.FileName);
    }

    return res;
  };

  const saveSelected = async () => {
    const docIds = extractDocs(selectedItems);

    if (docIds.length) {
      const res = await Promise.allSettled(docIds.map((id) => saveFile(id)));

      const errors = getErrorsList(res);

      if (errors.length) {
        setError(errors);
      }
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    initSelectedItems();
  }, [filteredActiveFolder, quickFilter]);

  return {
    loading,
    error,
    rootFolder,
    activeFolder: filteredActiveFolder,
    openUploadForm,
    showSuccessDialog,
    editDocumentDialogState,
    list,
    amount,
    selectedItems,
    breadcrumbsList,
    deleteConfirmationState,
    quickFilter,
    saveFile,
    saveSelected,
    deleteEntity,
    fetchFolders,
    initError,
    handleInitDeleteEntity,
    handleOpenUploadForm,
    handleCloseUploadForm,
    handleChangeSelectedItems,
    handleOpenDeleteConfirmationDialog,
    handleCloseDeleteConfirmationDialog,
    handleSelectBreadcrumbsFolder,
    handleChangeActiveFolder,
    handleChangeQuickFilter,
    handleShowSuccessDialog,
    handleCloseSuccessDialog,
    handleSelectAll,
    handleOpenEditDocumentDialog,
    handleCloseEditDocumentDialog,
    handleInitEditDocumentDialogState,
  };
};

export default useDocumentsData;
