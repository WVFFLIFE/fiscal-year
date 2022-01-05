import { useState } from 'react';
import useStateSelector from 'hooks/useStateSelector';
import { ErrorModel } from 'models';

import { Services } from 'services/s';

const FiscalYearService = new Services.FiscalYear();

interface Options {
  onClose(): void;
}

interface RequestState {
  creating: boolean;
  error: ErrorModel | null;
}

const useCreateFromTemplateData = (options: Options) => {
  const { onClose } = options;
  const { defaultCooperativeId } = useStateSelector((state) => ({
    defaultCooperativeId: state.app.defaultCooperativeId,
  }));
  const [requestState, setRequestState] = useState<RequestState>({
    creating: false,
    error: null,
  });

  const handleCreateFromTemplate = async () => {
    if (!defaultCooperativeId) return;

    try {
      setRequestState((prevState) => ({
        ...prevState,
        creating: true,
      }));

      const res = await FiscalYearService.createFromTemplate(
        defaultCooperativeId
      );

      if (res.IsSuccess) {
        onClose();
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        creating: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return { requestState, handleCreateFromTemplate, handleInitError };
};

export default useCreateFromTemplateData;
