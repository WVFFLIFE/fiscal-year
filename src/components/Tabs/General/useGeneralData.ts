import { ErrorModel } from 'models';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { sleep, readFile } from 'utils';
import { serverFormat } from 'utils/dates';
import { GeneralModel } from 'utils/fiscalYear';
import { GeneralInformationDataModel } from './GeneralInformationTable';
import Services from 'services';

interface StateModel {
  file: File | null;
  progress: number;
  loading: boolean;
  uploading: boolean;
  deleting: boolean;
  error: ErrorModel | null;
  src: string | null;
  saving: boolean;
}

const useGeneralData = (data: GeneralModel) => {
  const { t } = useTranslation();
  const { fetchGeneralData } = useGeneralCtx();
  const [state, setState] = useState<StateModel>({
    file: null,
    progress: 0,
    loading: false,
    uploading: false,
    deleting: false,
    error: null,
    src: null,
    saving: false,
  });

  const coopId = data.cooperativeId;
  const fiscalYearId = data.id;

  useEffect(() => {
    async function getCoverImage(id: string) {
      try {
        setState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        await sleep(300);

        setState((prevState) => ({
          ...prevState,
          progress: 50,
        }));

        const res = await Services.getCooperativeCover(id);

        setState((prevState) => ({
          ...prevState,
          progress: 100,
        }));

        await sleep(300);

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

        setState((prevState) => ({
          ...prevState,
          progress: 0,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    }

    if (data && data.cooperativeId) {
      getCoverImage(data.cooperativeId);
    }
  }, [data]);

  const handleChangeCurrentFile = useCallback(
    async (files: File[]) => {
      if (!files.length || !coopId) return;

      const [file] = files;

      try {
        setState((prevState) => ({
          ...prevState,
          uploading: true,
        }));

        await sleep(300);

        setState((prevState) => ({
          ...prevState,
          progress: 50,
        }));

        const dataURL = await readFile(file);
        const updateRes = await Services.updateCooperativeCover({
          CooperativeId: coopId,
          Content: dataURL,
        });
        const getRes = await Services.getCooperativeCover(coopId);

        setState((prevState) => ({
          ...prevState,
          progress: 100,
        }));

        await sleep(300);

        if (updateRes.IsSuccess && getRes.IsSuccess) {
          setState((prevState) => ({
            ...prevState,
            progress: 0,
            src: getRes.Attachment?.Content || null,
            uploading: false,
          }));
        } else {
          throw new Error(
            updateRes.ResponseCode === 1
              ? 'The upload file is too large'
              : String(updateRes.Message || getRes.Message)
          );
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
    [coopId]
  );

  /**
   * Delete cover page image
   */
  const handleDeleteCurrentFile = async () => {
    if (!coopId) return;
    try {
      setState((prevState) => ({
        ...prevState,
        deleting: true,
      }));

      await sleep(300);

      setState((prevState) => ({
        ...prevState,
        progress: 50,
      }));

      const updateRes = await Services.updateCooperativeCover({
        CooperativeId: coopId,
        Content: null,
      });

      if (updateRes.IsSuccess) {
        setState((prevState) => ({
          ...prevState,
          progress: 100,
        }));

        await sleep(300);

        setState((prevState) => ({
          ...prevState,
          deleting: false,
          progress: 0,
          src: null,
        }));
      } else {
        throw new Error(updateRes.Message);
      }
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        deleting: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleInitError = () => {
    setState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  /**
   *  Validate selected fiscal year dates
   * @param {Date} startDate
   * @param {Date} endDate
   * @returns true if validation is successfully completed,
   * else - undefined
   */
  const validate = async (startDate: Date, endDate: Date) => {
    if (!fiscalYearId) return;
    try {
      setState((prevState) => ({
        ...prevState,
        saving: true,
      }));

      const res = await Services.validateFiscalYearChanges(
        null,
        fiscalYearId,
        serverFormat(startDate),
        serverFormat(endDate)
      );

      if (res.IsSuccess) return true;

      throw new Error(
        res.ValidationResult
          ? t(`#error.fiscalyear.validating.status.${res.ValidationResult}`)
          : res.Message
      );
    } catch (err) {
      console.error(err);

      setState((prevState) => ({
        ...prevState,
        saving: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleSaveFiscalYear = useCallback(
    async (startDate: Date, endDate: Date) => {
      if (!fiscalYearId) return;
      const isValid = await validate(startDate, endDate);

      if (isValid) {
        try {
          const res = await Services.fiscalYearGeneralUpdate({
            FiscalYearId: fiscalYearId,
            StartDate: serverFormat(startDate),
            EndDate: serverFormat(endDate),
          });

          if (res.IsSuccess) {
            setState((prevState) => ({
              ...prevState,
              saving: false,
            }));

            return await fetchGeneralData(fiscalYearId);
          } else {
            throw new Error(res.Message);
          }
        } catch (err) {
          console.error(err);

          setState((prevState) => ({
            ...prevState,
            saving: false,
            error: { messages: [String(err)] },
          }));
        }
      }
    },
    [fiscalYearId]
  );

  const generalInformationList: GeneralInformationDataModel[] = useMemo(
    () => [
      {
        id: data.id,
        cooperativeLink: data.cooperativeId,
        endDate: data.endDate,
        isClosed: data.isClosed,
        name: data.cooperativeName,
        startDate: data.startDate,
      },
    ],
    [data]
  );

  return {
    ...state,
    generalInformationList,
    handleChangeCurrentFile,
    handleDeleteCurrentFile,
    handleSaveFiscalYear,
    handleInitError,
  };
};

export default useGeneralData;
