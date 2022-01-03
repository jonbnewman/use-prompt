import React from 'react';
import * as ReactDOM from 'react-dom';
import '@testing-library/jest-dom';
import {
  render,
  waitFor,
  cleanup,
  within,
  fireEvent,
} from '@testing-library/react';

import { StandardModalPrompt } from '../stories/Prompter.stories';

describe('Modal Prompt', () => {
  afterEach(() => {
    cleanup();
  });

  it('can show a prompt', async () => {
    const { queryByText, getByTestId } = render(<StandardModalPrompt />);

    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
      expect(queryByText('Show prompt')).toBeInTheDocument();
    });

    const showButton = getByTestId('show-prompt');
    fireEvent.click(showButton);

    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
    });
  });

  it('can resolve a prompt', async () => {
    const { queryByText, getByTestId } = render(<StandardModalPrompt />);

    fireEvent.click(getByTestId('show-prompt'));

    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('resolve-button'));

    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
    });
  });

  it('can reject a prompt', async () => {
    const { queryByText, getByTestId } = render(<StandardModalPrompt />);

    fireEvent.click(getByTestId('show-prompt'));

    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('reject-button'));

    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
    });
  });
});
