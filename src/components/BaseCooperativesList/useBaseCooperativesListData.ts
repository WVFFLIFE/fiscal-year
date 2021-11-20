import { useState, useEffect, useCallback, useMemo } from 'react';
import { CommonCooperativeModel, CalendarYearOption } from 'models';
import format from 'date-fns/format';
import { buildCalendarYearOptions } from './utils';

interface StateModel {
  showExtendedCooperatives: boolean;
  searchTerm: string;
}

interface SelectedModel {
  cooperatives: CommonCooperativeModel[];
  calendarYear: CalendarYearOption | null;
}

const useBaseCooperativesListData = (
  fetchExtendedCooperativesList: (
    coopIds: string[],
    startDate: string,
    endDate: string
  ) => Promise<void>
) => {
  const [state, setState] = useState<StateModel>({
    searchTerm: '',
    showExtendedCooperatives: false,
  });
  const [selected, setSelected] = useState<SelectedModel>({
    cooperatives: [],
    calendarYear: null,
  });

  useEffect(() => {
    if (state.showExtendedCooperatives && selected.calendarYear) {
      const start = format(
        selected.calendarYear.start,
        "yyyy-MM-dd'T'00:00:00"
      );
      const end = format(selected.calendarYear.end, "yyyy-MM-dd'T'00:00:00");
      const coopIds = selected.cooperatives.map((coop) => coop.Id);

      fetchExtendedCooperativesList(coopIds, start, end);
    }
  }, [state.showExtendedCooperatives, selected]);

  const handleChangeSelectedCooperatives = useCallback(
    (newCooperatives: CommonCooperativeModel[]) => {
      setSelected((prevState) => ({
        ...prevState,
        cooperatives: newCooperatives,
      }));
    },
    []
  );

  const handleChangeCalendarYear = useCallback((newVal: CalendarYearOption) => {
    setSelected((prevState) => ({
      ...prevState,
      calendarYear: newVal,
    }));
  }, []);

  const handleChangeSearchTerm = useCallback((newVal: string) => {
    setState((prevState) => ({
      ...prevState,
      searchTerm: newVal,
    }));
  }, []);

  const handleShowExtendedCooperatives = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      showExtendedCooperatives: true,
    }));
  }, []);

  const calendarYearOptions = useMemo(() => {
    return buildCalendarYearOptions(new Date('01.01.2017'), new Date());
  }, []);

  return {
    state,
    selected,
    calendarYearOptions,
    handleChangeSearchTerm,
    handleChangeSelectedCooperatives,
    handleChangeCalendarYear,
    handleShowExtendedCooperatives,
  };
};

export default useBaseCooperativesListData;
