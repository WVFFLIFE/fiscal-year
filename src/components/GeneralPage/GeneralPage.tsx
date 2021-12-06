import { useContext } from 'react';
import { GeneralCtx } from 'contexts/GeneralContext';
import useGeneralPageData from './useGeneralPageData';
import { useTranslation } from 'react-i18next';

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
    state: { generalInformation },
  } = useContext(GeneralCtx);
  const {
    state,
    isDisabledApplyButton,
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
      {state.prev.cooperative && state.prev.fiscalYear ? (
        <Container className={classes.offsetTop}>
          <SelectedInfo
            selectedCooperative={state.prev.cooperative}
            fiscalYear={state.prev.fiscalYear}
          />
          {generalInformation.data && (
            <Tabs
              DocumentsTabProps={{ fiscalYearId: generalInformation.data.Id }}
              GeneralTabProps={{
                coopId: generalInformation.data.CooperativeId,
                auditings: generalInformation.data.Auditings,
                fiscalYearId: generalInformation.data.Id,
                isClosed: !!generalInformation.data.IsClosed,
                meetings: generalInformation.data.Meetings,
                generalInformationList: [
                  {
                    Id: generalInformation.data.CooperativeId,
                    Name: generalInformation.data.CooperativeName,
                    StartDate: generalInformation.data.StartDate,
                    EndDate: generalInformation.data.EndDate,
                    IsClosed: !!generalInformation.data.IsClosed,
                  },
                ],
              }}
            />
          )}
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
