import { useMemo, useEffect, useCallback, useState, ChangeEvent } from 'react';
import {
  ErrorModel,
  SuccessType,
  FolderModel,
  DocumentModel,
  EntityPublishModel,
  SortModel,
  SortParamsType,
} from 'models';
import useGeneralCtx from 'hooks/useGeneralCtx';
import Services from 'services';

import { saveAs } from 'file-saver';
import _first from 'lodash/first';
import _last from 'lodash/last';
import { isPublished, isFolder, extractDocs, getErrorsList } from 'utils';
import {
  prepareData,
  countEntitiesAmount,
  isAnySucceed,
  getInnerDocuments,
  getPublishedEntities,
  getEntitiesType,
  getDocuments,
  updateBreadcrumbsList,
  isPublishedAnyInnerDocument,
} from './utils';

interface DeleteConfirmationStateModel {
  open: boolean;
  entities: (DocumentModel | FolderModel)[];
  loading: boolean;
}

interface EditDocumentsDialogStateModel {
  open: boolean;
  documents: DocumentModel[];
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
  hasFolder: boolean;
  folderExists: boolean;
}

const useDocumentsData = () => {
  const {
    state: { generalInformation },
  } = useGeneralCtx();
  const fiscalYearId = generalInformation.data?.Id || null;
  const [state, setState] = useState<State>({
    breadcrumbsList: [],
    loading: false,
    publishing: false,
    error: null,
    quickFilter: null,
    selectedItems: [],
    hasFolder: false,
    folderExists: false,
  });
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [deleteConfirmationState, setDeleteConfirmationState] =
    useState<DeleteConfirmationStateModel>({
      open: false,
      entities: [],
      loading: false,
    });
  const [successDialogState, setSuccessDialogState] =
    useState<SuccessDialogState>({
      open: false,
      type: null,
    });
  const [editDocumentsDialogState, setEditDocumentsDialogState] =
    useState<EditDocumentsDialogStateModel>({
      open: false,
      documents: [],
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
          Folders: activeFolder.Folders.filter((folder) => {
            return quickFilter === 'published'
              ? isPublishedAnyInnerDocument(folder)
              : quickFilter === 'unpublished'
              ? !isPublishedAnyInnerDocument(folder)
              : folder;
          }),
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
    if (fiscalYearId) {
      try {
        // test '53820CFC-8E4A-E711-8106-005056AC126A'
        const res = await Services.getDocumentsList(fiscalYearId);

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            hasFolder: res.HasFolder,
            folderExists: res.FolderExists,
            breadcrumbsList: res.Folder
              ? updateBreadcrumbsList(
                  { ...res.Folder, Name: 'Home' },
                  prevState.breadcrumbsList
                )
              : [],
          }));
        } else {
          setError(res.Message);
        }
      } catch (err) {
        console.error(err);

        setError(String(err));
      }
    }
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
      loading: false,
    }));
  };

  const refreshData = async () => {
    if (!fiscalYearId) return null;
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await Services.getDocumentsList(fiscalYearId);

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          hasFolder: res.HasFolder,
          folderExists: res.FolderExists,
          breadcrumbsList: res.Folder
            ? updateBreadcrumbsList(
                { ...res.Folder, Name: 'Home' },
                prevState.breadcrumbsList
              )
            : [],
        }));
      } else {
        setError(res.Message);
      }
    } catch (err) {
      console.error(err);

      setError(String(err));
    }
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
      setState((prevState) => ({
        ...prevState,
        selectedItems: selectedItems.length
          ? []
          : [
              ...filteredActiveFolder.Documents,
              ...filteredActiveFolder.Folders,
            ],
      }));
    }
  };

  const handleOpenDeleteConfirmationDialog = (
    entities: (FolderModel | DocumentModel)[]
  ) => {
    setDeleteConfirmationState((prevState) => ({
      ...prevState,
      entities,
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
      entity: [],
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

  const deleteEntity = async (entity: DocumentModel | FolderModel) => {
    const deleteAction = isFolder(entity)
      ? Services.folderDelete
      : Services.documentDelete;

    return await deleteAction(entity.Id);
  };

  const deleteEntities = async () => {
    try {
      showDeleteConfirmationLoader();

      const { entities } = deleteConfirmationState;

      const res = await Promise.allSettled(
        entities.map((entity) => deleteEntity(entity))
      );

      if (isAnySucceed(res)) {
        await fetchFolders();
      }

      const errors = getErrorsList(res);

      if (errors.length) {
        hideDeleteConfirmationLoader();
        setState((prevState) => ({
          ...prevState,
          error: { messages: errors },
        }));
      } else {
        handleCloseDeleteConfirmationDialog();
        handleShowSuccessDialog('successDeleted');
      }
    } catch (err) {
      console.error(err);
      hideDeleteConfirmationLoader();
      setState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
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

  const handleOpenEditDocumentsDialog = (document?: DocumentModel) => {
    const selectedDocuments = document
      ? [document]
      : getDocuments(selectedItems);

    setEditDocumentsDialogState({
      documents: selectedDocuments,
      open: true,
    });
  };

  const handleCloseEditDocumentsDialog = (showSuccessDialog?: boolean) => {
    setEditDocumentsDialogState((prevState) => ({
      ...prevState,
      open: false,
    }));

    if (showSuccessDialog) handleShowSuccessDialog('successDocumentsUpdated');
  };

  const handleInitEditDocumentsDialogState = () => {
    setEditDocumentsDialogState({
      documents: [],
      open: false,
    });
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

  const handleInitEditDocumentDialog = () => {
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

  const publishSelectedDocuments = async (published: boolean) => {
    const docs = getInnerDocuments(selectedItems);
    const entities = getPublishedEntities(docs, published);

    if (entities.length) {
      try {
        setState((prevState) => ({
          ...prevState,
          publishing: true,
        }));

        const res = await Promise.allSettled(
          entities.map((entity) => publishDocument(entity))
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
            published ? 'successPublished' : 'successUnpublished'
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
    }
  };

  const handleChangeCurrentPage = useCallback((page: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page - 1,
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
    refreshData();
  }, []);

  useEffect(() => {
    resetSortParms();
  }, [filteredActiveFolder]);

  useEffect(() => {
    unselectItems();
    resetPage();
  }, [filteredActiveFolder, quickFilter]);

  const allPublished = useMemo(() => {
    const docs = getInnerDocuments(selectedItems);
    return docs.length && docs.every((doc) => doc.IsPublished);
  }, [selectedItems]);

  const entitesType = useMemo(() => {
    return getEntitiesType(selectedItems);
  }, [selectedItems]);

  const isDisabledEditButton = useMemo(() => {
    return (
      entitesType === 'both' ||
      (entitesType === 'folder' && selectedItems.length !== 1)
    );
  }, [entitesType, selectedItems]);

  const paginatedList = useMemo(() => {
    const { currentPage, rowsPerPage } = pagination;
    return list.slice(
      currentPage * rowsPerPage,
      currentPage * rowsPerPage + rowsPerPage
    );
  }, [list, pagination]);

  return {
    hasFolder: state.hasFolder,
    folderExists: state.folderExists,
    allPublished,
    entitesType,
    publishing,
    pagination,
    loading,
    error,
    rootFolder,
    refreshData,
    isDisabledEditButton,
    activeFolder: filteredActiveFolder,
    openUploadForm,
    successDialogState,
    handleInitSuccessDialogType,
    editDocumentsDialogState,
    editDocumentDialogState,
    editFolderDialogState,
    sortParams,
    totalItems: list.length,
    list: paginatedList,
    amount,
    selectedItems,
    breadcrumbsList,
    deleteConfirmationState,
    quickFilter,
    saveFile,
    publishDocuments,
    saveSelected,
    deleteEntities,
    fetchFolders,
    publishSelectedDocuments,
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
    handleOpenEditDocumentsDialog,
    handleCloseEditDocumentsDialog,
    handleInitEditDocumentsDialogState,
    handleOpenEditFolderDialog,
    handleCloseEditFolderDialog,
    handleInitEditFolderDialogState,
    handleChangeRowsPerPage,
    handleChangeCurrentPage,
    handleOpenEditDocumentDialog,
    handleCloseEditDocumentDialog,
    handleInitEditDocumentDialog,
  };
};

export default useDocumentsData;
