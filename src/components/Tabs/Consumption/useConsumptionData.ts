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
  });

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

      const request = async () => {
        const reqBody = {
          FiscalYearId: fiscalYearId,
          Content: dataURL,
        };
        const updateRes = await Services.updateConsumptionImage(reqBody);

        if (updateRes.IsSuccess) {
          return await Services.getConsumptionImage(fiscalYearId);
        } else {
          throw new Error(
            updateRes.ResponseCode === 1
              ? 'The upload file is too large'
              : String(updateRes.Message)
          );
        }
      };

      try {
        const res = await handleProgress(request, 'uploading');

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
      if (!state.saving) {
        const { checked } = e.target;

        handleSaveConsumptionMeter({
          AddConsumptionReportToClosingTheBookReport: checked,
        });
      }
    },
    [state.saving]
  );

  const handleSaveConsumptionMeter = useCallback(
    async (options: { [key: string]: number | boolean }) => {
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
            consumptionData.addConsumptionReportToClosingTheBookReport,
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

  // according to refresh button logic
  // we'll update consumption image
  // when fiscal year is new object
  useEffect(() => {
    if (fiscalYearId) {
      handleFetchConsumptionImage(fiscalYearId);
    }
  }, [fiscalYear]);

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
