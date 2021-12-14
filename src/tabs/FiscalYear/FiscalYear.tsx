import useFiscalYearData from './useFiscalYearData';
import useGeneralCtx from 'hooks/useGeneralCtx';

import TopBar from 'components/TopBar';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import SummaryPage from 'components/SummaryPage';
import GeneralPage from 'components/GeneralPage';

const FiscalYear = () => {
  const {
    state: {
      defaultFiscalYearId,
      defaultCooperativeId,
      loading: fiscalYearLoading,
      error: fiscalYearError,
    },
    handleInitGeneralInformationError,
  } = useGeneralCtx();
  const { state, handleInitError } = useFiscalYearData();

  const showLoader = state.loading || fiscalYearLoading;
  const errors = state.error || fiscalYearError;
  const initError = state.error
    ? handleInitError
    : handleInitGeneralInformationError;

  return (
    <>
      <TopBar />
      {defaultCooperativeId && defaultFiscalYearId ? (
        <GeneralPage
          defaultCooperativeId={defaultCooperativeId}
          defaultFiscalYearId={defaultFiscalYearId}
        />
      ) : (
        <SummaryPage commonCooperatives={state.commonCooperatives} />
      )}
      <Backdrop loading={showLoader} />
      <DialogError error={errors} initError={initError} />
    </>
  );
};

export default FiscalYear;
