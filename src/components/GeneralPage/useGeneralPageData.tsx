import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { CommonCooperativeModel, FiscalYearModel, ErrorModel } from 'models';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { serverFormat, isSameDay } from 'utils/dates';
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
  selected: SelectedModel;
  prev: SelectedModel;
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

function findFiscalYearById(
  defaultFYId: string,
  fiscalYearsList: FiscalYearModel[]
) {
  return (
    fiscalYearsList.find((fiscalYear) => {
      return fiscalYear.Id === defaultFYId;
    }) || null
  );
}

function findFiscalYearByDate(
  startDate: string,
  endDate: string,
  fiscalYears: FiscalYearModel[]
) {
  return (
    fiscalYears.find((fiscalYear) => {
      return (
        isSameDay(new Date(startDate), new Date(fiscalYear.StartDate)) &&
        isSameDay(new Date(endDate), new Date(fiscalYear.EndDate))
      );
    }) || null
  );
}

const useGeneralPageData = (
  defaultCooperativeId: string,
  defaultFiscalYearId: string
) => {
  const firstMount = useRef(true);
  const {
    fetchGeneralData,
    update,
    state: { fiscalYear },
  } = useGeneralCtx();
  const [state, setState] = useState<StateModel>(() => ({
    cooperatives: [],
    fiscalYears: [],
    loading: true,
    error: null,
    searchTerm: '',
    selected: {
      cooperative: null,
      fiscalYear: null,
    },
    prev: {
      cooperative: null,
      fiscalYear: null,
    },
  }));

  const backwardToSummaryPage = useCallback(() => {
    update((prevState) => ({
      ...prevState,
      defaultCooperativeId: null,
      defaultFiscalYearId: null,
    }));
  }, []);

  const fetchData = async (coopId: string, fiscalYearId: string) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const fiscalYearsListRespone =
        await Services.getCooperativeFiscalYearsList(coopId);

      if (!fiscalYearsListRespone.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [cooperativesListResponse.Message] },
        }));
        return;
      }

      const currentFiscalYear = findFiscalYearById(
        fiscalYearId,
        fiscalYearsListRespone.FiscalYears
      );

      if (!currentFiscalYear) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        return;
      }

      const start = serverFormat(new Date(currentFiscalYear.StartDate));
      const end = serverFormat(new Date(currentFiscalYear.EndDate));
      const cooperativesListResponse = await Services.getCooperativesList(
        start,
        end,
        true
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
        coopId,
        cooperativesListResponse.Cooperatives
      );

      if (!coop) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
        }));
        return;
      }

      setState((prevState) => ({
        ...prevState,
        cooperatives: cooperativesListResponse.Cooperatives,
        fiscalYears: fiscalYearsListRespone.FiscalYears,
        selected: {
          cooperative: coop,
          fiscalYear: currentFiscalYear,
        },
        prev: {
          cooperative:
            prevState.prev.cooperative?.Id === coop.Id
              ? coop
              : prevState.prev.cooperative,
          fiscalYear:
            prevState.prev.fiscalYear?.Id === currentFiscalYear.Id
              ? currentFiscalYear
              : prevState.prev.fiscalYear,
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
  };

  useEffect(() => {
    (async function () {
      if (firstMount.current) {
        await fetchData(defaultCooperativeId, defaultFiscalYearId);
        firstMount.current = false;
      }
    })();
  }, [defaultCooperativeId, defaultFiscalYearId]);

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
            fiscalYear:
              prevState.selected.fiscalYear?.StartDate &&
              prevState.selected.fiscalYear?.EndDate
                ? findFiscalYearByDate(
                    prevState.selected.fiscalYear.StartDate,
                    prevState.selected.fiscalYear.EndDate,
                    res.FiscalYears
                  )
                : null,
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

    if (state.selected.cooperative && !firstMount.current) {
      updateFiscalYearsList(state.selected.cooperative);
    }
  }, [state.selected.cooperative, fiscalYear?.isClosed]);

  const handleRefreshData = async () => {
    if (state.selected.cooperative && state.selected.fiscalYear) {
      await fetchData(
        state.selected.cooperative.Id,
        state.selected.fiscalYear.Id
      );
    }
    if (state.prev.fiscalYear?.Id) {
      await fetchGeneralData(state.prev.fiscalYear.Id);
      return;
    }
    if (state.selected.fiscalYear?.Id) {
      await fetchGeneralData(state.selected.fiscalYear.Id);
      return;
    }
  };

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

  const handleApplyClick = () => {
    if (state.selected.fiscalYear) {
      setState((prevState) => ({
        ...prevState,
        prev: {
          cooperative: prevState.selected.cooperative,
          fiscalYear: prevState.selected.fiscalYear,
        },
      }));
      fetchGeneralData(state.selected.fiscalYear.Id);
    }
  };

  const isDisabledApplyButton = useMemo(() => {
    if (!state.prev.cooperative || !state.prev.fiscalYear) return false;
    return (
      state.selected.cooperative?.Id === state.prev.cooperative?.Id &&
      state.selected.fiscalYear?.Id === state.prev.fiscalYear?.Id
    );
  }, [state.selected, state.prev]);

  return {
    state,
    generalData: fiscalYear,
    backwardToSummaryPage,
    isDisabledApplyButton,
    handleApplyClick,
    handleInitError,
    handleChangeSearchTerm,
    handleChangeFiscalYear,
    handleChangeSelectedCooperatives,
    handleRefreshData,
  };
};

export default useGeneralPageData;
