import { ReactElement } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { queries, Queries } from '@testing-library/dom';

import theme from 'configs/theme';

const provideTheme = (ui: ReactElement): ReactElement => {
  return <ThemeProvider theme={theme}>{ui}</ThemeProvider>;
};

export function enhancedRender<
  Q extends Queries = typeof queries,
  Container extends Element | DocumentFragment = HTMLElement
>(
  ui: React.ReactElement,
  options: RenderOptions<Q, Container>
): RenderResult<Q, Container>;
export function enhancedRender(
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'queries'>
): RenderResult;
export function enhancedRender(ui: any, options: any): any {
  return render(provideTheme(ui), options);
}
