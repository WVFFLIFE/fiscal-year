import { useEffect, useCallback, useRef } from 'react';
import { batch } from 'react-redux';
import { CommonCooperativeModel, FiscalYearModel } from 'models';
import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';

import {
  resetDefaultIds,
  setDefaultCooperativeId,
  setDefaultFiscalYearId,
} from 'features/appSlice';
import {
  fetchGeneralData,
  fetchGeneralFiscalYear,
  updateFiscalYearsList,
  setSearchTerm,
  setNextCooperative,
  setNextFiscalYear,
  resetError,
  resetGeneralFiscalYear,
  refreshGeneralData,
} from 'features/generalPageSlice';

const useGeneralPageData = () => {
  const firstMount = useRef(true);
  const fetchedGeneralData = useRef(false);

  const dispatch = useAppDispatch();
  const { defaultCooperativeId, defaultFiscalYearId, generalPageData } =
    useStateSelector((state) => ({
      ...state.app,
      generalPageData: state.generalPage,
    }));

  const { filters } = generalPageData;

  useEffect(() => {
    if (firstMount.current && defaultCooperativeId && defaultFiscalYearId) {
      (async function () {
        const req = {
          coopId: defaultCooperativeId,
          fyId: defaultFiscalYearId,
        };
        try {
          await dispatch(fetchGeneralData(req));
          firstMount.current = false;
        } catch (err) {
          console.error(err);
        }
      })();
    }
  }, [dispatch, defaultCooperativeId, defaultFiscalYearId]);

  // Update fiscal years list if it's not a first render
  // and cooperative in filter was changed.
  useEffect(() => {
    if (filters.cooperatives.next?.Id && !firstMount.current) {
      dispatch(updateFiscalYearsList(filters.cooperatives.next.Id));
    }
  }, [dispatch, filters.cooperatives.next?.Id]);

  useEffect(() => {
    batch(async () => {
      if (
        filters.fiscalYears.next &&
        filters.cooperatives.next &&
        !fetchedGeneralData.current
      ) {
        fetchedGeneralData.current = true;
        dispatch(fetchGeneralFiscalYear(filters.fiscalYears.next.Id));
      }
    });
  }, [filters.fiscalYears.next, filters.cooperatives.next, dispatch]);

  const backwardToSummaryPage = useCallback(() => {
    batch(() => {
      dispatch(resetDefaultIds());
      dispatch(resetGeneralFiscalYear());
    });
  }, [dispatch]);

  const handleRefreshData = async () => {
    await dispatch(refreshGeneralData());

    if (filters.fiscalYears.current) {
      await dispatch(fetchGeneralFiscalYear(filters.fiscalYears.current.Id));
      return;
    }
  };

  const handleChangeSelectedCooperatives = useCallback(
    (cooperatives: CommonCooperativeModel[]) => {
      const [cooperative] = cooperatives;

      dispatch(setNextCooperative(cooperative));
    },
    [dispatch]
  );

  const handleChangeSearchTerm = useCallback(
    (newVal: string) => {
      dispatch(setSearchTerm(newVal));
    },
    [dispatch]
  );

  const handleChangeFiscalYear = useCallback(
    (newFiscalYear: FiscalYearModel) => {
      dispatch(setNextFiscalYear(newFiscalYear));
    },
    [dispatch]
  );

  const handleInitError = () => {
    dispatch(resetError());
  };

  const handleApplyClick = () => {
    batch(() => {
      if (filters.fiscalYears.next && filters.cooperatives.next) {
        dispatch(setDefaultFiscalYearId(filters.fiscalYears.next.Id));
        dispatch(setDefaultCooperativeId(filters.cooperatives.next.Id));
        dispatch(fetchGeneralFiscalYear(filters.fiscalYears.next.Id));
      }
    });
  };

  return {
    generalPageData,
    backwardToSummaryPage,
    handleApplyClick,
    handleInitError,
    handleChangeSearchTerm,
    handleChangeFiscalYear,
    handleChangeSelectedCooperatives,
    handleRefreshData,
  };
};

export default useGeneralPageData;