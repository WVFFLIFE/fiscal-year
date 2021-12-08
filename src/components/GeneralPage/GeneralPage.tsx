import useGeneralPageData from './useGeneralPageData';
import { useTranslation } from 'react-i18next';

import Box from '@mui/material/Box';
import {
  FiltersWrapper,
  ApplyButton,
  InfoBox,
  Container,
  IconButton,
} from 'components/Styled';
import { RefreshIcon } from 'components/Icons';
import Tabs from 'components/Tabs';
import CooperativesPicker from 'components/CooperativesPicker';
import FiscalYearPicker from 'components/FiscalYearPicker';
import PageSearch from 'components/controls/PageSearch';
import Backdrop from 'components/Backdrop';
import DialogError from 'components/DialogError';
import SelectedInfo from './SelectedInfo';

import { useStyles } from './style';

interface GeneralPageProps {
  defaultCooperativeId: string;
  defaultFiscalYearId: string;
}

const GeneralPage: React.FC<GeneralPageProps> = ({
  defaultCooperativeId,
  defaultFiscalYearId,
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    state,
    generalData,
    backwardToSummaryPage,
    isDisabledApplyButton,
    handleRefreshData,
    handleApplyClick,
    handleInitError,
    handleChangeFiscalYear,
    handleChangeSearchTerm,
    handleChangeSelectedCooperatives,
  } = useGeneralPageData(defaultCooperativeId, defaultFiscalYearId);

  return (
    <>
      <FiltersWrapper>
        <Box padding={4} paddingX={2}>
          <CooperativesPicker
            cooperatives={state.cooperatives}
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
          <ApplyButton
            disabled={isDisabledApplyButton}
            onClick={handleApplyClick}
          >
            {t('#button.apply')}
          </ApplyButton>
        </Box>
        <Box display="flex" flex={1} justifyContent="flex-end">
          <Box padding={4} paddingLeft={2} paddingRight={1}>
            <IconButton
              className={classes.refreshBtn}
              onClick={handleRefreshData}
            >
              <RefreshIcon className={classes.refreshIcon} />
            </IconButton>
          </Box>
          <Box padding={4} paddingRight={2} paddingLeft={1}>
            <PageSearch
              searchTerm={state.searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </Box>
        </Box>
      </FiltersWrapper>
      {state.prev.cooperative && state.prev.fiscalYear ? (
        <Container className={classes.offsetTop}>
          <SelectedInfo
            selectedCooperative={state.prev.cooperative}
            fiscalYear={state.prev.fiscalYear}
            backwardToSummaryPage={backwardToSummaryPage}
          />
          {generalData && <Tabs />}
        </Container>
      ) : (
        <InfoBox>{t('#info.selectanotherfiscalyear')}</InfoBox>
      )}
      <Backdrop loading={state.loading} />
      <DialogError error={state.error} initError={handleInitError} />
    </>
  );
};

export default GeneralPage;
