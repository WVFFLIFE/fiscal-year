import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';

import ReactDOM from 'react-dom';
import WebFont from 'webfontloader';

import 'configs/i18n';
import 'assets/fonts/fonts.css';
import './index.css';

import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import theme from 'configs/theme';

declare global {
  interface Window {
    USER_LANGUAGE_CODE: number;
  }
}

WebFont.load({
  active: launch,
  inactive: launch,
  google: {
    families: ['Lato:300,400,500,700'],
  },
  custom: {
    families: ['Proxima Nova'],
  },
});

async function launch() {
  const App = (await import('./App')).default;

  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ThemeProvider>,
    document.getElementById('root')
  );
}
