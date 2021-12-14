import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { ErrorModel } from 'models';
import { sleep, readFile } from 'utils';
import { getFiscalYearId, getConsumptionData } from 'utils/fiscalYear';
import Services from 'services';

interface StateModel {
  progress: number;
  loading: boolean;
  uploading: boolean;
  deleting: boolean;
  error: ErrorModel | null;
  src: string | null;
  saving: boolean;
  addConsumptionReportToClosingTheBookReport: boolean;
}

const useConsumptionData = () => {
  const {
    state: { fiscalYear },
    fetchGeneralData,
  } = useGeneralCtx();

  const fiscalYearId = getFiscalYearId(fiscalYear);
  const consumptionData = getConsumptionData(fiscalYear);

  const [state, setState] = useState<StateModel>({
    progress: 0,
    loading: false,
    uploading: false,
    deleting: false,
    error: null,
    src: null,
    saving: false,
    addConsumptionReportToClosingTheBookReport:
      !!consumptionData?.addConsumptionReportToClosingTheBookReport,
  });

  useEffect(() => {
    if (consumptionData) {
      setState((prevState) => ({
        ...prevState,
        addConsumptionReportToClosingTheBookReport:
          consumptionData.addConsumptionReportToClosingTheBookReport,
      }));
    }
  }, [consumptionData]);

  const handleProgress = async <ArgumentsType extends any[], ReturnType>(
    request: (...args: ArgumentsType) => Promise<ReturnType>,
    type: 'loading' | 'uploading' | 'deleting',
    ...args: ArgumentsType
  ): Promise<ReturnType | undefined> => {
    try {
      setState((prevState) => ({
        ...prevState,
        [type]: true,
      }));

      await sleep(300);

      setState((prevState) => ({
        ...prevState,
        progress: 50,
      }));

      const res = await request(...args);

      setState((prevState) => ({
        ...prevState,
        progress: 100,
      }));

      await sleep(300);

      return res;
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        progress: 0,
        [type]: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleChangeCurrentFile = useCallback(
    async (files: File[]) => {
      if (!files.length || !fiscalYearId) return;
      const [file] = files;

      const dataURL = await readFile(file);

      const reqBody = {
        FiscalYearId: fiscalYearId,
        Content: dataURL,
      };

      const request = async (req: typeof reqBody) => {
        const updateRes = await Services.updateConsumptionImage(req);

        if (updateRes.IsSuccess) {
          return await Services.getConsumptionImage(req.FiscalYearId);
        }
      };

      try {
        const res = await handleProgress(request, 'uploading', reqBody);

        if (!res) {
          setState((prevState) => ({
            ...prevState,
            progress: 0,
            uploading: false,
          }));
          return;
        }

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            progress: 0,
            uploading: false,
            src: res.Attachment?.Content || null,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            progress: 0,
            uploading: false,
            error: { messages: [String(res.Message)] },
          }));
        }
      } catch (err) {
        console.error(err);

        setState((prevState) => ({
          ...prevState,
          progress: 0,
          uploading: false,
          error: { messages: [String(err)] },
        }));
      }
    },
    [fiscalYearId]
  );

  const handleFetchConsumptionImage = async (fiscalYearId: string) => {
    try {
      const res = await handleProgress(
        Services.getConsumptionImage,
        'loading',
        fiscalYearId
      );

      if (!res) {
        setState((prevState) => ({
          ...prevState,
          progress: 0,
          loading: false,
        }));
        return;
      }

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          progress: 0,
          loading: false,
          src: res.Attachment?.Content || null,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          progress: 0,
          loading: false,
          error: { messages: [String(res.Message)] },
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteConsumptionImage = async () => {
    if (!fiscalYearId) return;

    try {
      const reqBody = {
        FiscalYearId: fiscalYearId,
        Content: null,
      };

      const res = await handleProgress(
        Services.updateConsumptionImage,
        'deleting',
        reqBody
      );

      if (!res) return;

      if (res.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          deleting: false,
          progress: 0,
          src: null,
        }));
      } else {
        setState((prevState) => ({
          ...prevState,
          progress: 0,
          deleting: false,
          error: { messages: [String(res.Message)] },
        }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChangeAddConsumptionReportToClosingTheBookReport = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setState((prevState) => ({
        ...prevState,
        addConsumptionReportToClosingTheBookReport: e.target.checked,
      }));
    },
    []
  );

  const handleSaveConsumptionMeter = useCallback(
    async (options: { [key: string]: number }) => {
      if (!consumptionData || !fiscalYearId) return;
      try {
        setState((prevState) => ({
          ...prevState,
          saving: true,
        }));

        const reqBody = {
          FiscalYearId: fiscalYearId,
          HeatEnergyOfHotWater: consumptionData.heatEnergyOfHotWater,
          ConsumptionOfHotWater: consumptionData.consumptionOfHotWater,
          Population: consumptionData.population,
          AddConsumptionReportToClosingTheBookReport:
            state.addConsumptionReportToClosingTheBookReport,
          ...options,
        };

        const res = await Services.fiscalYearConsumptionUpdate(reqBody);

        if (res.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            saving: false,
          }));

          await fetchGeneralData(fiscalYearId);
        } else {
          setState((prevState) => ({
            ...prevState,
            saving: false,
            error: { messages: [String(res.Message)] },
          }));
        }
      } catch (err) {
        console.error(err);

        setState((prevState) => ({
          ...prevState,
          saving: false,
          error: { messages: [String(err)] },
        }));
      }
    },
    [state, fiscalYearId]
  );

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  useEffect(() => {
    if (fiscalYearId) {
      handleFetchConsumptionImage(fiscalYearId);
    }
  }, [consumptionData]);

  return {
    ...state,
    isClosed: !!fiscalYear?.isClosed,
    handleInitError,
    consumptionData,
    handleChangeAddConsumptionReportToClosingTheBookReport,
    handleSaveConsumptionMeter,
    handleChangeCurrentFile,
    handleDeleteConsumptionImage,
  };
};

export default useConsumptionData;
