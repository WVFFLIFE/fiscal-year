import { useMemo, useEffect, useCallback, useState } from 'react';

import Services, { FolderModel, DocumentModel } from 'services';

import { saveAs } from 'file-saver';
import _first from 'lodash/first';
import _last from 'lodash/last';
import { getDeepIdsList, isPublished } from 'utils';
import { prepareData, limitFoldersDepth } from './utils';

interface EntityModel {
  id: string;
  type: 'doc' | 'folder';
}

interface DeleteConfirmationStateModel {
  open: boolean;
  entity: EntityModel | null;
  loading: boolean;
}

const useDocumentsData = () => {
  const [breadcrumbsList, setBreadcrumbsList] = useState<FolderModel[]>([]);
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [deleteConfirmationState, setDeleteConfirmationState] =
    useState<DeleteConfirmationStateModel>({
      open: false,
      entity: null,
      loading: false,
    });

  const rootFolder = _first(breadcrumbsList) || null;
  const activeFolder = _last(breadcrumbsList) || null;

  const fetchFolders = async () => {
    const res = await Services.getDocumentsList(
      '53820CFC-8E4A-E711-8106-005056AC126A'
    );

    setBreadcrumbsList([
      {
        ...res.Folder,
        Folders: limitFoldersDepth(res.Folder.Folders),
      },
    ]);
  };

  const handleChangeQuickFilter = useCallback((newFilter: string) => {
    setQuickFilter((prevState) => (prevState === newFilter ? null : newFilter));
  }, []);

  const handleChangeActiveFolder = useCallback((newFolder: FolderModel) => {
    setBreadcrumbsList((prevState) => prevState.concat(newFolder));
  }, []);

  const handleSelectBreadcrumbsFolder = (idx: number) => {
    setBreadcrumbsList((prevState) => prevState.slice(0, idx + 1));
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

  const handleChangeSelectedItems = (
    item: FolderModel | DocumentModel,
    selected: boolean
  ) => {
    const selectedItems = getDeepIdsList(item);

    setSelectedItems((prevState) =>
      selected
        ? prevState.concat(selectedItems)
        : prevState.filter((item) => !selectedItems.includes(item))
    );
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

  const handleOpenUploadForm = () => setOpenUploadForm(true);
  const handleCloseUploadForm = () => setOpenUploadForm(false);

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

  const saveFile = async (fileId: string) => {
    const res = await Services.documentDownload(fileId);

    if (res.IsSuccess) {
      saveAs(res.File.FileDataUrl, res.File.FileName);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  const list = useMemo(() => {
    return filteredActiveFolder ? prepareData(filteredActiveFolder) : [];
  }, [filteredActiveFolder]);

  const deepIdsList = useMemo(() => {
    return filteredActiveFolder ? getDeepIdsList(filteredActiveFolder) : [];
  }, [filteredActiveFolder]);

  return {
    rootFolder,
    selectedItems,
    openUploadForm,
    list,
    breadcrumbsList,
    deleteConfirmationState,
    deepIdsList,
    quickFilter,
    saveFile,
    deleteEntity,
    fetchFolders,
    handleInitDeleteEntity,
    handleOpenUploadForm,
    handleCloseUploadForm,
    handleChangeSelectedItems,
    handleOpenDeleteConfirmationDialog,
    handleCloseDeleteConfirmationDialog,
    handleSelectBreadcrumbsFolder,
    handleChangeActiveFolder,
    handleChangeQuickFilter,
  };
};

export default useDocumentsData;
