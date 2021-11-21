import { useState, useEffect, useCallback, ChangeEvent } from 'react';

import {
  FolderModel,
  DocumentModel,
  MettadataAttributeModel,
  ErrorModel,
  SelectedAttributesModel,
} from 'models';

import Services, { UploadFileValue } from 'services';

import { getFolderDepth } from '../utils';

interface SelectedModel {
  folder: FolderModel;
  folderDepth: number;
  attributes: SelectedAttributesModel;
}

interface StateModel {
  attributes: MettadataAttributeModel[];
  attributesLoading: boolean;
  error: ErrorModel | null;
  overwrite: boolean;
  saveFlag: boolean;
  selected: SelectedModel;
}

const useEditDocumentsData = (
  rootFolder: FolderModel,
  activeFolder: FolderModel,
  selectedDocuments: DocumentModel[],
  fetchFolders: () => Promise<void>,
  onClose: (showSuccessDialog?: boolean) => void
) => {
  const [state, setState] = useState<StateModel>(() => ({
    attributes: [],
    attributesLoading: true,
    error: null,
    overwrite: false,
    saveFlag: false,
    selected: {
      folder: activeFolder,
      folderDepth: getFolderDepth(rootFolder, activeFolder),
      attributes: {
        Information_x0020_Group: ['Tilinpäätös'],
        Service_x002f_Process: ['Talous'],
        Viewing_x0020_rights: ['Isännöitsijä', 'Kirjanpitäjä', 'Hallitus'],
      },
    },
  }));
  const [newFolder, setNewFolder] = useState({
    name: '',
    show: false,
  });

  const setError = (message: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      attributesLoading: false,
      saveFlag: false,
      error: { messages: typeof message === 'string' ? [message] : message },
    }));
  };

  const initError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

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

    setState((prevState) => ({
      ...prevState,
      selected: {
        ...prevState.selected,
        attributes: {
          ...prevState.selected.attributes,
          [groupName]: checked
            ? prevState.selected.attributes[
                groupName as keyof SelectedAttributesModel
              ].concat(name)
            : prevState.selected.attributes[
                groupName as keyof SelectedAttributesModel
              ].filter((item) => item !== name),
        },
      },
    }));
  };

  const handleUpdateSelectedFolderName = (newFolderName: string) => {
    setState((prevState) => ({
      ...prevState,
      selected: {
        ...prevState.selected,
        folder: {
          ...prevState.selected.folder,
          Name: newFolderName,
        },
      },
    }));
  };

  const handleChangeSelectedFolder = (
    newFolder: FolderModel,
    folderDepth: number
  ) => {
    setState((prevState) => ({
      ...prevState,
      selected: {
        ...prevState.selected,
        folder: newFolder,
        folderDepth,
      },
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

  const updateDoc = async (
    doc: DocumentModel,
    values: UploadFileValue[],
    parentFolderId: string | null,
    overwrite: boolean
  ) => {
    return await Services.documentUpdate(
      doc.Id,
      doc.Name,
      values,
      parentFolderId,
      overwrite
    );
  };

  const updateDocs = async () => {
    setState((prevState) => ({
      ...prevState,
      saveFlag: true,
    }));

    const values = [
      {
        Type: 'MultiChoise',
        InternalName: 'Information_x0020_Group',
        Values: state.selected.attributes.Information_x0020_Group,
      },
      {
        Type: 'MultiChoise',
        InternalName: 'Service_x002f_Process',
        Values: state.selected.attributes.Service_x002f_Process,
      },
      {
        Type: 'MultiChoise',
        InternalName: 'Viewing_x0020_rights',
        Values: state.selected.attributes.Viewing_x0020_rights,
      },
    ];
    const parentFolderId =
      state.selected.folder.Id === activeFolder.Id
        ? null
        : state.selected.folder.Id;
    let errors: string[] = [];

    for (let document of selectedDocuments) {
      try {
        const res = await updateDoc(
          document,
          values,
          parentFolderId,
          state.overwrite
        );

        if (!res.IsSuccess) {
          errors.push(res.Message);
        }
      } catch (err) {
        console.error(err);
        errors.push(String(err));
      }
    }

    if (errors.length !== selectedDocuments.length) {
      await fetchFolders();
    }

    if (errors.length) {
      setError(errors);
    } else {
      onClose(true);
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

  useEffect(() => {
    if (state.selected.folderDepth && state.selected.folderDepth >= 2) {
      handleRemoveNewFolder();
    }
  }, [state.selected.folderDepth]);

  return {
    ...state,
    newFolder,
    initError,
    updateDocs,
    handleAddNewFolder,
    handleRemoveNewFolder,
    handleChangeNewFolderName,
    handleChangeAttribute,
    handleSaveNewFolderName,
    handleChangeOverwriteCheckbox,
    handleChangeSelectedFolder,
  };
};

export default useEditDocumentsData;
