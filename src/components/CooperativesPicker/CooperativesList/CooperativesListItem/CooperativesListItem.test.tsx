import { MockCooperative } from 'models';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { enhancedRender } from 'test-utils';

import { cooperatives } from 'mock';

import CooperativesListItem, {
  CooperativesListItemProps,
} from './CooperativesListItem';

describe('<CooperativesListItem />', () => {
  const state: {
    selected: MockCooperative[];
  } = {
    selected: [],
  };

  const props: CooperativesListItemProps = {
    cooperative: cooperatives[0],
    selected: false,
    onClick: (coop: MockCooperative, isSelected: boolean) => {
      state.selected = isSelected
        ? state.selected.filter((prev) => prev.Id !== coop.Id)
        : state.selected.concat(coop);
    },
  };

  beforeEach(() => {
    enhancedRender(<CooperativesListItem {...props} />);
  });

  afterEach(() => {
    state.selected = [];
  });

  it('shows cooperative name', () => {
    expect(
      screen.getByText('Asunto Oy Kulpinkartano II Rovaniemen mlk')
    ).toBeInTheDocument();
  });

  it('shows cooperative ending date', () => {
    expect(screen.getByText('31.10.2020')).toBeInTheDocument();
  });
});
