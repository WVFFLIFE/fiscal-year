import { useState, useCallback, useMemo, useContext } from 'react';
import { GeneralCtx } from 'contexts/GeneralContext';
import {
  CommonCooperativeModel,
  ExtendedCooperativeModel,
  CalendarYearOption,
  ErrorModel,
} from 'models';
import { getIdsList } from 'utils';
import { serverFormat, isSameDay } from 'utils/dates';
import Services from 'services';

interface SelectedModel {
  cooperatives: CommonCooperativeModel[];
  calendarYear: CalendarYearOption | null;
  quickFilter: string | null;
}

interface StateModel {
  extendedCooperatives: ExtendedCooperativeModel[];
  loading: boolean;
  error: ErrorModel | null;
  showGrid: boolean;
  selected: SelectedModel;
  prev: {
    selectedCooperatives: CommonCooperativeModel[];
    selectedCalendarYear: CalendarYearOption | null;
  };
}

const useSummaryPageData = () => {
  const [state, setState] = useState<StateModel>({
    extendedCooperatives: [],
    loading: false,
    error: null,
    showGrid: false,
    selected: {
      calendarYear: null,
      cooperatives: [],
      quickFilter: null,
    },
    prev: {
      selectedCalendarYear: null,
      selectedCooperatives: [],
    },
  });
  const { update } = useContext(GeneralCtx);

  const fetchExtendedCooperativesList = async () => {
    if (!state.selected.cooperatives.length || !state.selected.calendarYear)
      return;

    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const coopIds = state.selected.cooperatives.map((coop) => coop.Id);
      const startDate = serverFormat(state.selected.calendarYear.start);
      const endDate = serverFormat(state.selected.calendarYear.end);

      const res = await Services.getCooperativesInformationList(
        coopIds,
        startDate,
        endDate
      );

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          prev: {
            selectedCooperatives: [...state.selected.cooperatives],
            selectedCalendarYear: state.selected.calendarYear && {
              ...state.selected.calendarYear,
            },
          },
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

  const handleSelectCooperative = (coop: ExtendedCooperativeModel) => {
    update((prevState) => ({
      ...prevState,
      defaultCooperativeId: coop.Id,
      defaultFiscalYearId: coop.FiscalYearId,
    }));
  };

  const handleChangeCalendarYear = useCallback((newVal: CalendarYearOption) => {
    setState((prevState) => ({
      ...prevState,
      selected: {
        ...prevState.selected,
        calendarYear: newVal,
      },
    }));
  }, []);

  const handleChangeActiveQuickFilter = useCallback(
    (newQuickFilter: string) => {
      setState((prevState) => ({
        ...prevState,
        selected: {
          ...prevState.selected,
          quickFilter:
            prevState.selected.quickFilter === newQuickFilter
              ? null
              : newQuickFilter,
        },
      }));
    },
    []
  );

  const handleChangeSelectedCooperatives = useCallback(
    (newCooperatives: CommonCooperativeModel[]) => {
      setState((prevState) => ({
        ...prevState,
        selected: {
          ...prevState.selected,
          cooperatives: newCooperatives,
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

  const isDisabledApplyButton = useMemo(() => {
    if (!state.selected.cooperatives.length || !state.selected.calendarYear)
      return true;
    function checkCoopEquality() {
      if (!state.prev.selectedCooperatives) return false;
      const coopIds = getIdsList(state.selected.cooperatives);

      return (
        coopIds.length === state.prev.selectedCooperatives.length &&
        state.prev.selectedCooperatives.every((coop) =>
          coopIds.includes(coop.Id)
        )
      );
    }

    function checkCalendarYearEquality() {
      if (!state.prev.selectedCalendarYear || !state.selected.calendarYear)
        return false;

      return (
        isSameDay(
          state.selected.calendarYear.start,
          state.prev.selectedCalendarYear.start
        ) &&
        isSameDay(
          state.selected.calendarYear.end,
          state.prev.selectedCalendarYear.end
        )
      );
    }

    return checkCoopEquality() && checkCalendarYearEquality();
  }, [
    state.selected.cooperatives,
    state.selected.calendarYear,
    state.prev.selectedCalendarYear,
    state.prev.selectedCooperatives,
  ]);

  return {
    state,
    isDisabledApplyButton,
    handleInitError,
    fetchExtendedCooperativesList,
    handleSelectCooperative,
    handleChangeCalendarYear,
    handleChangeActiveQuickFilter,
    handleChangeSelectedCooperatives,
  };
};

export default useSummaryPageData;
