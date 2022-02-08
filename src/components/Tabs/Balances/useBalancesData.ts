import { useState, useCallback, useMemo, useEffect } from 'react';
import { ErrorModel, OptionalNumber, OptionalString } from 'models';

import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';
import useToggleSwitch from 'hooks/useToggleSwitch';

import { fetchGeneralFiscalYear } from 'features/generalPageSlice';
import { reset } from 'features/balanceSlice';

import {
  selectBalancesData,
  selectBalancesProducts,
  selectPropertyMaintenanceData,
  selectVATCalculationData,
} from 'selectors/generalPageSelectors';

import { toFloat } from 'utils';

import Services from 'services';

interface RequestStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

const useBalancesData = () => {
  const dispatch = useAppDispatch();
  const fiscalYear = useSelectFiscalYear();

  const {
    balancesData,
    products,
    propertyMaintenanceData,
    vatCalculationData,
  } = useStateSelector((state) => ({
    balancesData: selectBalancesData(state),
    products: selectBalancesProducts(state),
    propertyMaintenanceData: selectPropertyMaintenanceData(state),
    vatCalculationData: selectVATCalculationData(state),
  }));

  const [showDialog, toggleShowDialog] = useToggleSwitch(false);
  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: false,
    error: null,
  });

  useEffect(() => {
    return () => {
      dispatch(reset());
    };
  }, []);

  const handleSaveProducts = async (
    value: string,
    fieldName: 'productName' | 'deficit',
    id: number,
    cb?: () => void
  ) => {
    if (!fiscalYear?.id || !balancesData || !products) return;

    const newProducts = products.map((product) => {
      let newProduct = {
        Id: product.id,
        IsDisabled: product.isDisabled,
        IsShow: product.isShow,
        ProductName: product.productName,
        SurplusDeficitPreviousFY: product.surplusDeficitPreviousFY,
      };

      if (product.id === id) {
        if (fieldName === 'productName') {
          newProduct.ProductName = value;
        } else if (fieldName === 'deficit') {
          newProduct.SurplusDeficitPreviousFY = +value;
        }
      }

      return newProduct;
    });

    const reqBody = {
      FiscalYearId: fiscalYear.id,
      PropertyMeintenanceProductName:
        balancesData.propertyMaintenanceProductName,
      PropertyMeintenanceSurplusDeficitPreviousFY:
        balancesData.propertyMaintenanceSurplusDeficitPreviousFY,
      SpecialFinancialCalculations: newProducts,
      VATCalculationsProductName: balancesData.vatCalculationsProductName,
      VATCalculationsSurplusDeficitPreviousFY:
        balancesData.vatCalculationsSurplusDeficitPreviousFY,
    };

    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await Services.fiscalYearBalancesUpdate(reqBody);

      if (res.IsSuccess) {
        if (cb) cb();
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
        }));

        dispatch(fetchGeneralFiscalYear(fiscalYear.id));
        return;
      }

      throw new Error(res.Message);
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleSaveFields = useCallback(
    async (
      options: Record<string, OptionalNumber | OptionalString>,
      cb?: () => void
    ) => {
      if (!fiscalYear?.id || !balancesData || !products) return;

      const reqBody = {
        FiscalYearId: fiscalYear.id,
        PropertyMeintenanceProductName:
          balancesData.propertyMaintenanceProductName,
        PropertyMeintenanceSurplusDeficitPreviousFY:
          balancesData.propertyMaintenanceSurplusDeficitPreviousFY,
        SpecialFinancialCalculations: balancesData.products.map((product) => ({
          Id: product.id,
          IsDisabled: product.isDisabled,
          IsShow: product.isShow,
          ProductName: product.productName,
          SurplusDeficitPreviousFY: product.surplusDeficitPreviousFY,
        })),
        VATCalculationsProductName: balancesData.vatCalculationsProductName,
        VATCalculationsSurplusDeficitPreviousFY:
          balancesData.vatCalculationsSurplusDeficitPreviousFY,
        ...options,
      };

      try {
        setRequestState((prevState) => ({
          ...prevState,
          loading: true,
        }));

        const res = await Services.fiscalYearBalancesUpdate(reqBody);

        if (!res.IsSuccess) throw new Error(res.Message);

        if (cb) cb();
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
        }));

        dispatch(fetchGeneralFiscalYear(fiscalYear.id));
      } catch (err) {
        console.error(err);

        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    },
    [balancesData, fiscalYear, products, dispatch]
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  return {
    isClosed: !!fiscalYear?.isClosed,
    handleSaveProducts,
    requestState,
    products,
    propertyMaintenanceData,
    vatCalculationData,
    handleInitError,
    showDialog,
    toggleShowDialog,
    handleSaveFields,
  };
};

export default useBalancesData;
