import { useState, useEffect, useCallback } from 'react';
import { ExtendedCooperativeModel, FiscalYearModel, ErrorModel } from 'models';

import Services from 'services';

import { findFiscalYear } from './utils';

interface SelectedModel {
  cooperative: ExtendedCooperativeModel;
  fiscalYear: FiscalYearModel | null;
}

interface StateModel {
  fiscalYears: FiscalYearModel[];
  loading: boolean;
  error: ErrorModel | null;
  searchTerm: string;
}

const useGeneralPageData = (
  extendedCooperatives: ExtendedCooperativeModel[],
  defaultCooperative: ExtendedCooperativeModel
) => {
  const [state, setState] = useState<StateModel>({
    fiscalYears: [],
    loading: true,
    error: null,
    searchTerm: '',
  });
  const [selected, setSelected] = useState<SelectedModel>(() => ({
    cooperative: defaultCooperative,
    fiscalYear: null,
  }));

  useEffect(() => {
    (async function () {
      try {
        const res = await Services.getCooperativeFiscalYearsList(
          selected.cooperative.Id
        );

        if (res.IsSuccess) {
          const currentFY = findFiscalYear(
            res.FiscalYears,
            defaultCooperative.FiscalYearId
          );

          console.log(currentFY, 'CURRENT_FY');

          setSelected((prevState) => ({
            ...prevState,
            fiscalYear: currentFY,
          }));

          setState((prevState) => ({
            ...prevState,
            fiscalYears: res.FiscalYears,
            loading: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [res.Message] },
          }));
        }
      } catch (err) {
        console.error(err);

        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    })();
  }, [selected.cooperative, defaultCooperative.FiscalYearId]);

  const handleChangeSelectedCooperatives = useCallback(
    (cooperatives: ExtendedCooperativeModel[]) => {
      const [cooperative] = cooperatives;

      setSelected((prevState) => ({
        ...prevState,
        cooperative,
      }));
    },
    []
  );

  const handleChangeSearchTerm = useCallback((newVal: string) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: newVal,
    }));
  }, []);

  const handleChangeFiscalYear = useCallback(
    (newFiscalYear: FiscalYearModel) => {
      setSelected((prevState) => ({
        ...prevState,
        fiscalYear: newFiscalYear,
      }));
    },
    []
  );

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    state,
    selected,
    handleInitError,
    handleChangeSearchTerm,
    handleChangeFiscalYear,
    handleChangeSelectedCooperatives,
  };
};

export default useGeneralPageData;
