import { useState, useCallback, useMemo } from 'react';
import { ErrorModel, OptionalNumber, OptionalString } from 'models';
import {
  getFiscalYearId,
  getBalancesData,
  getBalancesProducts,
  unzipProducts,
  hasEmptyProduct,
  getPropertyMaintenanceData,
  getVATCalculationData,
} from 'utils/fiscalYear';
import useGeneralCtx from 'hooks/useGeneralCtx';
import useToggleSwitch from 'hooks/useToggleSwitch';

import Services from 'services';

interface RequestStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

const useBalancesData = () => {
  const {
    fetchGeneralData,
    state: { fiscalYear },
  } = useGeneralCtx();

  const fiscalYearId = fiscalYear && getFiscalYearId(fiscalYear);
  const balancesData = fiscalYear && getBalancesData(fiscalYear);
  const products = balancesData && getBalancesProducts(balancesData);
  const propertyMaintenanceData =
    balancesData && getPropertyMaintenanceData(balancesData);
  const vatCalculationData =
    balancesData && getVATCalculationData(balancesData);

  const [showDialog, toggleShowDialog] = useToggleSwitch(false);
  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: false,
    error: null,
  });

  const handleSaveFields = useCallback(
    async (
      options: { [key: string]: OptionalNumber | OptionalString },
      cb?: () => void
    ) => {
      if (!fiscalYearId || !balancesData || !products) return;

      const unzippedProducts = unzipProducts(products);

      const reqBody = {
        FiscalYearId: fiscalYearId,
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

          fetchGeneralData(fiscalYearId);
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
    [balancesData, fiscalYearId]
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
