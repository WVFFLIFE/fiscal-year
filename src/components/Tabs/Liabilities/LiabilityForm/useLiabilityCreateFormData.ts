import { ChangeEvent, useState } from 'react';
import { useFormik, FormikErrors } from 'formik';
import useCooperative from 'hooks/useCooperative';
import { Services, Organization, LiabilityFormBody } from 'services/s';
import { toFloatStr, floatStrToNumber, toIntFormat } from 'utils';
import { serverFormat } from 'utils/dates';
import { ErrorModel } from 'models';

const LiabilityService = Services.Liabilities.getInstance();

export interface InitialValues {
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
}

interface OptionsModel {
  action: 'create' | 'edit';
  initialValues?: InitialValues | null;
  onUpdate(): void;
  onClose(): void;
}

function isValidForm(errors: FormikErrors<unknown>) {
  return !Object.keys(errors).length;
}

const useLiabilityFormData = (options: OptionsModel) => {
  const cooperative = useCooperative();
  const { initialValues, action, onClose, onUpdate } = options;

  const [error, setError] = useState<ErrorModel | null>(null);

  const formik = useFormik<
    InitialValues & { cooperativeName: string; cooperativeId: string | null }
  >({
    validateOnChange: false,
    validateOnMount: false,
    enableReinitialize: true,
    initialValues: initialValues
      ? {
          ...initialValues,
          cooperativeName: cooperative?.name || '',
          cooperativeId: cooperative?.id || null,
        }
      : {
          cooperativeName: cooperative?.name || '',
          cooperativeId: cooperative?.id || null,
          description: '',
          documentNumber: '',
          endDate: null,
          generalType: null,
          liabilityName: '',
          liabilityPartyName: '',
          liabilityPartyId: null,
          priceItemRate: '',
          product: null,
          quantity: '',
          startDate: null,
          type: null,
          usage: null,
        },
    validate: (values) => {
      let errors: { [key in keyof typeof values]?: string } = {};
      let required = 'Field is required';

      if (!values.liabilityName) {
        errors.liabilityName = required;
        return errors;
      }

      if (!values.cooperativeName || !values.cooperativeId) {
        errors.cooperativeName = required;
        return errors;
      }

      if (!values.generalType) {
        errors.generalType = required;
        return errors;
      }

      if (!values.liabilityPartyId || !values.liabilityPartyName) {
        errors.liabilityPartyName = required;
        return errors;
      }

      if (!values.usage) {
        errors.usage = required;
        return errors;
      }

      if (!values.product) {
        errors.product = required;
        return errors;
      }

      if (!values.quantity) {
        errors.quantity = required;
        return errors;
      }

      if (!values.priceItemRate) {
        errors.priceItemRate = required;
        return errors;
      }

      return errors;
    },
    onSubmit: async (values) => {
      const req: LiabilityFormBody = {
        Name: values.liabilityName,
        Description: values.description,
        GeneralType: values.generalType as number,
        PartyId: values.liabilityPartyId as string,
        StartDate: values.startDate ? serverFormat(values.startDate) : null,
        EndDate: values.endDate ? serverFormat(values.endDate) : null,
        DocumentNumber: values.documentNumber,
        Usage: values.usage as number,
        Product: values.product as number,
        Type: values.type,
        Quantity: floatStrToNumber(values.quantity),
        PriceItemRate: floatStrToNumber(values.priceItemRate),
      };

      try {
        if (!values.cooperativeId) {
          throw new Error('Organization is not selected');
        }

        let res;

        if (action === 'create') {
          res = await LiabilityService.create(values.cooperativeId, req);
        } else {
          if (!options.initialValues?.id) {
            throw new Error(`Id is missing`);
          }

          res = await LiabilityService.update({
            ...req,
            Id: options.initialValues.id,
          });
        }

        if (!res.IsSuccess) throw new Error(res.Message);

        formik.setSubmitting(false);
      } catch (err) {
        console.error(err);

        setError({ messages: [String(err)] });
      }
    },
  });

  const handleChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    formik.setValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeSelect = (value: any, name?: string) => {
    if (name) {
      formik.setValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleChangeStartDate = (date: Date | null) => {
    formik.setValues((prevState) => ({
      ...prevState,
      startDate: date,
    }));
  };

  const handleChangeEndDate = (date: Date | null) => {
    formik.setValues((prevState) => ({
      ...prevState,
      endDate: date,
    }));
  };

  const handleChangeLiabilityParty = (organization: Organization) => {
    formik.setValues((prevState) => ({
      ...prevState,
      liabilityPartyId: organization.Id,
      liabilityPartyName: organization.Name || '',
    }));
  };

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.setValues((prevState) => ({
      ...prevState,
      quantity: toIntFormat(value),
    }));
  };

  const handleChnagePriceItemRate = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    formik.setValues((prevState) => ({
      ...prevState,
      priceItemRate: toFloatStr(value),
    }));
  };

  const handleResetValidationErrors = () => {
    formik.setErrors({});
  };

  const handleResetRequestErrors = () => {
    setError(null);
  };

  const handleSubmit = async () => {
    await formik.submitForm();
    const errors = formik.validateForm();
    const isValid = isValidForm(errors);

    console.log(isValid);
  };

  return {
    formik,
    error,
    handleChangeInput,
    handleChangeSelect,
    handleChangeStartDate,
    handleChangeEndDate,
    handleChangeQuantity,
    handleChangeLiabilityParty,
    handleChnagePriceItemRate,
    handleResetValidationErrors,
    handleResetRequestErrors,
    handleSubmit,
  };
};

export default useLiabilityFormData;
