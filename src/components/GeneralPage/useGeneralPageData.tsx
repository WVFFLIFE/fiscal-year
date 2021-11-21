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
  showTabs: boolean;
  selected: SelectedModel;
}

const useGeneralPageData = (defaultCooperative: ExtendedCooperativeModel) => {
  const [state, setState] = useState<StateModel>({
    fiscalYears: [],
    loading: true,
    error: null,
    searchTerm: '',
    showTabs: false,
    selected: {
      cooperative: defaultCooperative,
      fiscalYear: null,
    },
  });

  useEffect(() => {
    (async function () {
      try {
        const res = await Services.getCooperativeFiscalYearsList(
          state.selected.cooperative.Id
        );

        if (res.IsSuccess) {
          const currentFY = findFiscalYear(
            res.FiscalYears,
            state.selected.cooperative.FiscalYearId
          );

          setState((prevState) => ({
            ...prevState,
            fiscalYears: res.FiscalYears,
            selected: {
              ...prevState.selected,
              fiscalYear: currentFY,
            },
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
  }, [state.selected.cooperative]);

  useEffect(() => {
    if (state.showTabs) {
      setState((prevState) => ({
        ...prevState,
        showTabs: false,
      }));
    }
  }, [state.selected.fiscalYear]);

  const handleChangeSelectedCooperatives = useCallback(
    (cooperatives: ExtendedCooperativeModel[]) => {
      const [cooperative] = cooperatives;

      setState((prevState) => ({
        ...prevState,
        selected: {
          ...prevState.selected,
          cooperative,
        },
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
      setState((prevState) => ({
        ...prevState,
        selected: {
          ...prevState.selected,
          fiscalYear: newFiscalYear,
        },
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

  const handleShowTabs = () => {
    setState((prevState) => ({
      ...prevState,
      showTabs: true,
    }));
  };

  return {
    state,
    handleShowTabs,
    handleInitError,
    handleChangeSearchTerm,
    handleChangeFiscalYear,
    handleChangeSelectedCooperatives,
  };
};

export default useGeneralPageData;
