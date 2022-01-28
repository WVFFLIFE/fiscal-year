import { useState, useCallback, useMemo, useEffect } from 'react';
import { batch } from 'react-redux';

import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';

import {
  setDefaultCooperativeId,
  setDefaultFiscalYearId,
} from 'features/appSlice';
import { setSearchTerm } from 'features/generalPageSlice';
import { selectSearchTerm } from 'selectors/generalPageSelectors';
import {
  CommonCooperativeModel,
  ExtendedCooperativeModel,
  CalendarYearOption,
  ErrorModel,
} from 'models';
import { getIdsList, getMyOwnCooperatives } from 'utils';
import { serverFormat, isSameDay } from 'utils/dates';
import { getDefaultCalendarYear } from './utils';
import Services from 'services';

interface SelectedModel {
  cooperatives: CommonCooperativeModel[];
  calendarYear: CalendarYearOption | null;
  quickFilter: string | null;
}

interface StateModel {
  fetched: boolean;
  extendedCooperatives: ExtendedCooperativeModel[];
  loading: boolean;
  error: ErrorModel | null;
  selected: SelectedModel;
  current: {
    cooperatives: CommonCooperativeModel[];
    calendarYear: CalendarYearOption | null;
  };
}

const useSummaryPageData = () => {
  const dispatch = useAppDispatch();
  const { searchTerm, commonCooperatives } = useStateSelector((state) => ({
    commonCooperatives: state.generalPage.filters.cooperatives.list,
    searchTerm: selectSearchTerm(state),
  }));
  const [state, setState] = useState<StateModel>(() => {
    const defaultCalendarYear = getDefaultCalendarYear();
    return {
      fetched: false,
      extendedCooperatives: [],
      loading: false,
      error: null,
      selected: {
        calendarYear: defaultCalendarYear,
        cooperatives: [],
        quickFilter: null,
      },
      current: {
        calendarYear: defaultCalendarYear,
        cooperatives: [],
      },
    };
  });

  const fetchExtendedCooperativesList = async (
    selectedCooperatives: CommonCooperativeModel[],
    selectedCalendarYear: CalendarYearOption,
    showLoader: boolean = true
  ) => {
    try {
      if (showLoader) {
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));
      }

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
          fetched: true,
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
        state.current.calendarYear,
        false
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

  const handleChangeSearchTerm = (searchTerm: string) => {
    dispatch(setSearchTerm(searchTerm));
  };

  useEffect(() => {
    if (commonCooperatives.length) {
      const myOwnCooperatives = getMyOwnCooperatives(commonCooperatives);

      setState((prevState) => ({
        ...prevState,
        selected: {
          ...prevState.selected,
          cooperatives: myOwnCooperatives,
        },
        current: {
          ...prevState.current,
          cooperatives: myOwnCooperatives,
        },
      }));
    }
  }, [commonCooperatives]);

  useEffect(() => {
    handleLoadCooperatives();
  }, [state.selected.cooperatives, state.selected.calendarYear]);

  useEffect(() => {
    return () => {
      dispatch(setSearchTerm(''));
    };
  }, [dispatch]);

  return {
    state,
    searchTerm,
    handleInitError,
    handleChangeSearchTerm,
    handleLoadCooperatives,
    handleRefreshCooperatives,
    handleSelectCooperative,
    handleChangeCalendarYear,
    handleChangeActiveQuickFilter,
    handleChangeSelectedCooperatives,
  };
};

export default useSummaryPageData;
