import { ErrorModel } from 'models';
import { GeneralInformationDataModel } from './General/GeneralInformationTable';
import { useState, useCallback, useEffect, useMemo, useContext } from 'react';
import { GeneralCtx } from 'contexts/GeneralContext';

import Services, { GeneralFiscalYearModel } from 'services';
import sort from 'utils/sort';

interface StateModel {
  data: GeneralFiscalYearModel | null;
  loading: boolean;
  error: ErrorModel | null;
}

const useTabsData = (fiscalYearId: string) => {
  const [state, setState] = useState<StateModel>({
    data: null,
    loading: true,
    error: null,
  });
  const { update } = useContext(GeneralCtx);

  const fetchData = useCallback(async () => {
    try {
      setState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await Services.getFiscalYear(fiscalYearId);

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          data: {
            ...res.FiscalYear,
            Auditings: sort(res.FiscalYear.Auditings, {
              order: 'asc',
              orderBy: 'PlannedStartingDate',
              type: 'date',
            }),
            Meetings: sort(res.FiscalYear.Meetings, {
              order: 'asc',
              orderBy: 'PlannedStartingDate',
              type: 'date',
            }),
          },
          loading: false,
        }));

        return true;
      } else {
        setState((prevState) => ({
          ...prevState,
          error: { messages: [String(res.Message)] },
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
  }, [fiscalYearId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (state.data) {
      update((prevState) => ({
        ...prevState,
        showFiscalYearBtns: true,
      }));
    }

    return () => {
      update((prevState) => ({
        ...prevState,
        showFiscalYearBtns: false,
      }));
    };
  }, [state.data]);

  const generalInformationList: GeneralInformationDataModel[] = useMemo(
    () =>
      state.data
        ? [
            {
              Id: state.data.CooperativeId,
              Name: state.data.CooperativeName,
              StartDate: state.data.StartDate,
              EndDate: state.data.EndDate,
              IsClosed: state.data.IsClosed,
            },
          ]
        : [],
    [state.data]
  );

  return { ...state, fetchData, generalInformationList };
};

export default useTabsData;
