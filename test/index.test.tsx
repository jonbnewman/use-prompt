import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';

import { ExamplePrompt } from '../stories/ExamplePrompter.stories';

describe('Modal Prompt', () => {
  afterEach(() => {
    cleanup();
  });

  it('can show a prompt', async () => {
    const { queryByText, getByTestId } = render(<ExamplePrompt />);

    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('show-prompt'));
    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
    });
  });

  it('can resolve a prompt', async () => {
    const { queryByText, getByTestId } = render(<ExamplePrompt />);

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
    const { queryByText, getByTestId } = render(<ExamplePrompt />);

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
