import { ChangeEvent } from 'react';
import { useFormik } from 'formik';
import useCooperative, { CooperativeModel } from 'hooks/useCooperative';

interface InitialValues {
  liabilityName: string;
  organization: string | null;
  description: string;
  generalType: number | null;
  liabilityParty: number | null;
  cooperative: CooperativeModel | null;
  startDate: Date | null;
  endDate: Date | null;
  documentNumber: string | null;
  usage: number | null;
  product: number | null;
  type: number | null;
  quanity: number | null;
  priceItemRate: number | null;
}

interface OptionsModel {
  initialValues?: InitialValues;
  onSubmit?: (values: any) => Promise<unknown>;
}

const useLiabilityCreateFormData = (options: OptionsModel) => {
  const cooperative = useCooperative();
  const { initialValues, onSubmit } = options;

  const formik = useFormik({
    initialValues: initialValues || {
      cooperative,
      description: '',
      documentNumber: '',
      endDate: null,
      generalType: null,
      liabilityName: '',
      liabilityParty: null,
      organization: null,
      priceItemRate: null,
      product: null,
      quanity: null,
      startDate: null,
      type: null,
      usage: null,
    },
    onSubmit: (values) => {
      console.log(values);
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

  return {
    formik,
    handleChangeInput,
    handleChangeSelect,
    handleChangeStartDate,
    handleChangeEndDate,
  };
};

export default useLiabilityCreateFormData;
