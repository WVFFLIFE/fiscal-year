import useGeneralPageData from './useGeneralPageData';
import { useTranslation } from 'react-i18next';
import { ExtendedCooperativeModel, CommonCooperativeModel } from 'models';

import Box from '@mui/material/Box';
import {
  FiltersWrapper,
  ApplyButton,
  InfoBox,
  Container,
} from 'components/Styled';
import Tabs from 'components/Tabs';
import CooperativesPicker from 'components/CooperativesPicker';
import FiscalYearPicker from 'components/FiscalYearPicker';
import PageSearch from 'components/controls/PageSearch';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import SelectedInfo from './SelectedInfo';

import { useStyles } from './style';

interface GeneralPageProps {
  defaultCooperative: ExtendedCooperativeModel;
  commonCooperatives: CommonCooperativeModel[];
}

const GeneralPage: React.FC<GeneralPageProps> = ({
  defaultCooperative,
  commonCooperatives,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state,
    handleShowTabs,
    handleInitError,
    handleChangeFiscalYear,
    handleChangeSearchTerm,
    handleChangeSelectedCooperatives,
  } = useGeneralPageData(defaultCooperative, commonCooperatives);

  return (
    <>
      <FiltersWrapper>
        <Box padding={4} paddingX={2}>
          <CooperativesPicker
            cooperatives={commonCooperatives}
            selectedCooperatives={
              state.selected.cooperative ? [state.selected.cooperative] : []
            }
            onSelectCooperatives={handleChangeSelectedCooperatives}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <FiscalYearPicker
            value={state.selected.fiscalYear}
            options={state.fiscalYears}
            onSelectFiscalYear={handleChangeFiscalYear}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <ApplyButton disabled={state.showTabs} onClick={handleShowTabs}>
            {t('#button.apply')}
          </ApplyButton>
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
      {state.showTabs && state.selected.fiscalYear ? (
        <Container className={classes.offsetTop}>
          <SelectedInfo fiscalYear={state.selected.fiscalYear} />
          <Tabs
            DocumentsTabProps={{
              fiscalYear: state.selected.fiscalYear,
            }}
          />
        </Container>
      ) : (
        <InfoBox>You can select another Fiscal Year if needed</InfoBox>
      )}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default GeneralPage;
