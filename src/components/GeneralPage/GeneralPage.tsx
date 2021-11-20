import useGeneralPageData from './useGeneralPageData';
import { ExtendedCooperativeModel } from 'models';

import Box from '@mui/material/Box';
import { FiltersWrapper } from 'components/Styled';
import Tabs from 'components/Tabs';
import CooperativesPicker from 'components/CooperativesPicker';
import FiscalYearPicker from 'components/FiscalYearPicker';
import PageSearch from 'components/controls/PageSearch';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';

interface GeneralPageProps {
  defaultCooperative: ExtendedCooperativeModel;
  cooperatives: ExtendedCooperativeModel[];
}

const GeneralPage: React.FC<GeneralPageProps> = ({
  defaultCooperative,
  cooperatives,
}) => {
  const {
    state,
    selected,
    handleInitError,
    handleChangeFiscalYear,
    handleChangeSearchTerm,
    handleChangeSelectedCooperatives,
  } = useGeneralPageData([], defaultCooperative);
  return (
    <>
      <FiltersWrapper>
        <Box padding={4} paddingX={2}>
          <CooperativesPicker
            cooperatives={cooperatives}
            selectedCooperatives={[selected.cooperative]}
            onSelectCooperatives={handleChangeSelectedCooperatives}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <FiscalYearPicker
            value={selected.fiscalYear}
            options={state.fiscalYears}
            onSelectFiscalYear={handleChangeFiscalYear}
          />
        </Box>
        <Box
          display="flex"
          flex={1}
          justifyContent="flex-end"
          padding={4}
          paddingX={2}
        >
          <PageSearch
            searchTerm={state.searchTerm}
            onChange={handleChangeSearchTerm}
          />
        </Box>
      </FiltersWrapper>
      <Tabs
        DocumentsTabProps={{
          fiscalYear: selected.fiscalYear,
        }}
      />
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default GeneralPage;
