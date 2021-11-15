import { useState, useEffect } from 'react';
import { SelectedAttributesModel, ErrorModel } from 'models';
import Services, {
  MettadataAttributeModel,
  FolderModel,
  DocumentModel,
} from 'services';

interface StateModel {
  attributes: MettadataAttributeModel[];
  attributesLoading: boolean;
  selectedAttributes: SelectedAttributesModel;
  error: ErrorModel | null;
}

const useEditDocumentData = (
  rootFolder: FolderModel,
  selectedDocument: DocumentModel,
  fetchFolders: () => Promise<void>,
  onClose: () => void
) => {
  const [state, setState] = useState<StateModel>({
    attributes: [],
    attributesLoading: true,
    error: null,
    selectedAttributes: {
      Information_x0020_Group: [],
      Service_x002f_Process: [],
      Viewing_x0020_rights: [],
    },
  });

  const setError = (message: string) => {
    setState((prevState) => ({
      ...prevState,
      attributes: [],
      error: { messages: [message] },
      loading: false,
    }));
  };

  useEffect(() => {
    async function getMetadata() {
      try {
        const res = await Services.getDocumentFormMetadata();

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
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
};

export default useEditDocumentData;
