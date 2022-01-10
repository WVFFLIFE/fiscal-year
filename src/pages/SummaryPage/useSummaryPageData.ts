import { useState, useCallback, useMemo } from 'react';
import { batch, useDispatch } from 'react-redux';
import {
  setDefaultCooperativeId,
  setDefaultFiscalYearId,
} from 'features/appSlice';
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
  current: {
    cooperatives: CommonCooperativeModel[];
    calendarYear: CalendarYearOption | null;
  };
}

const useSummaryPageData = () => {
  const dispatch = useDispatch();
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
    current: {
      calendarYear: null,
      cooperatives: [],
    },
  });

  const fetchExtendedCooperativesList = async (
    selectedCooperatives: CommonCooperativeModel[],
    selectedCalendarYear: CalendarYearOption
  ) => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const coopIds = selectedCooperatives.map((coop) => coop.Id);
      const startDate = serverFormat(selectedCalendarYear.start);
      const endDate = serverFormat(selectedCalendarYear.end);

      const res = await Services.getCooperativesInformationList(
        coopIds,
        startDate,
        endDate
      );

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          current: {
            cooperatives: [...selectedCooperatives],
            calendarYear: { ...selectedCalendarYear },
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

  const handleLoadCooperatives = async () => {
    if (state.selected.cooperatives.length && state.selected.calendarYear) {
      fetchExtendedCooperativesList(
        state.selected.cooperatives,
        state.selected.calendarYear
      );
    }
  };

  const handleRefreshCooperatives = async () => {
    if (state.current.cooperatives.length && state.current.calendarYear) {
      fetchExtendedCooperativesList(
        state.current.cooperatives,
        state.current.calendarYear
      );
    }
  };

  const handleSelectCooperative = useCallback(
    (coop: ExtendedCooperativeModel) => {
      batch(() => {
        dispatch(setDefaultFiscalYearId(coop.FiscalYearId));
        dispatch(setDefaultCooperativeId(coop.Id));
      });
    },
    [dispatch]
  );

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
      if (!state.current.cooperatives.length) return false;
      const coopIds = getIdsList(state.selected.cooperatives);

      return (
        coopIds.length === state.current.cooperatives.length &&
        state.current.cooperatives.every((coop) => coopIds.includes(coop.Id))
      );
    }

    function checkCalendarYearEquality() {
      if (!state.current.calendarYear || !state.selected.calendarYear)
        return false;

      return (
        isSameDay(
          state.selected.calendarYear.start,
          state.current.calendarYear.start
        ) &&
        isSameDay(
          state.selected.calendarYear.end,
          state.current.calendarYear.end
        )
      );
    }

    return checkCoopEquality() && checkCalendarYearEquality();
  }, [state]);

  return {
    state,
    isDisabledApplyButton,
    handleInitError,
    handleLoadCooperatives,
    handleRefreshCooperatives,
    handleSelectCooperative,
    handleChangeCalendarYear,
    handleChangeActiveQuickFilter,
    handleChangeSelectedCooperatives,
  };
};

export default useSummaryPageData;
