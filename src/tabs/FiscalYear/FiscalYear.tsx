import { useContext } from 'react';
import useFiscalYearData from './useFiscalYearData';
import { GeneralCtx } from 'contexts/GeneralContext';

import TopBar from 'components/TopBar';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import SummaryPage from 'components/SummaryPage';
import GeneralPage from 'components/GeneralPage';

const FiscalYear = () => {
  const {
    state: { defaultFiscalYearId, defaultCooperativeId, generalInformation },
    handleInitGeneralInformationError,
  } = useContext(GeneralCtx);
  const { state, handleInitError } = useFiscalYearData();

  const showLoader = state.loading || generalInformation.loading;
  const errors = state.error || generalInformation.error;
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
