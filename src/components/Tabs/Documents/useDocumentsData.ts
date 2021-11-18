import { useMemo, useEffect, useCallback, useState, ChangeEvent } from 'react';
import {
  EntityModel,
  ErrorModel,
  SuccessType,
  FolderModel,
  DocumentModel,
  EntityPublishModel,
  SortModel,
  SortParamsType,
} from 'models';
import Services from 'services';

import { saveAs } from 'file-saver';
import _first from 'lodash/first';
import _last from 'lodash/last';
import { isPublished, isFolder, extractDocs, getErrorsList } from 'utils';
import {
  prepareData,
  limitFoldersDepth,
  countEntitiesAmount,
  isAnySucceed,
} from './utils';

interface DeleteConfirmationStateModel {
  open: boolean;
  entity: EntityModel | null;
  loading: boolean;
}

interface EditDocumentDialogStateModel {
  open: boolean;
  document: DocumentModel | null;
}

interface EditFolfderDialogStateModel {
  open: boolean;
  folder: FolderModel | null;
}

interface SuccessDialogState {
  open: boolean;
  type: SuccessType | null;
}

interface State {
  loading: boolean;
  publishing: boolean;
  error: ErrorModel | null;
  breadcrumbsList: FolderModel[];
  quickFilter: string | null;
  selectedItems: (DocumentModel | FolderModel)[];
}

const useDocumentsData = () => {
  const [state, setState] = useState<State>({
    breadcrumbsList: [],
    loading: false,
    publishing: false,
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
  const [successDialogState, setSuccessDialogState] =
    useState<SuccessDialogState>({
      open: false,
      type: null,
    });
  const [editDocumentDialogState, setEditDocumentDialogState] =
    useState<EditDocumentDialogStateModel>({
      open: false,
      document: null,
    });
  const [editFolderDialogState, setEditFolderDialogState] =
    useState<EditFolfderDialogStateModel>({
      open: false,
      folder: null,
    });
  const [pagination, setPagination] = useState({
    rowsPerPage: 10,
    currentPage: 0,
  });
  const [sortParams, setSortParams] = useState<SortModel>({
    order: 'asc',
    orderBy: 'Name',
    type: 'alphanumeric',
  });

  const {
    loading,
    publishing,
    error,
    breadcrumbsList,
    quickFilter,
    selectedItems,
  } = state;

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
    return filteredActiveFolder
      ? prepareData(filteredActiveFolder, sortParams)
      : [];
  }, [filteredActiveFolder, sortParams]);

  const amount = useMemo(() => {
    return countEntitiesAmount(selectedItems);
  }, [selectedItems]);

  const fetchFolders = async () => {
    const res = await Services.getDocumentsList(
      '53820CFC-8E4A-E711-8106-005056AC126A'
    );

    setState((prevState) => ({
      ...prevState,
      breadcrumbsList: res.Folder
        ? [
            {
              ...res.Folder,
              Name: 'Home',
              Folders: limitFoldersDepth(res.Folder.Folders),
            },
          ]
        : [],
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

  const unselectItems = () => {
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

  const handleShowSuccessDialog = (type: SuccessType) => {
    setSuccessDialogState({
      type,
      open: true,
    });
  };
  const handleCloseSuccessDialog = () => {
    setSuccessDialogState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };
  const handleInitSuccessDialogType = () => {
    setSuccessDialogState({
      type: null,
      open: false,
    });
  };
  const handleOpenUploadForm = () => setOpenUploadForm(true);
  const handleCloseUploadForm = (showSuccessDialog?: boolean) => {
    setOpenUploadForm(false);

    if (showSuccessDialog) handleShowSuccessDialog('successUploaded');
  };
  const handleOpenEditDocumentDialog = (document: DocumentModel) => {
    setEditDocumentDialogState({
      document,
      open: true,
    });
  };

  const handleCloseEditDocumentDialog = (showSuccessDialog?: boolean) => {
    setEditDocumentDialogState((prevState) => ({
      ...prevState,
      open: false,
    }));

    if (showSuccessDialog) handleShowSuccessDialog('successUpdated');
  };

  const handleInitEditDocumentDialogState = () => {
    setEditDocumentDialogState({
      document: null,
      open: false,
    });
  };

  const handleOpenEditFolderDialog = (folder: FolderModel) => {
    setEditFolderDialogState({
      folder,
      open: true,
    });
  };

  const handleCloseEditFolderDialog = (showSuccessDialog?: boolean) => {
    setEditFolderDialogState((prevState) => ({
      ...prevState,
      open: false,
    }));

    if (showSuccessDialog) handleShowSuccessDialog('folderNameUpdated');
  };

  const handleInitEditFolderDialogState = () => {
    setEditFolderDialogState({
      folder: null,
      open: false,
    });
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

  const publishDocument = async (entity: EntityPublishModel) => {
    return await Services.documentPublish(entity.id, !entity.published);
  };

  const publishDocuments = async (
    entities: EntityPublishModel[],
    type: 'publish' | 'unpublish'
  ) => {
    try {
      setState((prevState) => ({
        ...prevState,
        publishing: true,
      }));

      const res = await Promise.allSettled(
        entities
          .filter((entity) =>
            type === 'publish' ? !entity.published : entity.published
          )
          .map((entity) => publishDocument(entity))
      );

      if (isAnySucceed(res)) {
        await fetchFolders();
      }

      const errors = getErrorsList(res);

      if (errors.length) {
        setState((prevState) => ({
          ...prevState,
          publishing: false,
          error: { messages: errors },
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          publishing: false,
        }));
        handleShowSuccessDialog(
          type === 'publish' ? 'successPublished' : 'successUnpublished'
        );
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        publishing: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  // const publishSelectedDocuments = async () => {
  //   const folder: FolderModel;

  //   for (let selectedItem of state.selectedItems) {
  //     if (isFolder)
  //   }
  // }

  const handleChangeCurrentPage = useCallback((page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
  }, []);

  const handleChangeRowsPerPage = useCallback((rowsPerPage: number) => {
    setPagination((prevState) => ({
      ...prevState,
      rowsPerPage,
    }));
  }, []);

  const resetPage = () => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: 0,
    }));
  };

  const handleChangeSortParams = useCallback(
    (id: string, type: SortParamsType) => {
      setSortParams((prevState) => ({
        order:
          prevState.orderBy === id
            ? prevState.order === 'asc'
              ? 'desc'
              : 'asc'
            : 'asc',
        orderBy: id,
        type,
      }));
    },
    []
  );

  const resetSortParms = () => {
    setSortParams({
      order: 'asc',
      orderBy: 'Name',
      type: 'alphanumeric',
    });
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    resetSortParms();
  }, [filteredActiveFolder]);

  useEffect(() => {
    unselectItems();
    resetPage();
  }, [filteredActiveFolder, quickFilter]);

  console.log(sortParams);

  return {
    publishing,
    pagination,
    loading,
    error,
    rootFolder,
    activeFolder: filteredActiveFolder,
    openUploadForm,
    successDialogState,
    handleInitSuccessDialogType,
    editDocumentDialogState,
    editFolderDialogState,
    sortParams,
    list,
    amount,
    selectedItems,
    breadcrumbsList,
    deleteConfirmationState,
    quickFilter,
    saveFile,
    publishDocuments,
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
    handleChangeSortParams,
    handleSelectBreadcrumbsFolder,
    handleChangeActiveFolder,
    handleChangeQuickFilter,
    handleCloseSuccessDialog,
    handleSelectAll,
    handleOpenEditDocumentDialog,
    handleCloseEditDocumentDialog,
    handleInitEditDocumentDialogState,
    handleOpenEditFolderDialog,
    handleCloseEditFolderDialog,
    handleInitEditFolderDialogState,
    handleChangeRowsPerPage,
    handleChangeCurrentPage,
  };
};

export default useDocumentsData;
