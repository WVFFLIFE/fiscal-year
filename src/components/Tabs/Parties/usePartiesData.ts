import { useState, useEffect } from 'react';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { partiesSectionsAdapter, PartySectionModel } from 'utils/fiscalYear';
import { ErrorModel } from 'models';

import Services from 'services';

interface StateModel {
  sections: PartySectionModel[];
  loading: boolean;
  error: ErrorModel | null;
}

const usePartiesData = () => {
  const { fiscalYear } = useGeneralCtx().state;

  const [state, setState] = useState<StateModel>({
    sections: [],
    loading: false,
    error: null,
  });

  const fetchPartiesData = async (coopId: string, fiscalYearId: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await Services.getCooperativeParties(coopId, fiscalYearId);

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          sections: partiesSectionsAdapter(res.Sections),
          loading: false,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  useEffect(() => {
    if (fiscalYear && fiscalYear.id && fiscalYear.general.cooperativeId) {
      fetchPartiesData(fiscalYear.general.cooperativeId, fiscalYear.id);
    }
  }, [fiscalYear]);

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return { ...state, handleInitError };
};

export default usePartiesData;
