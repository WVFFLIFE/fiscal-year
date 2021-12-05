import { useState, useEffect, useCallback } from 'react';
import {
  CommonCooperativeModel,
  ErrorModel,
  ExtendedCooperativeModel,
  CalendarYearOption,
} from 'models';
import { format } from 'date-fns';
import Services from 'services';

interface StateModel {
  commonCooperatives: CommonCooperativeModel[];
  extendedCooperatives: ExtendedCooperativeModel[];
  selectedCooperatives: CommonCooperativeModel[];
  defaultCooperative: string | null;
  defaultFiscalYear: string | null;
  loading: boolean;
  error: ErrorModel | null;
  selectedCalendarYear: CalendarYearOption | null;
  showGeneralPage: boolean;
  showSummaryPage: boolean;
}

const useFiscalYearData = () => {
  const [state, setState] = useState<StateModel>({
    commonCooperatives: [],
    extendedCooperatives: [],
    selectedCooperatives: [],
    defaultCooperative: (window.top as any)?.selectedData?.orgId,
    defaultFiscalYear: (window.top as any)?.selectedData?.fyId,
    error: null,
    loading: true,
    selectedCalendarYear: null,
    showGeneralPage: false,
    showSummaryPage: false,
  });

  const fetchExtendedCooperativesList = async () => {
    if (!state.selectedCooperatives.length || !state.selectedCalendarYear)
      return;

    const coopIds = state.selectedCooperatives.map((coop) => coop.Id);
    const startDate = format(
      state.selectedCalendarYear.start,
      "yyyy-MM-dd'T'00:00:00"
    );
    const endDate = format(
      state.selectedCalendarYear.end,
      "yyyy-MM-dd'T'00:00:00"
    );

    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await Services.getCooperativesInformationList(
        coopIds,
        startDate,
        endDate
      );

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          extendedCooperatives: res.Cooperatives,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(res.Message)] },
        }));
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  useEffect(() => {
    (async function () {
      try {
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.getCooperativesList();

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            commonCooperatives: res.Cooperatives,
            loading: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            error: { messages: [res.Message] },
            loading: false,
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
  }, []);

  useEffect(() => {
    setState((prevState) => ({
      ...prevState,
      showSummaryPage: false,
    }));
  }, [state.selectedCooperatives, state.selectedCalendarYear]);

  useEffect(() => {
    if (state.showSummaryPage) {
      fetchExtendedCooperativesList();
    }
  }, [state.showSummaryPage]);

  const handleChangeDefaultCooperative = (coop: ExtendedCooperativeModel) => {
    setState((prevState) => ({
      ...prevState,
      defaultCooperative: coop.Id,
    }));
  };

  const handleChangeCalendarYear = useCallback((newVal: CalendarYearOption) => {
    setState((prevState) => ({
      ...prevState,
      selectedCalendarYear: newVal,
    }));
  }, []);

  const handleChangeSelectedCooperatives = useCallback(
    (newCooperatives: CommonCooperativeModel[]) => {
      setState((prevState) => ({
        ...prevState,
        selectedCooperatives: newCooperatives,
      }));
    },
    []
  );

  const handleShowExtendedList = () => {
    setState((prevState) => ({
      ...prevState,
      showSummaryPage: true,
    }));
  };

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    state,
    fetchExtendedCooperativesList,
    handleInitError,
    handleShowExtendedList,
    handleChangeDefaultCooperative,
    handleChangeCalendarYear,
    handleChangeSelectedCooperatives,
  };
};

export default useFiscalYearData;
