import usePartiesData from './usePartiesData';
import { PartyRoleType } from 'models';

import Box from '@mui/material/Box';
import DialogError from 'components/DialogError';
import PartySection from './PartySection';
import Loader from 'components/Loader';

const titlesDict = {
  [PartyRoleType.Auditing]: '#tab.parties.party.auditing',
  [PartyRoleType.BoardOfDirectors]: '#tab.parties.party.boardsofdirectors',
  [PartyRoleType.BuildingMaintenanceAndCleaning]:
    '#tab.parties.party.buildingmaintenance',
  [PartyRoleType.OtherParties]: '#tab.parties.party.otherparties',
  [PartyRoleType.PropertyManagement]: '#tab.parties.party.propertymanagement',
};

const Parties = () => {
  const { loading, error, sections, handleInitError } = usePartiesData();

  if (loading) return <Loader />;

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
