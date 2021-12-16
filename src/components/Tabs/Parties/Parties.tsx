import usePartiesData from './usePartiesData';
import { PartyRoleType } from 'models';

import Box from '@mui/material/Box';
import DialogError from 'components/DialogError';
import PartySection from './PartySection';
import { LoadingContainer } from 'components/Styled';
import CircularProgress from '@mui/material/CircularProgress';

import { useStyles } from './style';

const titlesDict = {
  [PartyRoleType.Auditing]: '#tab.parties.party.auditing',
  [PartyRoleType.BoardOfDirectors]: '#tab.parties.party.boardsofdirectors',
  [PartyRoleType.BuildingMaintenanceAndCleaning]:
    '#tab.parties.party.buildingmaintenance',
  [PartyRoleType.OtherParties]: '#tab.parties.party.otherparties',
  [PartyRoleType.PropertyManagement]: '#tab.parties.party.propertymanagement',
};

const Parties = () => {
  const classes = useStyles();
  const { loading, error, sections, handleInitError } = usePartiesData();

  if (loading) {
    return (
      <LoadingContainer>
        <CircularProgress className={classes.loader} size={40} />
      </LoadingContainer>
    );
  }

  return (
    <Box>
      {sections.map((section) => (
        <PartySection
          key={section.type}
          parties={section.list}
          title={titlesDict[section.type]}
          expanded
        />
      ))}
      <DialogError error={error} initError={handleInitError} />
    </Box>
  );
};

export default Parties;
