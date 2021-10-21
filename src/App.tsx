import { useCallback, useState, SyntheticEvent } from 'react';

import SideBar from 'components/SideBar';
import { RootContainer } from 'components/Styled';
import FiscalYear from 'tabs/FiscalYear';

const App = () => {
  const [selectedTab, setSelectedTab] = useState('fiscal-year');

  const handleChangeCurrentTab = useCallback(
    (e: SyntheticEvent, tab: string) => {
      setSelectedTab(tab);
    },
    []
  );

  return (
    <>
      <SideBar selectedTab={selectedTab} onChangeTab={handleChangeCurrentTab} />
      <RootContainer>
        {selectedTab === 'fiscal-year' && <FiscalYear />}
      </RootContainer>
    </>
  );
};

export default App;
