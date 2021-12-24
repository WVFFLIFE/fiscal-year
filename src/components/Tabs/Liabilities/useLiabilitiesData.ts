import { useState, useEffect, useCallback, ChangeEvent } from 'react';
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
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

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

  const handleToggleSelectAll = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setSelectedRows(
        checked ? requestState.liabilities.map((item) => item.id) : []
      );
    },
    [requestState.liabilities]
  );

  const handleToggleSelectRow = useCallback(
    (liabilityItem: EnhancedLiability) => {
      setSelectedRows((prevState) =>
        prevState.includes(liabilityItem.id)
          ? prevState.filter((item) => item !== liabilityItem.id)
          : prevState.concat(liabilityItem.id)
      );
    },
    []
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  useEffect(() => {
    if (fiscalYearId) {
      fetchLiabilitiesList(fiscalYearId);
    }
  }, [fiscalYear]);

  return {
    requestState,
    selectedRows,
    handleInitError,
    handleToggleSelectAll,
    handleToggleSelectRow,
  };
};

export default useLiabilitiesData;
