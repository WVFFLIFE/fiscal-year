import { useState, useEffect, useMemo, ChangeEvent, useCallback } from 'react';
import {
  ErrorModel,
  SelectedAttributesModel,
  FolderPickerItemModel,
} from 'models';
import Services, { MettadataAttributeModel, FolderModel } from 'services';
import { SelectedFolder } from 'components/FolderPicker';
import _uniqBy from 'lodash/uniqBy';
import { getErrorsList } from 'utils';
import { transformFolders } from '../utils';

interface State {
  attributes: MettadataAttributeModel[];
  selectedFolder: SelectedFolder | null;
  loading: boolean;
  uploadFlag: boolean;
  error: ErrorModel | null;
  overwrite: boolean;
}

interface NewFoldeModel {
  show: boolean;
  name: string;
}

function readFile(file: File): Promise<string> {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.readAsDataURL(file);
    reader.onload = () => {
      resolve(String(reader.result));
    };
    reader.onerror = (error) => reject(error);
  });
}

const useUploadFormData = (
  rootFolder: FolderModel,
  fetchFolders: () => Promise<void>,
  onClose: () => void
) => {
  const [state, setState] = useState<State>({
    attributes: [],
    selectedFolder: null,
    loading: true,
    error: null,
    overwrite: false,
    uploadFlag: false,
  });
  const [newFolder, setNewFolder] = useState<NewFoldeModel>({
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
      attributes: [],
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

  const handleChangeSelectedFolder = (newFolder: SelectedFolder) => {
    setState((prevState) => ({
      ...prevState,
      selectedFolder: newFolder,
    }));
  };

  const saveNewFolderName = async (id: string, name: string) => {
    try {
      const res = await Services.folderUpdate(id, name);

      if (res.IsSuccess) {
        fetchFolders();
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
    const res = await Promise.allSettled(
      selectedFiles.map((file) => uploadDoc(file, parentFolderId))
    );

    const errors = getErrorsList(res);

    if (errors.length) {
      setError(errors);
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
    try {
      setState((prevState) => ({
        ...prevState,
        uploadFlag: true,
      }));

      const parentFolderId = state.selectedFolder
        ? state.selectedFolder.id
        : rootFolder.Id;

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
    if (state.selectedFolder?.sub) {
      handleRemoveNewFolder();
    }
  }, [state.selectedFolder]);

  const foldersOptions: FolderPickerItemModel[] = useMemo(() => {
    return transformFolders(rootFolder.Folders);
  }, [rootFolder]);

  return {
    ...state,
    foldersOptions,
    selectedAttributes,
    handleChangeSelectedFolder,
    handleChangeAttribute,
    selectedFiles,
    saveNewFolderName,
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
