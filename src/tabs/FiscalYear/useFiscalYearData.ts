import { useState, useEffect } from 'react';
import {
  CommonCooperativeModel,
  ErrorModel,
  ExtendedCooperativeModel,
} from 'models';

import Services from 'services';

interface StateModel {
  commonCooperatives: CommonCooperativeModel[];
  extendedCooperatives: ExtendedCooperativeModel[];
  defaultCooperative: ExtendedCooperativeModel | null;
  loading: boolean;
  error: ErrorModel | null;
}

const useFiscalYearData = () => {
  const [state, setState] = useState<StateModel>({
    commonCooperatives: [],
    extendedCooperatives: [],
    defaultCooperative: null,
    error: null,
    loading: true,
  });

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

  const fetchExtendedCooperativesList = async (
    coopIds: string[],
    startDate: string,
    endDate: string
  ) => {
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

  const handleChangeDefaultCooperative = (
    defaultCooperative: ExtendedCooperativeModel
  ) => {
    setState((prevState) => ({
      ...prevState,
      defaultCooperative,
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
    handleInitError,
    fetchExtendedCooperativesList,
    handleChangeDefaultCooperative,
  };
};

export default useFiscalYearData;
