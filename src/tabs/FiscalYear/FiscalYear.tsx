import useFiscalYearData from './useFiscalYearData';
import useStateSelector from 'hooks/useStateSelector';

import SummaryPage from 'pages/SummaryPage';
import GeneralPage from 'pages/GeneralPage';

import TopBar from 'components/TopBar';
import SuspenceFacade from 'components/SuspenceFacade';

const FiscalYear = () => {
  const { defaultCooperativeId, defaultFiscalYearId, cooperatives } =
    useStateSelector((state) => ({
      defaultCooperativeId: state.app.defaultCooperativeId,
      defaultFiscalYearId: state.app.defaultFiscalYearId,
      cooperatives: state.generalPage.filters.cooperatives.list,
    }));
  const { state, handleInitError } = useFiscalYearData();

  const showGeneralPage = defaultFiscalYearId && defaultCooperativeId;

  return (
    <SuspenceFacade
      loading={state.loading}
      error={state.error}
      onInitError={handleInitError}
    >
      <TopBar />
      {showGeneralPage ? (
        <GeneralPage />
      ) : (
        <SummaryPage commonCooperatives={cooperatives} />
      )}
    </SuspenceFacade>
  );
};

export default FiscalYear;
