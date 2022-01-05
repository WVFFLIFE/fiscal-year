import { useState, ChangeEvent, useMemo, useCallback } from 'react';
import useStateSelector from 'hooks/useStateSelector';

import { CommonCooperativeModel, FiscalYearModel, ErrorModel } from 'models';

import generalConfig from 'configs/general';

interface StateModel {
  selectedGroups: string[];
  creating: boolean;
  error: ErrorModel | null;
}

const useAnnualReportFormData = () => {
  const [state, setState] = useState<StateModel>({
    selectedGroups: ['closingthebookreport'],
    creating: false,
    error: null,
  });
  const filters = useStateSelector((state) => state.generalPage.filters);

  const handleChangeSelectedGroup = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setState((prevState) => ({
      ...prevState,
      selectedGroups: prevState.selectedGroups.includes(name)
        ? prevState.selectedGroups.filter((group) => group !== name)
        : prevState.selectedGroups.concat(name),
    }));
  };

  const handleSelectAll = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      selectedGroups: state.selectedGroups.length
        ? []
        : generalConfig.annualReportPage.selectionList.map((group) => group.id),
    }));
  }, [state.selectedGroups]);

  const selectedAll = useMemo(
    () =>
      generalConfig.annualReportPage.selectionList.every((group) => {
        return state.selectedGroups.includes(group.id);
      }),
    [state.selectedGroups]
  );

  return {
    state,
    filters,
    selectedAll,
    handleChangeSelectedGroup,
    handleSelectAll,
  };
};

export default useAnnualReportFormData;
