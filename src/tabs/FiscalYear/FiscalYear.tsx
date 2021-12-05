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
  } = useContext(GeneralCtx);
  const { state, handleInitError } = useFiscalYearData();

  return (
    <>
      <TopBar showFiscalYearBtns={!!generalInformation.data} />
      {defaultCooperativeId && defaultFiscalYearId ? (
        <GeneralPage
          defaultCooperativeId={defaultCooperativeId}
          defaultFiscalYearId={defaultFiscalYearId}
        />
      ) : (
        <SummaryPage commonCooperatives={state.commonCooperatives} />
      )}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default FiscalYear;
