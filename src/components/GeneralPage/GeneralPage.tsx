import useGeneralPageData from './useGeneralPageData';
import { useTranslation } from 'react-i18next';
import useSelectFiscalYear from 'hooks/useSelectFiscalYear';

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

const GeneralPage: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const fiscalYear = useSelectFiscalYear();
  const {
    generalPageData,
    backwardToSummaryPage,
    handleRefreshData,
    handleInitError,
    handleChangeFiscalYear,
    handleChangeSearchTerm,
    handleChangeSelectedCooperatives,
    handleApplyClick,
  } = useGeneralPageData();

  const { filters, loading, error } = generalPageData;

  return (
    <>
      <FiltersWrapper>
        <Box padding={4} paddingX={2}>
          <CooperativesPicker
            cooperatives={filters.cooperatives.list}
            selectedCooperatives={
              filters.cooperatives.next ? [filters.cooperatives.next] : []
            }
            onSelectCooperatives={handleChangeSelectedCooperatives}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <FiscalYearPicker
            value={filters.fiscalYears.next}
            options={filters.fiscalYears.list}
            onSelectFiscalYear={handleChangeFiscalYear}
          />
        </Box>
        <Box padding={4} paddingX={2}>
          <ApplyButton
            disabled={!!!filters.fiscalYears.next}
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
              searchTerm={filters.searchTerm}
              onChange={handleChangeSearchTerm}
            />
          </Box>
        </Box>
      </FiltersWrapper>
      {filters.cooperatives.current && filters.fiscalYears.current ? (
        <Container className={classes.offsetTop}>
          <SelectedInfo
            selectedCooperative={filters.cooperatives.current}
            fiscalYear={filters.fiscalYears.current}
            backwardToSummaryPage={backwardToSummaryPage}
          />
          {fiscalYear && <Tabs />}
        </Container>
      ) : (
        <InfoBox>{t('#info.selectanotherfiscalyear')}</InfoBox>
      )}
      <Backdrop loading={loading} />
      <DialogError error={error} initError={handleInitError} />
    </>
  );
};

export default GeneralPage;
