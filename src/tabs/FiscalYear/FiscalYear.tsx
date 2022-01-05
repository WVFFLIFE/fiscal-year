import useFiscalYearData from './useFiscalYearData';
import useStateSelector from 'hooks/useStateSelector';

import TopBar from 'components/TopBar';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import SummaryPage from 'components/SummaryPage';
import GeneralPage from 'components/GeneralPage';

const FiscalYear = () => {
  const { defaultCooperativeId, defaultFiscalYearId } = useStateSelector(
    (state) => state.app
  );
  const { state, handleInitError } = useFiscalYearData();

  const showGeneralPage = defaultFiscalYearId && defaultCooperativeId;
  const showLoader = state.loading;
  const errors = state.error;

  return (
    <>
      <TopBar />
      {showGeneralPage ? (
        <GeneralPage />
      ) : (
        <SummaryPage commonCooperatives={state.commonCooperatives} />
      )}
      <Backdrop loading={showLoader} />
      <DialogError error={errors} initError={handleInitError} />
    </>
  );
};

export default FiscalYear;
