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

import { unzipProducts, hasEmptyProduct } from 'utils/fiscalYear';

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

  const handleSaveFields = useCallback(
    async (
      options: { [key: string]: OptionalNumber | OptionalString },
      cb?: () => void
    ) => {
      if (!fiscalYear?.id || !balancesData || !products) return;

      const unzippedProducts = unzipProducts(products);

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
    },
    [balancesData, fiscalYear, products]
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const isDisabledAddNewProductBtn = useMemo(() => {
    if (!products) return true;

    return !hasEmptyProduct(products);
  }, [products]);

  return {
    isClosed: !!fiscalYear?.isClosed,
    isDisabledAddNewProductBtn,
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
