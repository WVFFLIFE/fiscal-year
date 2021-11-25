import { useState, useEffect, useCallback } from 'react';
import {
  CommonCooperativeModel,
  FiscalYearModel,
  ErrorModel,
  CalendarYearOption,
} from 'models';
import format from 'date-fns/format';

import Services from 'services';

interface SelectedModel {
  cooperative: CommonCooperativeModel | null;
  fiscalYear: FiscalYearModel | null;
}

interface StateModel {
  cooperatives: CommonCooperativeModel[];
  fiscalYears: FiscalYearModel[];
  loading: boolean;
  error: ErrorModel | null;
  searchTerm: string;
  showTabs: boolean;
  selected: SelectedModel;
}

function findCooperative(
  defaultCooperativeId: string,
  commonCooperatives: CommonCooperativeModel[]
) {
  return (
    commonCooperatives.find((commonCoop) => {
      return commonCoop.Id === defaultCooperativeId;
    }) || null
  );
}

const useGeneralPageData = (
  defaultCooperativeId: string,
  defaultFiscalYearId: string | null,
  selectedCalendarYear: CalendarYearOption
) => {
  const [state, setState] = useState<StateModel>(() => ({
    cooperatives: [],
    fiscalYears: [],
    loading: true,
    error: null,
    searchTerm: '',
    showTabs: false,
    selected: {
      cooperative: null,
      fiscalYear: null,
    },
  }));

  useEffect(() => {
    async function fetchData() {
      try {
        const start = format(
          selectedCalendarYear.start,
          "yyyy-MM-dd'T'00:00:00"
        );
        const end = format(selectedCalendarYear.end, "yyyy-MM-dd'T'00:00:00");
        const cooperativesListResponse = await Services.getCooperativesList(
          start,
          end
        );

        if (!cooperativesListResponse.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [cooperativesListResponse.Message] },
          }));
          return;
        }

        const coop = findCooperative(
          defaultCooperativeId,
          cooperativesListResponse.Cooperatives
        );

        if (!coop) return;

        const fiscalYearsListRespone =
          await Services.getCooperativeFiscalYearsList(coop.Id);

        if (!fiscalYearsListRespone.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [cooperativesListResponse.Message] },
          }));
          return;
        }

        setState((prevState) => ({
          ...prevState,
          cooperatives: cooperativesListResponse.Cooperatives,
          fiscalYears: fiscalYearsListRespone.FiscalYears,
          selected: {
            cooperative: coop,
            fiscalYear: coop.DefaultFiscalYear,
          },
          loading: false,
        }));
      } catch (err) {
        console.error(err);

        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    }

    fetchData();
  }, [defaultCooperativeId, selectedCalendarYear]);

  useEffect(() => {
    async function updateFiscalYearsList(coop: CommonCooperativeModel) {
      try {
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.getCooperativeFiscalYearsList(coop.Id);

        if (!res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [res.Message] },
          }));
          return;
        }

        setState((prevState) => ({
          ...prevState,
          fiscalYears: res.FiscalYears,
          selected: {
            ...prevState.selected,
            fiscalYear: coop.DefaultFiscalYear,
          },
          loading: false,
        }));
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
      updateFiscalYearsList(state.selected.cooperative);
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

      // (window.parent as any).setFrameArg((prevState: any) => ({
      //   ...prevState,
      //   orgId: cooperative.Id,
      // }));

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
      // (window.parent as any).setFrameArg((prevState: any) => ({
      //   ...prevState,
      //   fyId: newFiscalYear.Id,
      // }));

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
