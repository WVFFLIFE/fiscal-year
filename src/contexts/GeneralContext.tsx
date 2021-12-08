import { ErrorModel } from 'models';
import { useState, useEffect, createContext, FC, Dispatch } from 'react';
import Services, { GeneralFiscalYearModel } from 'services';

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

interface GeneralInformationModel {
  data: GeneralFiscalYearModel | null;
  loading: boolean;
  error: ErrorModel | null;
}

export interface StateModel {
  defaultCooperativeId: string | null;
  defaultFiscalYearId: string | null;
  generalInformation: GeneralInformationModel;
}

type UpdateType = Dispatch<React.SetStateAction<StateModel>>;

const defaulValue: StateModel = {
  defaultCooperativeId: null,
  defaultFiscalYearId: null,
  generalInformation: {
    data: null,
    loading: false,
    error: null,
  },
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
    generalInformation: {
      data: null,
      error: null,
      loading: false,
    },
  });

  const fetchGeneralData = async (fiscalYearId: string) => {
    try {
      update((prevState) => ({
        ...prevState,
        generalInformation: {
          ...prevState.generalInformation,
          loading: true,
          error: null,
        },
      }));

      const res = await Services.getFiscalYear(fiscalYearId);

      if (res.IsSuccess) {
        update((prevState) => ({
          ...prevState,
          generalInformation: {
            ...prevState.generalInformation,
            data: res.FiscalYear,
            loading: false,
          },
        }));

        return true;
      } else {
        update((prevState) => ({
          ...prevState,
          generalInformation: {
            data: null,
            loading: false,
            error: { messages: [String(res.Message)] },
          },
        }));
      }
    } catch (err) {
      console.error(err);

      update((prevState) => ({
        ...prevState,
        generalInformation: {
          data: null,
          loading: false,
          error: { messages: [String(err)] },
        },
      }));
    }
  };

  const handleInitGeneralInformationError = () => {
    update((prevState) => ({
      ...prevState,
      generalInformation: {
        ...prevState.generalInformation,
        error: null,
      },
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
