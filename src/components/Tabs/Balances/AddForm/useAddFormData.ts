import { ChangeEvent, FormEvent, useCallback, useState } from 'react';
import { ErrorModel, OptionalNumber, OptionalString } from 'models';

import useAppDispatch from 'hooks/useAppDispatch';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useStateSelector from 'hooks/useStateSelector';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';

import {
  selectBalancesData,
  selectBalancesProducts,
} from 'selectors/generalPageSelectors';

import {
  isProductEmpty,
  isProductVisible,
  BalanceProductModel,
  unzipProducts,
} from 'utils/fiscalYear';

import Services from 'services';

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

function getFieldIdx(products: BalanceProductModel[]) {
  const nextProduct = products.find(
    (product) =>
      isProductEmpty(product.productName, product.surplusDeficitPreviousFY) &&
      isProductVisible(product)
  );

  return nextProduct?.index;
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

      if (
        !isValid ||
        !fiscalYear ||
        !fiscalYear.id ||
        !balancesData ||
        !balancesProducts
      )
        return;

      const unzippedProducts = unzipProducts(balancesProducts);

      setFormState((prevState) => ({
        ...prevState,
        uploading: true,
      }));

      const fieldIdx = getFieldIdx(balancesProducts);

      const options = fieldIdx
        ? {
            [`SpecFinCalcProductName${fieldIdx}`]: formState.productName,
            [`SpecFinCalcSurplusDeficitPreviousFY${fieldIdx}`]: toNumber(
              formState.deficit
            ),
          }
        : {};

      const reqBody = {
        FiscalYearId: fiscalYear.id,
        PropertyMeintenanceProductName:
          balancesData.propertyMaintenanceProductName,
        PropertyMeintenanceSurplusDeficitPreviousFY:
          balancesData.propertyMaintenanceSurplusDeficitPreviousFY,
        Show1: true,
        Show2: true,
        Show3: true,
        Show4: true,
        Show5: true,
        SpecFinCalcProductName1: unzippedProducts[
          'productName1'
        ] as OptionalString,
        SpecFinCalcProductName2: unzippedProducts[
          'productName2'
        ] as OptionalString,
        SpecFinCalcProductName3: unzippedProducts[
          'productName3'
        ] as OptionalString,
        SpecFinCalcProductName4: unzippedProducts[
          'productName4'
        ] as OptionalString,
        SpecFinCalcProductName5: unzippedProducts[
          'productName5'
        ] as OptionalString,
        SpecFinCalcSurplusDeficitPreviousFY1: unzippedProducts[
          'surplusDeficitPreviousFY1'
        ] as OptionalNumber,
        SpecFinCalcSurplusDeficitPreviousFY2: unzippedProducts[
          'surplusDeficitPreviousFY2'
        ] as OptionalNumber,
        SpecFinCalcSurplusDeficitPreviousFY3: unzippedProducts[
          'surplusDeficitPreviousFY3'
        ] as OptionalNumber,
        SpecFinCalcSurplusDeficitPreviousFY4: unzippedProducts[
          'surplusDeficitPreviousFY4'
        ] as OptionalNumber,
        SpecFinCalcSurplusDeficitPreviousFY5: unzippedProducts[
          'surplusDeficitPreviousFY5'
        ] as OptionalNumber,
        VATCalculationsProductName: balancesData.vatCalculationsProductName,
        VATCalculationsSurplusDeficitPreviousFY:
          balancesData.vatCalculationsSurplusDeficitPreviousFY,
        ...options,
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
