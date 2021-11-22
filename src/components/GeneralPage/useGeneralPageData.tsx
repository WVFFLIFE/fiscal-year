import { useState, useEffect, useCallback } from 'react';
import {
  ExtendedCooperativeModel,
  CommonCooperativeModel,
  FiscalYearModel,
  ErrorModel,
} from 'models';

import Services from 'services';

interface SelectedModel {
  cooperative: CommonCooperativeModel | null;
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

function findCooperative(
  defaultCooperative: ExtendedCooperativeModel,
  commonCooperatives: CommonCooperativeModel[]
) {
  return (
    commonCooperatives.find((commonCoop) => {
      return commonCoop.Id === defaultCooperative.Id;
    }) || null
  );
}

const useGeneralPageData = (
  defaultCooperative: ExtendedCooperativeModel,
  commonCooperatives: CommonCooperativeModel[]
) => {
  const [state, setState] = useState<StateModel>(() => ({
    fiscalYears: [],
    loading: true,
    error: null,
    searchTerm: '',
    showTabs: false,
    selected: {
      cooperative: findCooperative(defaultCooperative, commonCooperatives),
      fiscalYear: null,
    },
  }));

  useEffect(() => {
    async function fetchData(coop: CommonCooperativeModel) {
      try {
        const res = await Services.getCooperativeFiscalYearsList(coop.Id);

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            fiscalYears: res.FiscalYears,
            selected: {
              ...prevState.selected,
              fiscalYear: res.FiscalYears[0] || null,
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
    }

    if (state.selected.cooperative) {
      fetchData(state.selected.cooperative);
    }
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
    (cooperatives: CommonCooperativeModel[]) => {
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
