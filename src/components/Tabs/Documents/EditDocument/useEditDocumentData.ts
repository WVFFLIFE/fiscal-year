import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { SelectedAttributesModel, ErrorModel } from 'models';
import Services, {
  MettadataAttributeModel,
  FolderModel,
  DocumentModel,
} from 'services';

interface StateModel {
  attributes: MettadataAttributeModel[];
  attributesLoading: boolean;
  error: ErrorModel | null;
  saveFlag: boolean;
}

interface SelectedModel {
  folder: FolderModel;
  folderDepth: number;
  attributes: SelectedAttributesModel;
}

function stringsGroupToArray(val: string) {
  return val ? val.split(', ') : [];
}

function getFolderDepth(
  currentFolder: FolderModel,
  selectedFolder: FolderModel
): number {
  let depth = 0;

  if (currentFolder.Id === selectedFolder.Id) return depth;

  for (let folder of currentFolder.Folders) {
    if (folder.Id === selectedFolder.Id) {
      depth++;
    } else {
      depth = getFolderDepth(folder, selectedFolder);
    }
  }

  return depth;
}

function removeExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, '');
}

const useEditDocumentData = (
  rootFolder: FolderModel,
  activeFolder: FolderModel,
  selectedDocument: DocumentModel,
  fetchFolders: () => Promise<void>,
  onClose: () => void
) => {
  const [state, setState] = useState<StateModel>({
    attributes: [],
    attributesLoading: true,
    error: null,
    saveFlag: false,
  });
  const [selected, setSelected] = useState<SelectedModel>(() => ({
    folder: activeFolder,
    folderDepth: getFolderDepth(rootFolder, activeFolder),
    attributes: {
      Information_x0020_Group: stringsGroupToArray(
        selectedDocument.Values.Information_x0020_Group
      ),
      Service_x002f_Process: stringsGroupToArray(
        selectedDocument.Values.Service_x002f_Process
      ),
      Viewing_x0020_rights: stringsGroupToArray(
        selectedDocument.Values.Viewing_x0020_rights
      ),
    },
  }));
  const [documentName, setDocumentName] = useState(() =>
    removeExtension(selectedDocument.Name)
  );
  const [newFolder, setNewFolder] = useState({
    name: '',
    show: false,
  });

  const setError = (message: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      attributes: [],
      error: { messages: typeof message === 'string' ? [message] : message },
      loading: false,
    }));
  };

  const handleChangeDocumentName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setDocumentName(value);
    },
    []
  );

  const handleAddNewFolder = () => {
    setNewFolder({
      name: '',
      show: true,
    });
  };

  const handleRemoveNewFolder = () => {
    setNewFolder({
      name: '',
      show: false,
    });
  };

  const handleChangeNewFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewFolder((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleChangeAttribute = (
    e: ChangeEvent<HTMLInputElement>,
    groupName: string
  ) => {
    const { name, checked } = e.target;

    setSelected((prevState) => ({
      ...prevState,
      attributes: {
        ...prevState.attributes,
        [groupName]: checked
          ? prevState.attributes[
              groupName as keyof SelectedAttributesModel
            ].concat(name)
          : prevState.attributes[
              groupName as keyof SelectedAttributesModel
            ].filter((item) => item !== name),
      },
    }));
  };

  const handleUpdateSelectedFolderName = (newFolderName: string) => {
    setSelected((prevState) => ({
      ...prevState,
      folder: {
        ...prevState.folder,
        Name: newFolderName,
      },
    }));
  };

  const handleChangeSelectedFolder = (
    newFolder: FolderModel,
    folderDepth: number
  ) => {
    setSelected((prevState) => ({
      ...prevState,
      folder: newFolder,
      folderDepth: folderDepth,
    }));
  };

  const handleSaveNewFolderName = async (
    folderId: string,
    newFolderName: string
  ) => {
    try {
      const res = await Services.folderUpdate(folderId, newFolderName);

      if (res.IsSuccess) {
        await fetchFolders();
        handleUpdateSelectedFolderName(newFolderName);
      } else {
        setState((prevState) => ({
          ...prevState,
          error: { messages: [res.Message] },
        }));
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  const save = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        saveFlag: true,
      }));

      const match = selectedDocument.Name.match(/\.[^/.]+$/);
      const ext = match ? match[0] : '';

      const values = [
        {
          Type: 'MultiChoise',
          InternalName: 'Information_x0020_Group',
          Values: selected.attributes.Information_x0020_Group,
        },
        {
          Type: 'MultiChoise',
          InternalName: 'Service_x002f_Process',
          Values: selected.attributes.Service_x002f_Process,
        },
        {
          Type: 'MultiChoise',
          InternalName: 'Viewing_x0020_rights',
          Values: selected.attributes.Viewing_x0020_rights,
        },
      ];

      const res = await Services.documentUpdate(
        selectedDocument.Id,
        documentName.concat(ext),
        values
      );

      if (res.IsSuccess) {
        await fetchFolders();
        setState((prevState) => ({
          ...prevState,
          saveFlag: false,
        }));

        onClose();
      } else {
        setError(res.Message);
      }
    } catch (err) {
      console.error(err);

      setError(String(err));
    }
  };

  useEffect(() => {
    async function getMetadata() {
      try {
        const res = await Services.getDocumentFormMetadata();

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            attributes: res.Attributes,
            attributesLoading: false,
          }));
        } else {
          setError(res.Message);
        }
      } catch (err) {
        console.error(err);

        setError(String(err));
      }
    }

    getMetadata();
  }, []);

  return {
    ...state,
    documentName,
    handleChangeDocumentName,
    handleAddNewFolder,
    handleRemoveNewFolder,
    selected,
    newFolder,
    save,
    handleChangeNewFolderName,
    handleChangeAttribute,
    handleChangeSelectedFolder,
    handleSaveNewFolderName,
  };
};

export default useEditDocumentData;
