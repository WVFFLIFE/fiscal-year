import { ErrorModel } from 'models';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { sleep, readFile } from 'utils';
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
              ? t('#error.uploadedfileistoolarge')
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

  const generalInformationList: GeneralInformationDataModel[] = useMemo(
    () => [
      {
        id: data.id,
        cooperativeLink: data.cooperativeLink,
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
    handleInitError,
  };
};

export default useGeneralData;
