import useFiscalYearData from './useFiscalYearData';
import useStateSelector from 'hooks/useStateSelector';

import SummaryPage from 'pages/SummaryPage';
import GeneralPage from 'pages/GeneralPage';

import TopBar from 'components/TopBar';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';

const FiscalYear = () => {
  const { defaultCooperativeId, defaultFiscalYearId } = useStateSelector(
    (state) => state.app
  );
  const { state, handleInitError } = useFiscalYearData();

  const showGeneralPage = defaultFiscalYearId && defaultCooperativeId;

  return (
    <>
      <TopBar />
      {showGeneralPage ? (
        <GeneralPage />
      ) : (
        <SummaryPage commonCooperatives={state.commonCooperatives} />
      )}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default FiscalYear;
