import { ErrorModel } from 'models';
import { useState, useEffect } from 'react';
import { Services, LiabilityDetails } from 'services/s';

const LiabilitiesService = Services.Liabilities.getInstance();

interface RequestStateModel {
  liability: LiabilityDetails | null;
  loading: boolean;
  error: ErrorModel | null;
}

const useLiabilityViewFormData = (id: string) => {
  const [requestState, setRequestState] = useState<RequestStateModel>({
    liability: null,
    loading: true,
    error: null,
  });

  const fetchLiability = async (id: string) => {
    try {
      const res = await LiabilitiesService.getLiability(id);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
          liability: res.Liability,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  useEffect(() => {
    if (id) {
      fetchLiability(id);
    }
  }, [id]);

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return { requestState, handleInitError };
};

export default useLiabilityViewFormData;
