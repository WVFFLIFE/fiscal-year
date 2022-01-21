import { useState, useEffect } from 'react';
import useAppDispatch from 'hooks/useAppDispatch';
import { ErrorModel } from 'models';
import { setCooperativesList } from 'features/generalPageSlice';

import Services from 'services';

interface RequestStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

const useFiscalYearData = () => {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<RequestStateModel>({
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

        const res = await Services.getCooperativesList(
          undefined,
          undefined,
          true
        );

        if (res.IsSuccess) {
          dispatch(setCooperativesList(res.Cooperatives));
          setState((prevState) => ({
            ...prevState,
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
  }, [dispatch]);

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    state,
    handleInitError,
  };
};

export default useFiscalYearData;
