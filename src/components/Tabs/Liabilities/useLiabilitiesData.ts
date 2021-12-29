import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { ErrorModel } from 'models';
import { Services } from 'services/s';
import { liabilitiesAdapter, EnhancedLiability } from 'utils/liabilities';

const LiabilitiesService = new Services.Liabilities();

interface RequestState {
  liabilities: EnhancedLiability[];
  selectedRows: string[];
  loading: boolean;
  deleting: boolean;
  error: ErrorModel | null;
}

const useLiabilitiesData = () => {
  const {
    state: { fiscalYear },
  } = useGeneralCtx();
  const [requestState, setRequestState] = useState<RequestState>({
    liabilities: [],
    selectedRows: [],
    error: null,
    loading: false,
    deleting: false,
  });

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
          selectedRows: [],
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

  const handleUpdateList = useCallback(() => {
    if (!fiscalYear?.id) return;

    fetchLiabilitiesList(fiscalYear.id);
  }, [fiscalYear?.id]);

  const handleToggleSelectAll = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      setRequestState((prevState) => ({
        ...prevState,
        selectedRows: checked
          ? prevState.liabilities.map((item) => item.id)
          : [],
      }));
    },
    []
  );

  const handleToggleSelectRow = useCallback(
    (liabilityItem: EnhancedLiability) => {
      setRequestState((prevState) => ({
        ...prevState,
        selectedRows: prevState.selectedRows.includes(liabilityItem.id)
          ? prevState.selectedRows.filter((item) => item !== liabilityItem.id)
          : prevState.selectedRows.concat(liabilityItem.id),
      }));
    },
    []
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const handleDelete = async (ids: string[], cb?: () => void) => {
    try {
      setRequestState((prevState) => ({
        ...prevState,
        deleting: true,
      }));

      const res = await LiabilitiesService.delete(ids);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          deleting: false,
        }));

        if (cb) cb();

        if (fiscalYear && fiscalYear.id) {
          fetchLiabilitiesList(fiscalYear.id);
        }
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        deleting: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  useEffect(() => {
    if (fiscalYear && fiscalYear.id) {
      fetchLiabilitiesList(fiscalYear.id);
    }
  }, [fiscalYear]);

  return {
    requestState,
    handleUpdateList,
    handleInitError,
    handleDelete,
    handleToggleSelectAll,
    handleToggleSelectRow,
  };
};

export default useLiabilitiesData;