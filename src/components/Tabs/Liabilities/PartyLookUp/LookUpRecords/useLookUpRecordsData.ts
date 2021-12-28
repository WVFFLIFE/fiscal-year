import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { ErrorModel } from 'models';
import useDebounce from 'hooks/useDebounce';

import { Services, Organization } from 'services/s';

const LiabilityService = Services.Liabilities.getInstance();

interface RequestStateModel {
  organizations: Organization[];
  loading: boolean;
  error: ErrorModel | null;
}

const useLookupRecordsData = () => {
  const [requestState, setRequestState] = useState<RequestStateModel>({
    organizations: [],
    loading: true,
    error: null,
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrganizations, setSelectedOrganization] = useState<string[]>(
    []
  );

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const fetchParties = async (input: string) => {
    try {
      setRequestState((prevState) => ({
        ...prevState,
        loading: true,
      }));

      const res = await LiabilityService.getParties(input || null);

      if (res.IsSuccess) {
        setRequestState((prevState) => ({
          ...prevState,
          loading: false,
        }));
      } else {
        throw new Error(res.Message);
      }
    } catch (err) {
      setRequestState((prevState) => ({
        ...prevState,
        loading: false,
        error: { messages: [String(err)] },
      }));
    }
  };

  const handleInitError = () => {
    setRequestState((prevState) => ({
      ...prevState,
      error: null,
    }));
  };

  const handleChangeSearchTerm = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;

      setSearchTerm(value);
    },
    []
  );

  const handleToggleSelectAll = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;
      setSelectedOrganization(
        checked
          ? requestState.organizations.map((organization) => organization.Id)
          : []
      );
    },
    [requestState.organizations]
  );

  const handleToggleSelectRow = useCallback((organization: Organization) => {
    setSelectedOrganization((prevState) =>
      prevState.includes(organization.Id)
        ? prevState.filter((el) => el !== organization.Id)
        : prevState.concat(organization.Id)
    );
  }, []);

  useEffect(() => {
    fetchParties(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return {
    requestState,
    searchTerm,
    selectedOrganizations,
    handleChangeSearchTerm,
    handleInitError,
    handleToggleSelectAll,
    handleToggleSelectRow,
  };
};

export default useLookupRecordsData;
