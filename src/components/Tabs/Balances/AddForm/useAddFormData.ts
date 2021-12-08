import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { ErrorModel } from 'models';
import useGeneralCtx from 'hooks/useGeneralCtx';
import { isProductEmpty } from '../utils';

import Services, { GeneralFiscalYearModel } from 'services';

interface FormStateModel {
  productName: string;
  deficit: string;
  uploading: boolean;
  error: ErrorModel | null;
  validation: { [key: string]: string };
}

function toNumber(val: string) {
  return Number(val.replace(/ /g, '').replace(/,/g, '.'));
}

function getFieldIdx(generalData: GeneralFiscalYearModel) {
  if (
    isProductEmpty(
      generalData.SpecFinCalcProductName1,
      generalData.SpecFinCalcSurplusDeficitPreviousFY1
    ) &&
    generalData.Show1
  ) {
    return 1;
  }
  if (
    isProductEmpty(
      generalData.SpecFinCalcProductName2,
      generalData.SpecFinCalcSurplusDeficitPreviousFY2
    ) &&
    generalData.Show2
  ) {
    return 2;
  }
  if (
    isProductEmpty(
      generalData.SpecFinCalcProductName3,
      generalData.SpecFinCalcSurplusDeficitPreviousFY3
    ) &&
    generalData.Show3
  ) {
    return 3;
  }
  if (
    isProductEmpty(
      generalData.SpecFinCalcProductName4,
      generalData.SpecFinCalcSurplusDeficitPreviousFY4
    ) &&
    generalData.Show4
  ) {
    return 4;
  }
  if (
    isProductEmpty(
      generalData.SpecFinCalcProductName5,
      generalData.SpecFinCalcSurplusDeficitPreviousFY5
    ) &&
    generalData.Show1
  ) {
    return 5;
  }
}

const useAddFormData = (onClose: () => void) => {
  const {
    fetchGeneralData,
    state: { generalInformation },
  } = useGeneralCtx();
  const [formState, setFormState] = useState<FormStateModel>({
    deficit: '',
    productName: '',
    uploading: false,
    error: null,
    validation: {},
  });

  const handleChangeProductName = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;

      setFormState((prevState) => ({
        ...prevState,
        productName: value,
      }));
    },
    []
  );

  const handleChangeDeficit = (e: ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value
      .replace(/[^0-9,]/g, '')
      .replace(/[,](?=.*[,])/g, '')
      .replace(/\B(?=(\d{3})+(?!\d))/g, ' ');

    const [a, b] = value.split(',');

    if (b?.length > 2) {
      value = `${a},${b.substr(0, 2)}`;
    }

    setFormState((prevState) => ({
      ...prevState,
      deficit: value,
    }));
  };

  const validate = () => {
    if (!formState.productName) {
      setFormState((prevState) => ({
        ...prevState,
        validation: { productName: 'Field is required' },
      }));
      return false;
    }

    if (!formState.deficit) {
      setFormState((prevState) => ({
        ...prevState,
        validation: { deficit: 'Field is required' },
      }));
      return false;
    }

    return true;
  };

  const initValidation = () => {
    setFormState((prevState) => ({
      ...prevState,
      validation: {},
    }));
  };

  const upload = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const isValid = validate();
      if (!isValid || !generalInformation.data?.Id) return;

      setFormState((prevState) => ({
        ...prevState,
        uploading: true,
      }));

      const generalData = generalInformation.data;
      const fieldIdx = getFieldIdx(generalData);

      const options = fieldIdx
        ? {
            [`SpecFinCalcProductName${fieldIdx}`]: formState.productName,
            [`SpecFinCalcSurplusDeficitPreviousFY${fieldIdx}`]: toNumber(
              formState.deficit
            ),
          }
        : {};

      const reqBody = {
        FiscalYearId: generalData.Id,
        PropertyMeintenanceProductName:
          generalData.PropertyMeintenanceProductName,
        PropertyMeintenanceSurplusDeficitPreviousFY:
          generalData.PropertyMeintenanceSurplusDeficitPreviousFY,
        Show1: true,
        Show2: true,
        Show3: true,
        Show4: true,
        Show5: true,
        SpecFinCalcProductName1: generalData.SpecFinCalcProductName1,
        SpecFinCalcProductName2: generalData.SpecFinCalcProductName2,
        SpecFinCalcProductName3: generalData.SpecFinCalcProductName3,
        SpecFinCalcProductName4: generalData.SpecFinCalcProductName4,
        SpecFinCalcProductName5: generalData.SpecFinCalcProductName5,
        SpecFinCalcSurplusDeficitPreviousFY1:
          generalData.SpecFinCalcSurplusDeficitPreviousFY1,
        SpecFinCalcSurplusDeficitPreviousFY2:
          generalData.SpecFinCalcSurplusDeficitPreviousFY2,
        SpecFinCalcSurplusDeficitPreviousFY3:
          generalData.SpecFinCalcSurplusDeficitPreviousFY3,
        SpecFinCalcSurplusDeficitPreviousFY4:
          generalData.SpecFinCalcSurplusDeficitPreviousFY4,
        SpecFinCalcSurplusDeficitPreviousFY5:
          generalData.SpecFinCalcSurplusDeficitPreviousFY5,
        VATCalculationsProductName: generalData.VATCalculationsProductName,
        VATCalculationsSurplusDeficitPreviousFY:
          generalData.VATCalculationsSurplusDeficitPreviousFY,
        ...options,
      };

      const res = await Services.fiscalYearBalancesUpdate(reqBody);

      if (res.IsSuccess) {
        setFormState((prevState) => ({
          ...prevState,
          uploading: false,
        }));
        onClose();
        fetchGeneralData(generalData.Id);
      } else {
        setFormState((prevState) => ({
          ...prevState,
          uploading: false,
          error: { messages: [String(res.Message)] },
        }));
      }
    } catch (err) {
      console.error(err);

      setFormState((prevState) => ({
        ...prevState,
        error: { messages: [String(err)] },
      }));
    }
  };

  return {
    formState,
    upload,
    handleChangeProductName,
    handleChangeDeficit,
    initValidation,
  };
};

export default useAddFormData;
