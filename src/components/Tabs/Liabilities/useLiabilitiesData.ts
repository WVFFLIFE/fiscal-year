import { useState, useEffect } from 'react';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { ErrorModel } from 'models';
import { getFiscalYearId } from 'utils/fiscalYear';
import { Services } from 'services/s';
import { liabilitiesAdapter, EnhancedLiability } from 'utils/liabilities';

const LiabilitiesService = new Services.Liabilities();

interface RequestState {
  liabilities: EnhancedLiability[];
  loading: boolean;
  error: ErrorModel | null;
}

const useLiabilitiesData = () => {
  const {
    state: { fiscalYear },
  } = useGeneralCtx();
  const [requestState, setRequestState] = useState<RequestState>({
    liabilities: [],
    error: null,
    loading: false,
  });
  const fiscalYearId = getFiscalYearId(fiscalYear);

  const fetchLiabilitiesList = async (fiscalYearId: string) => {
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await LiabilitiesService.getList(fiscalYearId);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          liabilities: liabilitiesAdapter(res.Liabilities),
          loading: false,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  useEffect(() => {
    if (fiscalYearId) {
      fetchLiabilitiesList(fiscalYearId);
    }
  }, [fiscalYear]);

  return { requestState };
};

export default useLiabilitiesData;
