import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { ErrorModel } from 'models';

import useAppDispatch from 'hooks/useAppDispatch';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useStateSelector from 'hooks/useStateSelector';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';

import {
  selectBalancesData,
  selectBalancesProducts,
} from 'selectors/generalPageSelectors';

import { toFloat } from 'utils';

import Services, { BalanceUpdateRequest } from 'services';

interface FormStateModel {
  productName: string;
  deficit: string;
  uploading: boolean;
  error: ErrorModel | null;
  validation: Record<string, string>;
}

const useAddFormData = (onClose: () => void) => {
  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();

  const { balancesData, balancesProducts } = useStateSelector((state) => ({
    balancesData: selectBalancesData(state),
    balancesProducts: selectBalancesProducts(state),
  }));

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

  const handleChangeDeficit = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

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

      if (
        !isValid ||
        !fiscalYear ||
        !fiscalYear.id ||
        !balancesData ||
        !balancesProducts
      )
        return;

      setFormState((prevState) => ({
        ...prevState,
        uploading: true,
      }));

      const reqBody: BalanceUpdateRequest = {
        FiscalYearId: fiscalYear.id,
        PropertyMeintenanceProductName:
          balancesData.propertyMaintenanceProductName,
        PropertyMeintenanceSurplusDeficitPreviousFY:
          balancesData.propertyMaintenanceSurplusDeficitPreviousFY,
        SpecialFinancialCalculations: [
          ...balancesData.products.map((product) => ({
            Id: product.id,
            IsDisabled: product.isDisabled,
            IsShow: product.isShow,
            ProductName: product.productName,
            SurplusDeficitPreviousFY: product.surplusDeficitPreviousFY,
          })),
          {
            Id: null,
            IsDisabled: false,
            IsShow: true,
            ProductName: formState.productName,
            SurplusDeficitPreviousFY: toFloat(formState.deficit),
          },
        ],
        VATCalculationsProductName: balancesData.vatCalculationsProductName,
        VATCalculationsSurplusDeficitPreviousFY:
          balancesData.vatCalculationsSurplusDeficitPreviousFY,
      };

      const res = await Services.fiscalYearBalancesUpdate(reqBody);

      if (res.IsSuccess) {
        setFormState((prevState) => ({
          ...prevState,
          uploading: false,
        }));
        onClose();
        dispatch(fetchGeneralFiscalYear(fiscalYear.id));
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
