import useGeneralCtx from './useGeneralCtx';

export interface CooperativeModel {
  name: string;
  id: string;
}

const useCooperative = (): CooperativeModel | null => {
  const {
    state: { fiscalYear },
  } = useGeneralCtx();

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
