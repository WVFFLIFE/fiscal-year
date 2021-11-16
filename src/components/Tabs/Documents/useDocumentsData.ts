import { useMemo, useEffect, useCallback, useState, ChangeEvent } from 'react';
import { EntityModel } from 'models';
import Services, { FolderModel, DocumentModel } from 'services';

import { saveAs } from 'file-saver';
import _first from 'lodash/first';
import _last from 'lodash/last';
import { isPublished } from 'utils';
import { prepareData, limitFoldersDepth, countEntitiesAmount } from './utils';

interface DeleteConfirmationStateModel {
  open: boolean;
  entity: EntityModel | null;
  loading: boolean;
}

const useDocumentsData = () => {
  const [breadcrumbsList, setBreadcrumbsList] = useState<FolderModel[]>([]);
  const [quickFilter, setQuickFilter] = useState<string | null>(null);
  const [selectedItems, setSelectedItems] = useState<
    (DocumentModel | FolderModel)[]
  >([]);
  const [openUploadForm, setOpenUploadForm] = useState(false);
  const [deleteConfirmationState, setDeleteConfirmationState] =
    useState<DeleteConfirmationStateModel>({
      open: false,
      entity: null,
      loading: false,
    });
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

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
    setSelectedItems((prevState) => {
      return selected
        ? prevState.concat(item)
        : prevState.filter((prevItem) => prevItem.Id !== item.Id);
    });
  };

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (filteredActiveFolder) {
      const { checked } = e.target;

      setSelectedItems(
        checked
          ? [...filteredActiveFolder.Documents, ...filteredActiveFolder.Folders]
          : []
      );
    }
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
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    setSelectedItems([]);
  }, [filteredActiveFolder, quickFilter]);

  return {
    rootFolder,
    activeFolder: filteredActiveFolder,
    openUploadForm,
    showSuccessDialog,
    list,
    amount,
    selectedItems,
    breadcrumbsList,
    deleteConfirmationState,
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
    handleShowSuccessDialog,
    handleCloseSuccessDialog,
    handleSelectAll,
  };
};

export default useDocumentsData;
