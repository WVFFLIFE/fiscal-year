import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Services from 'services';
import { getLangString } from 'utils';

import FiscalYear from 'tabs/FiscalYear';
import { RootContainer } from 'components/Styled';

const App = () => {
  const { i18n } = useTranslation();

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const res = await Services.getSettings();

        if (res.IsSuccess) {
          i18n.changeLanguage(getLangString(res.Settings.LanguageCode));
        } else {
          throw new Error(res.Message);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchSettings();
  }, []);

  return (
    <RootContainer>
      <FiscalYear />
    </RootContainer>
  );
};

export default App;
