import { ErrorModel } from 'models';
import { useState, useEffect, createContext, FC, Dispatch } from 'react';
import Services, { SettingsModel } from 'services';

import { makeFiscalYear, FiscalYearModel } from 'utils/fiscalYear';

interface SelectedDataModel {
  orgId: string | null;
  fyId: string | null;
  dateFrom: string | null;
  dateTo: string | null;
}

interface EnhancedWindow extends Window {
  selectedData?: SelectedDataModel;
  setFrameArg?: Dispatch<React.SetStateAction<SelectedDataModel>>;
}

export interface StateModel {
  defaultCooperativeId: string | null;
  defaultFiscalYearId: string | null;
  fiscalYear: FiscalYearModel | null;
  loading: boolean;
  error: ErrorModel | null;
}

type UpdateType = Dispatch<React.SetStateAction<StateModel>>;

const defaulValue: StateModel = {
  defaultCooperativeId: null,
  defaultFiscalYearId: null,
  fiscalYear: null,
  loading: false,
  error: null,
};
const defaultUpdate: UpdateType = () => ({
  defaultCooperativeId: null,
  defaultFiscalYearId: null,
});
const defaultFetchGeneralData = async (
  fiscalYearId: string
): Promise<true | undefined> => {
  return await new Promise((resolve) => resolve(true));
};

const GeneralCtx = createContext({
  state: defaulValue,
  update: defaultUpdate,
  fetchGeneralData: defaultFetchGeneralData,
  handleInitGeneralInformationError: () => {},
});

const GeneralProvider: FC = ({ children }) => {
  const [state, update] = useState<StateModel>({
    defaultCooperativeId:
      (window.top as EnhancedWindow)?.selectedData?.orgId || null,
    defaultFiscalYearId:
      (window.top as EnhancedWindow)?.selectedData?.fyId || null,
    fiscalYear: null,
    loading: false,
    error: null,
  });

  const fetchGeneralData = async (fiscalYearId: string) => {
    try {
      update((prevState) => ({
        ...prevState,
        loading: true,
        error: null,
      }));

      const res = await Services.getFiscalYear(fiscalYearId);

      if (res.IsSuccess) {
        update((prevState) => ({
          ...prevState,
          fiscalYear: makeFiscalYear(res.FiscalYear),
          loading: false,
        }));

        return true;
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      update((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleInitGeneralInformationError = () => {
    update((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  useEffect(() => {
    const set = (window.top as EnhancedWindow)?.setFrameArg;
    if (set) {
      set((prevState) => ({
        ...prevState,
        orgId: state.defaultCooperativeId,
      }));
    }
  }, [state.defaultCooperativeId]);

  useEffect(() => {
    const set = (window.top as EnhancedWindow)?.setFrameArg;
    if (set) {
      set((prevState) => ({
        ...prevState,
        fyId: state.defaultFiscalYearId,
      }));
    }
  }, [state.defaultFiscalYearId]);

  return (
    <GeneralCtx.Provider
      value={{
        state,
        fetchGeneralData,
        handleInitGeneralInformationError,
        update,
      }}
    >
      {children}
    </GeneralCtx.Provider>
  );
};

export { GeneralCtx, GeneralProvider };
