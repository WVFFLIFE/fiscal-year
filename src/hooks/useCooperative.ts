import useSelectFiscalYear from './useSelectFiscalYear';

export interface CooperativeModel {
  name: string;
  id: string;
}

const useCooperative = (): CooperativeModel | null => {
  const fiscalYear = useSelectFiscalYear();

  if (
    !fiscalYear ||
    !fiscalYear.general.cooperativeName ||
    !fiscalYear.general.cooperativeId
  )
    return null;

  return {
    name: fiscalYear.general.cooperativeName,
    id: fiscalYear.general.cooperativeId,
  };
};

export default useCooperative;
