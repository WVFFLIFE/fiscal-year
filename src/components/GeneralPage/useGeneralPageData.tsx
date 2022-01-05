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
} from 'features/generalPageSlice';

const useGeneralPageData = () => {
  const firstMount = useRef(true);
  const dispatch = useAppDispatch();
  const { defaultCooperativeId, defaultFiscalYearId, generalPageData } =
    useStateSelector((state) => ({
      ...state.app,
      generalPageData: state.generalPage,
    }));

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
    if (generalPageData.filters.cooperatives.next && !firstMount.current) {
      dispatch(
        updateFiscalYearsList(generalPageData.filters.cooperatives.next.Id)
      );
    }
  }, [dispatch, generalPageData.filters.cooperatives.next]);

  const backwardToSummaryPage = useCallback(() => {
    dispatch(resetDefaultIds());
  }, [dispatch]);

  const handleRefreshData = async () => {
    // if (state.selected.cooperative && state.selected.fiscalYear) {
    //   await fetchData(
    //     state.selected.cooperative.Id,
    //     state.selected.fiscalYear.Id
    //   );
    // }
    // if (state.prev.fiscalYear?.Id) {
    //   await fetchGeneralData(state.prev.fiscalYear.Id);
    //   return;
    // }
    // if (state.selected.fiscalYear?.Id) {
    //   await fetchGeneralData(state.selected.fiscalYear.Id);
    //   return;
    // }
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
      if (
        generalPageData.filters.fiscalYears.next &&
        generalPageData.filters.cooperatives.next
      ) {
        dispatch(
          setDefaultFiscalYearId(generalPageData.filters.fiscalYears.next.Id)
        );
        dispatch(
          setDefaultCooperativeId(generalPageData.filters.cooperatives.next.Id)
        );
        dispatch(
          fetchGeneralFiscalYear(generalPageData.filters.fiscalYears.next.Id)
        );
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
