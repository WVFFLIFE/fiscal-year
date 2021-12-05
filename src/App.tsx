import { GeneralProvider } from 'contexts/GeneralContext';
import FiscalYear from 'tabs/FiscalYear';
import { RootContainer } from 'components/Styled';

const App = () => {
  return (
    <GeneralProvider>
      <RootContainer>
        <FiscalYear />
      </RootContainer>
    </GeneralProvider>
  );
};

export default App;
