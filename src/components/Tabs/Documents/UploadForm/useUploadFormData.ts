import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import { ErrorModel, SelectedAttributesModel, FolderModel } from 'models';
import Services, { MettadataAttributeModel } from 'services';
import _uniqBy from 'lodash/uniqBy';
import { readFile } from 'utils';
import { getFolderDepth } from '../utils';

interface State {
  attributes: MettadataAttributeModel[];
  selectedFolder: FolderModel | null;
  selectedFolderDepth: number | null;
  loading: boolean;
  uploadFlag: boolean;
  error: ErrorModel | null;
  overwrite: boolean;
}

interface NewFolderModel {
  show: boolean;
  name: string;
}

const useUploadFormData = (
  rootFolder: FolderModel,
  activeFolder: FolderModel,
  fetchFolders: () => Promise<void>,
  onClose: (showSuccessDialog?: boolean) => void
) => {
  const [state, setState] = useState<State>(() => ({
    attributes: [],
    selectedFolder: activeFolder,
    selectedFolderDepth: getFolderDepth(rootFolder, activeFolder),
    loading: true,
    error: null,
    overwrite: false,
    uploadFlag: false,
  }));
  const [newFolder, setNewFolder] = useState<NewFolderModel>({
    name: '',
    show: false,
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [selectedAttributes, setSelectedAttributes] =
    useState<SelectedAttributesModel>({
      Information_x0020_Group: ['Tilinpäätös'],
      Service_x002f_Process: ['Talous'],
      Viewing_x0020_rights: ['Isännöitsijä', 'Kirjanpitäjä', 'Hallitus'],
    });

  const setError = (messages: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      error: { messages: Array.isArray(messages) ? messages : [messages] },
      loading: false,
    }));
  };

  const initErrors = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const handleUpdateSelectedFolderName = (newFolderName: string) => {
    setState((prevState) => ({
      ...prevState,
      selectedFolder: prevState.selectedFolder
        ? {
            ...prevState.selectedFolder,
            Name: newFolderName,
          }
        : null,
    }));
  };

  const handleChangeSelectedFolder = (
    newFolder: FolderModel,
    folderDepth: number
  ) => {
    setState((prevState) => ({
      ...prevState,
      selectedFolder: newFolder,
      selectedFolderDepth: folderDepth,
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

  const handleChangeNewFolderName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setNewFolder((prevState) => ({
      ...prevState,
      name: value,
    }));
  };

  const handleSelectFiles = useCallback((files: File[]) => {
    setSelectedFiles((prevState) => _uniqBy(prevState.concat(files), 'name'));
  }, []);

  const handleRemoveFile = useCallback((name: string) => {
    setSelectedFiles((prevState) =>
      prevState.filter((file) => file.name !== name)
    );
  }, []);

  const handleChangeAttribute = (
    e: ChangeEvent<HTMLInputElement>,
    groupName: string
  ) => {
    const { name, checked } = e.target;

    setSelectedAttributes((prevState) => ({
      ...prevState,
      [groupName]: checked
        ? prevState[groupName as keyof SelectedAttributesModel].concat(name)
        : prevState[groupName as keyof SelectedAttributesModel].filter(
            (item) => item !== name
          ),
    }));
  };

  const uploadDoc = async (file: File, parentFolderId: string) => {
    const dataURL: string = await readFile(file);
    const values = [
      {
        Type: 'MultiChoise',
        InternalName: 'Information_x0020_Group',
        Values: selectedAttributes.Information_x0020_Group,
      },
      {
        Type: 'MultiChoise',
        InternalName: 'Service_x002f_Process',
        Values: selectedAttributes.Service_x002f_Process,
      },
      {
        Type: 'MultiChoise',
        InternalName: 'Viewing_x0020_rights',
        Values: selectedAttributes.Viewing_x0020_rights,
      },
    ];

    return Services.documentCreate(
      parentFolderId,
      { FileName: file.name, FileDataUrl: dataURL },
      values,
      state.overwrite
    );
  };

  const uploadDocs = async (parentFolderId: string) => {
    let errors: string[] = [];

    for (let file of selectedFiles) {
      try {
        const res = await uploadDoc(file, parentFolderId);

        if (!res.IsSuccess) {
          errors.push(res.Message);
        }
      } catch (err) {
        console.error(err);
        errors.push(String(err));
      }
    }

    if (errors.length !== selectedFiles.length) {
      await fetchFolders();
    }

    if (errors.length) {
      setError(errors);
    } else {
      onClose(true);
    }
  };

  const createFolderAndUpload = async (parentFolderId: string) => {
    const createdFolderRes = await Services.folderCreate(
      parentFolderId,
      newFolder.name
    );

    if (createdFolderRes.IsSuccess) {
      await uploadDocs(createdFolderRes.FolderId);
    } else {
      setState((prevState) => ({
        ...prevState,
        error: { messages: [createdFolderRes.Message] },
      }));
    }
  };

  const upload = async () => {
    if (state.selectedFolder) {
      try {
        setState((prevState) => ({
          ...prevState,
          uploadFlag: true,
        }));

        const parentFolderId = state.selectedFolder.Id;

        if (newFolder.name && newFolder.show) {
          await createFolderAndUpload(parentFolderId);
        } else {
          await uploadDocs(parentFolderId);
        }

        setState((prevState) => ({
          ...prevState,
          uploadFlag: false,
        }));
      } catch (err) {
        console.error(err);

        setState((prevState) => ({
          ...prevState,
          error: { messages: [String(err)] },
          uploadFlag: false,
        }));
      }
    }
  };

  useEffect(() => {
    async function getMetadata() {
      try {
        const res = await Services.getDocumentFormMetadata();

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            attributes: res.Attributes,
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
    if (state.selectedFolderDepth && state.selectedFolderDepth >= 2) {
      handleRemoveNewFolder();
    }
  }, [state.selectedFolderDepth]);

  return {
    ...state,
    selectedAttributes,
    handleChangeSelectedFolder,
    handleChangeAttribute,
    selectedFiles,
    handleSaveNewFolderName,
    handleRemoveFile,
    newFolder,
    handleSelectFiles,
    handleAddNewFolder,
    handleRemoveNewFolder,
    handleChangeNewFolderName,
    handleChangeOverwriteCheckbox,
    upload,
    initErrors,
  };
};

export default useUploadFormData;
