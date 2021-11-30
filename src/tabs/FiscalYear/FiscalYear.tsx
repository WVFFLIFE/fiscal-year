import useFiscalYearData from './useFiscalYearData';

import TopBar from 'components/TopBar';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import BaseCooperativesList from 'components/BaseCooperativesList';
import GeneralPage from 'components/GeneralPage';

const FiscalYear = () => {
  const {
    state,
    fetchExtendedCooperativesList,
    handleInitError,
    handleChangeDefaultCooperative,
    handleChangeCalendarYear,
    handleChangeSelectedCooperatives,
    handleShowExtendedList,
  } = useFiscalYearData();

  return (
    <>
      <TopBar />
      {state.defaultCooperative && state.selectedCalendarYear ? (
        <GeneralPage
          selectedCalendarYear={state.selectedCalendarYear}
          defaultCooperativeId={state.defaultCooperative}
          defaultFiscalYearId={state.defaultFiscalYear}
        />
      ) : (
        <BaseCooperativesList
          selectedCooperatives={state.selectedCooperatives}
          calendarYear={state.selectedCalendarYear}
          commonCooperatives={state.commonCooperatives}
          extendedCooperatives={state.extendedCooperatives}
          fetchExtendedCooperativesList={fetchExtendedCooperativesList}
          onChangeDefaultCooperative={handleChangeDefaultCooperative}
          onChangeCalendarYear={handleChangeCalendarYear}
          onChangeCooperatives={handleChangeSelectedCooperatives}
          onShowExtendedList={handleShowExtendedList}
          showExtendedList={state.showExtendedList}
        />
      )}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default FiscalYear;
