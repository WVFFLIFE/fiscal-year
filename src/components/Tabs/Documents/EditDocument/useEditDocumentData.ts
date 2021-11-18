import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { SelectedAttributesModel, ErrorModel } from 'models';
import Services, {
  MettadataAttributeModel,
  FolderModel,
  DocumentModel,
} from 'services';
import { stringsGroupToArray, getFolderDepth } from '../utils';

interface StateModel {
  attributes: MettadataAttributeModel[];
  attributesLoading: boolean;
  error: ErrorModel | null;
  overwrite: boolean;
  saveFlag: boolean;
}

interface SelectedModel {
  folder: FolderModel;
  folderDepth: number;
  attributes: SelectedAttributesModel;
}

function removeExtension(filename: string) {
  return filename.replace(/\.[^/.]+$/, '');
}

const useEditDocumentData = (
  rootFolder: FolderModel,
  activeFolder: FolderModel,
  selectedDocument: DocumentModel,
  fetchFolders: () => Promise<void>,
  onClose: (showSuccessDialog?: boolean) => void
) => {
  const [state, setState] = useState<StateModel>({
    attributes: [],
    attributesLoading: true,
    error: null,
    overwrite: false,
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

  const initError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
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

  const handleChangeOverwriteCheckbox = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setState((prevState) => ({
        ...prevState,
        overwrite: checked,
      }));
    },
    []
  );

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

      // If parentFolderId is not changed, you must send undefined as parentFolderId field
      // If you send the same parentFolderId,
      // document will be copied and created with another id
      const parentFolderId =
        selected.folder.Id === activeFolder.Id ? undefined : selected.folder.Id;

      const res = await Services.documentUpdate(
        selectedDocument.Id,
        documentName.concat(ext),
        values,
        parentFolderId,
        state.overwrite
      );

      if (res.IsSuccess) {
        await fetchFolders();
        setState((prevState) => ({
          ...prevState,
          saveFlag: false,
        }));

        onClose(true);
      } else {
        setState((prevState) => ({
          ...prevState,
          saveFlag: false,
          error: { messages: [res.Message] },
        }));
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        saveFlag: false,
        error: { messages: [String(err)] },
      }));
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
          setState((prevState) => ({
            ...prevState,
            attributesLoading: false,
            error: { messages: [res.Message] },
          }));
        }
      } catch (err) {
        console.error(err);
        setState((prevState) => ({
          ...prevState,
          attributesLoading: false,
          error: { messages: [String(err)] },
        }));
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
    initError,
    handleChangeNewFolderName,
    handleChangeAttribute,
    handleChangeSelectedFolder,
    handleSaveNewFolderName,
    handleChangeOverwriteCheckbox,
  };
};

export default useEditDocumentData;
