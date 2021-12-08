import { useState, useCallback, useMemo } from 'react';
import { ErrorModel } from 'models';
import useGeneralCtx from 'hooks/useGeneralCtx';

import Services from 'services';

interface RequestStateModel {
  loading: boolean;
  error: ErrorModel | null;
}

export function isProductEmpty(
  productName: string | null,
  deficit: number | null
) {
  return !productName && !deficit;
}

const useBalancesData = () => {
  const {
    state: { generalInformation },
    fetchGeneralData,
  } = useGeneralCtx();

  const [openAddProductDialog, setOpenAddProductDialog] = useState(false);
  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: false,
    error: null,
  });

  const handleOpenProductDialog = () => {
    setOpenAddProductDialog(true);
  };

  const handleCloseProductDialog = () => {
    setOpenAddProductDialog(false);
  };

  const handleSaveFields = useCallback(
    async (options: { [key: string]: string | number }, cb?: () => void) => {
      if (!generalInformation.data?.Id) return;
      const generalData = generalInformation.data;
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

          fetchGeneralData(generalData.Id);
        } else {
          setRequestState((prevState) => ({
            ...prevState,
            loading: false,
            error: { messages: [String(res.Message)] },
          }));
        }
      } catch (err) {
        console.error(err);

        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
          error: { messages: [String(err)] },
        }));
      }
    },
    [generalInformation.data]
  );

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const isDisabledAddNewProductBtn = useMemo(() => {
    const generalData = generalInformation.data;
    if (!generalData) return true;

    return (
      !isProductEmpty(
        generalData.SpecFinCalcProductName1,
        generalData.SpecFinCalcSurplusDeficitPreviousFY1
      ) &&
      !isProductEmpty(
        generalData.SpecFinCalcProductName2,
        generalData.SpecFinCalcSurplusDeficitPreviousFY2
      ) &&
      !isProductEmpty(
        generalData.SpecFinCalcProductName3,
        generalData.SpecFinCalcSurplusDeficitPreviousFY3
      ) &&
      !isProductEmpty(
        generalData.SpecFinCalcProductName4,
        generalData.SpecFinCalcSurplusDeficitPreviousFY4
      ) &&
      !isProductEmpty(
        generalData.SpecFinCalcProductName5,
        generalData.SpecFinCalcSurplusDeficitPreviousFY5
      )
    );
  }, [generalInformation.data]);

  return {
    isClosed: !!generalInformation.data?.IsClosed,
    isDisabledAddNewProductBtn,
    requestState,
    handleInitError,
    generalData: generalInformation.data,
    openAddProductDialog,
    handleOpenProductDialog,
    handleCloseProductDialog,
    handleSaveFields,
  };
};

export default useBalancesData;
