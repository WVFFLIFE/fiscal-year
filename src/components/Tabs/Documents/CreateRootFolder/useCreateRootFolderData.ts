import { useState, useEffect } from 'react';
import useStateSelector from 'hooks/useStateSelector';
import useMountedEffect from 'hooks/useMountedEffect';

import { ErrorModel } from 'models';
import { BaseFolderStatusCode } from 'enums/responses';

import { selectFiscalYear } from 'selectors/generalPageSelectors';

import { Services } from 'services/s';

const DocumentsService = new Services.Documents();

interface RequestStateModel {
  creating: boolean;
  loading: boolean;
  error: ErrorModel | null;
  status: BaseFolderStatusCode;
}

const useCreateRootFolderData = () => {
  const fiscalYear = useStateSelector(selectFiscalYear);

  const [requestState, setRequestState] = useState<RequestStateModel>({
    creating: false,
    loading: true,
    error: null,
    status: BaseFolderStatusCode.Unknown,
  });

  const getFolderStatus = async () => {
    if (!fiscalYear?.id) return;
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await DocumentsService.getBaseFolderStatus(fiscalYear.id);

      if (!res.IsSuccess) throw new Error(res.Message);

      if (res.CreationStatus === BaseFolderStatusCode.Error) {
        throw new Error(res.CreationMessage);
      }

      setRequestState((prevState) => ({
        ...prevState,
        status: res.CreationStatus,
        loading: false,
      }));
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [(err as Error).message] },
      }));
    }
  };

  useEffect(() => {
    getFolderStatus();
  }, []);

  useMountedEffect(() => {
    if (!requestState.creating) {
      getFolderStatus();
    }
  }, [requestState.creating]);

  const handleCreateFolder = async () => {
    if (!fiscalYear?.id) return;
    try {
      setRequestState((prevState) => ({
        ...prevState,
        creating: true,
      }));

      const res = await DocumentsService.createBaseFolder(fiscalYear.id);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          creating: false,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        creating: false,
        error: { messages: [(err as Error).message] },
      }));
    }
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return { requestState, handleInitError, handleCreateFolder };
};

export default useCreateRootFolderData;
