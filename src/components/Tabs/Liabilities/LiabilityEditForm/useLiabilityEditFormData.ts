import { useState, useEffect, useMemo } from 'react';
import { ErrorModel } from 'models';
import { Services, LiabilityDetails } from 'services/s';
import { toNumberFormat, toIntFormat } from 'utils';

import { InitialFormValues } from '../LiabilityForm';

function makeInitialValues(
  liability: LiabilityDetails | null
): InitialFormValues | null {
  if (!liability) return null;
  return {
    id: liability.Id,
    description: liability.Description || '',
    documentNumber: liability.DocumentNumber || '',
    endDate: liability.EndDate ? new Date(liability.EndDate) : null,
    generalType: liability.GeneralType,
    liabilityName: liability.Name,
    liabilityPartyName: liability.PartyName || '',
    liabilityPartyId: liability.PartyId,
    priceItemRate: toNumberFormat(liability.PriceItemRate) || '',
    product: liability.Product,
    quantity: liability.Quantity ? String(liability.Quantity) : '',
    startDate: liability.StartDate ? new Date(liability.StartDate) : null,
    type: liability.Type,
    usage: liability.Usage,
  };
}

const LiabilityServices = Services.Liabilities.getInstance();

interface RequestStateModel {
  liability: LiabilityDetails | null;
  loading: boolean;
  error: ErrorModel | null;
}

const useLiabilityEditFormData = (ids: string[]) => {
  const [requestState, setRequestState] = useState<RequestStateModel>({
    loading: true,
    error: null,
    liability: null,
  });

  const fetchLiabilityData = async (id: string) => {
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await LiabilityServices.getLiability(id);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          liability: res.Liability,
          loading: false,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      console.error(err);

      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  useEffect(() => {
    if (ids.length === 1) {
      const [id] = ids;

      fetchLiabilityData(id);
    }
  }, [ids]);

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const initialValues = useMemo(
    () => makeInitialValues(requestState.liability),
    [requestState.liability]
  );

  return { requestState, initialValues, handleInitError };
};

export default useLiabilityEditFormData;
