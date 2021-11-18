import { useState, ChangeEvent, useCallback } from 'react';
import { FolderModel, ErrorModel } from 'models';
import Services from 'services';

interface StateModel {
  error: ErrorModel | null;
  saving: boolean;
}

const useFolderEditorData = (
  selectedFolder: FolderModel,
  fetchFolders: () => Promise<void>,
  onClose: (showSuccessDialog?: boolean) => void
) => {
  const [state, setState] = useState<StateModel>({
    error: null,
    saving: false,
  });
  const [folderName, setFolderName] = useState(selectedFolder.Name);

  const setError = (message: string | string[]) => {
    setState((prevState) => ({
      ...prevState,
      error: { messages: typeof message === 'string' ? [message] : message },
      loading: false,
    }));
  };

  const initError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const handleChangeFolderName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setFolderName(value);
    },
    []
  );

  const save = async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        saving: true,
      }));

      const res = await Services.folderUpdate(selectedFolder.Id, folderName);

      if (res.IsSuccess) {
        await fetchFolders();
        setState((prevState) => ({
          ...prevState,
          saving: false,
        }));

        onClose(true);
      } else {
        setError(res.Message);
      }
    } catch (err) {
      console.error(err);

      setError(String(err));
    }
  };

  return {
    ...state,
    initError,
    folderName,
    handleChangeFolderName,
    save,
  };
};

export default useFolderEditorData;
