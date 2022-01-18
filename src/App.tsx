import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import useAppDispatch from 'hooks/useAppDispatch';
import useStateSelector from 'hooks/useStateSelector';

import { fetchSettings } from 'features/settingsSlice';

import { getLangString } from 'utils';

import FiscalYear from 'tabs/FiscalYear';
import { RootContainer } from 'components/Styled';

const App = () => {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();

  const languageCode = useStateSelector((state) => state.settings.languageCode);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);

  useEffect(() => {
    i18n.changeLanguage(getLangString(languageCode));
  }, [languageCode, i18n]);

  return (
    <RootContainer>
      <FiscalYear />
    </RootContainer>
  );
};

export default App;
