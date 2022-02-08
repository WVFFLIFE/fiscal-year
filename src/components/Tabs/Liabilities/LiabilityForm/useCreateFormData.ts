import { useState, useEffect, FormEvent, useRef } from 'react';
import { useForm } from 'react-hook-form';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useSuccessDialogState from 'hooks/useSuccessDialogState';

import { Services, LiabilityFormBody } from 'services/s';
import { ErrorModel } from 'models';
import { FiscalYearModel } from 'utils/fiscalYear';
import { toFloat } from 'utils';
import { serverFormat } from 'utils/dates';

const LiabilityService = Services.Liabilities.getInstance();

export type InitialValues = {
  id?: string;
  liabilityName: string;
  description: string | null;
  generalType: number | null;
  liabilityPartyName: string;
  liabilityPartyId: string | null;
  startDate: Date | null;
  endDate: Date | null;
  documentNumber: string;
  usage: number | null;
  product: number | null;
  type: number | null;
  quantity: string;
  priceItemRate: string;
};

export enum ValidationError {
  Required = 'Field is required',
  InvalidDateFormat = 'Invalid date format',
}

type LiabilitySubmitForm = {
  liabilityName: string | null;
  description: string | null;
  generalType: number | null;
  liabilityParty: {
    name: string;
    id: string | null;
  };
  startDate: Date | null;
  endDate: Date | null;
  documentNumber: string | null;
  usage: number | null;
  product: number | null;
  type: number | null;
  quantity: string;
  priceItemRate: string;
  cooperative: {
    name: string;
    id: string;
  } | null;
};

function getCooperative(fiscalYear: FiscalYearModel | null) {
  if (
    !fiscalYear ||
    !fiscalYear.general.cooperativeId ||
    !fiscalYear.general.cooperativeName
  )
    return null;

  return {
    id: fiscalYear.general.cooperativeId,
    name: fiscalYear.general.cooperativeName,
  };
}

type SaveBtnState = {
  save: boolean;
  saveAndNew: boolean;
  saveAndCopy: boolean;
};

type RequestState = {
  error: ErrorModel | null;
} & SaveBtnState;

const useCreateFormData = (
  action: 'create' | 'edit',
  initialValues: (InitialValues & Partial<{ id: string }>) | null = null,
  onClose: () => void,
  onUpdate: (loading?: boolean) => void
) => {
  const fiscalYear = useSelectFiscalYear();

  const [formType, setFormType] = useState<'create' | 'edit'>(action);
  const [requestState, setRequestState] = useState<RequestState>({
    error: null,
    save: false,
    saveAndNew: false,
    saveAndCopy: false,
  });
  const successDialogState = useSuccessDialogState();
  const closeSuccessDialog = useRef(successDialogState.close);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setFocus,
  } = useForm<LiabilitySubmitForm>({
    mode: 'onChange',
    defaultValues: initialValues
      ? {
          cooperative: getCooperative(fiscalYear),
          description: initialValues.description,
          documentNumber: initialValues.documentNumber,
          endDate: initialValues.endDate,
          generalType: initialValues.generalType,
          liabilityName: initialValues.liabilityName,
          liabilityParty: {
            id: initialValues.liabilityPartyId,
            name: initialValues.liabilityPartyName,
          },
          priceItemRate: initialValues.priceItemRate,
          product: initialValues.product,
          quantity: initialValues.quantity,
          startDate: initialValues.startDate,
          type: initialValues.type,
          usage: initialValues.usage,
        }
      : {
          cooperative: getCooperative(fiscalYear),
          description: '',
          documentNumber: '',
          endDate: null,
          generalType: null,
          liabilityName: '',
          liabilityParty: {
            id: null,
            name: '',
          },
          priceItemRate: '',
          product: null,
          quantity: '',
          startDate: null,
          type: null,
          usage: null,
        },
  });

  useEffect(() => {
    const firstError = (Object.keys(errors) as Array<keyof typeof errors>).find(
      Boolean
    );

    if (firstError) {
      setFocus(firstError);
    }
  }, [errors, setFocus]);

  const saveLiability = async (
    data: LiabilitySubmitForm,
    type: keyof SaveBtnState
  ) => {
    const req: LiabilityFormBody = {
      Name: data.liabilityName as string,
      Description: data.description || null,
      DocumentNumber: data.documentNumber || null,
      EndDate: data.endDate && serverFormat(data.endDate),
      GeneralType: data.generalType as number,
      PartyId: data.liabilityParty?.id as string,
      PriceItemRate: toFloat(data.priceItemRate),
      Product: data.product as number,
      Quantity: toFloat(data.quantity),
      StartDate: data.startDate && serverFormat(data.startDate),
      Type: data.type || null,
      Usage: data.usage as number,
    };

    try {
      setRequestState((prevState) => ({
        ...prevState,
        [type]: true,
      }));

      if (!data.cooperative) {
        throw new Error('Organization is not selected');
      }

      let res;

      if (formType === 'create') {
        res = await LiabilityService.create(data.cooperative.id, req);
      } else {
        if (!initialValues?.id) throw new Error(`Id is missing`);

        res = await LiabilityService.update({
          ...req,
          Id: initialValues.id,
        });
      }

      if (!res.IsSuccess) throw new Error(res.Message);

      setRequestState((prevState) => ({
        ...prevState,
        [type]: false,
      }));

      return true;
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        [type]: false,
        error: { messages: [(err as Error).message] },
      }));

      return false;
    }
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    handleSubmit(async (data) => {
      const isSaved = await saveLiability(data, 'save');

      if (isSaved) {
        closeSuccessDialog.current = () => {
          successDialogState.close();
          onClose();
          onUpdate();
        };
        successDialogState.open();
      }
    })();
  };

  const handleSaveAndCopy = () => {
    handleSubmit(async (data) => {
      const isSaved = await saveLiability(data, 'saveAndCopy');

      if (isSaved) {
        closeSuccessDialog.current = () => {
          successDialogState.close();
          setFormType('create');
          onUpdate(false);
        };
        successDialogState.open();
      }
    })();
  };

  const handleSaveAndNew = () => {
    handleSubmit(async (data) => {
      const isSaved = await saveLiability(data, 'saveAndNew');

      if (isSaved) {
        reset({
          cooperative: getCooperative(fiscalYear),
          description: '',
          documentNumber: '',
          endDate: null,
          generalType: null,
          liabilityName: '',
          liabilityParty: {
            id: null,
            name: '',
          },
          priceItemRate: '',
          product: null,
          quantity: '',
          startDate: null,
          type: null,
          usage: null,
        });

        closeSuccessDialog.current = () => {
          successDialogState.close();
          setFormType('create');
          onUpdate(false);
        };
        successDialogState.open();
      }
    })();
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    formType,
    isOpenSuccessDialog: successDialogState.isOpen,
    requestState,
    control,
    errors,
    handleSave,
    handleSaveAndCopy,
    handleSaveAndNew,
    handleInitError,
    handleCloseSuccessDialog: closeSuccessDialog.current,
  };
};

export default useCreateFormData;
