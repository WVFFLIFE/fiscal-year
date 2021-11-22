import useFiscalYearData from './useFiscalYearData';

import TopBar from 'components/TopBar';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import BaseCooperativesList from 'components/BaseCooperativesList';
import GeneralPage from 'components/GeneralPage';

const FiscalYear = () => {
  const {
    state,
    handleInitError,
    fetchExtendedCooperativesList,
    handleChangeDefaultCooperative,
  } = useFiscalYearData();

  return (
    <>
      <TopBar />
      {state.defaultCooperative ? (
        <GeneralPage
          commonCooperatives={state.commonCooperatives}
          defaultCooperative={state.defaultCooperative}
        />
      ) : (
        <BaseCooperativesList
          commonCooperatives={state.commonCooperatives}
          extendedCooperatives={state.extendedCooperatives}
          fetchExtendedCooperativesList={fetchExtendedCooperativesList}
          onChangeDefaultCooperative={handleChangeDefaultCooperative}
        />
      )}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default FiscalYear;
