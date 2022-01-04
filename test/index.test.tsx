import React from 'react';
import '@testing-library/jest-dom';
import { render, waitFor, cleanup, fireEvent } from '@testing-library/react';

import { Prompter } from '../stories/Prompter.stories';
import { MultiPrompter } from '../stories/MultiPrompter.stories';

describe('Modal Prompt', () => {
  afterEach(() => {
    cleanup();
  });

  it('can show a prompt', async () => {
    const { queryByText, getByTestId } = render(<Prompter />);

    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
    });

    const button = getByTestId('show-prompt');
    expect(button).not.toHaveAttribute('disabled');

    fireEvent.click(button);
    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
      expect(button).toHaveAttribute('disabled');
    });
  });

  it('can resolve a prompt', async () => {
    const { queryByText, getByTestId } = render(<Prompter />);

    const button = getByTestId('show-prompt');
    expect(button).not.toHaveAttribute('disabled');

    fireEvent.click(button);
    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
      expect(button).toHaveAttribute('disabled');
    });

    fireEvent.click(getByTestId('resolve-button'));
    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
      expect(button).not.toHaveAttribute('disabled');
    });
  });

  it('can reject a prompt', async () => {
    const { queryByText, getByTestId } = render(<Prompter />);

    const button = getByTestId('show-prompt');
    expect(button).not.toHaveAttribute('disabled');

    fireEvent.click(button);
    await waitFor(() => {
      expect(queryByText('Prompt is currently shown')).toBeInTheDocument();
      expect(button).toHaveAttribute('disabled');
    });

    fireEvent.click(getByTestId('reject-button'));
    await waitFor(() => {
      expect(queryByText('Prompt is currently hidden')).toBeInTheDocument();
      expect(button).not.toHaveAttribute('disabled');
    });
  });

  it('can render multiple prompts', async () => {
    const { queryByText, getByTestId } = render(<MultiPrompter />);

    const button = getByTestId('show-prompts');
    expect(button).not.toHaveAttribute('disabled');

    fireEvent.click(button);
    await waitFor(() => {
      expect(button).toHaveAttribute('disabled');
      expect(queryByText('Prompt 0')).toBeInTheDocument();
      expect(queryByText('Prompt 1')).not.toBeInTheDocument();
      expect(queryByText('Prompt 2')).not.toBeInTheDocument();
    });

    fireEvent.click(getByTestId('resolve-button0'));
    await waitFor(() => {
      expect(button).toHaveAttribute('disabled');
      expect(queryByText('Prompt 0')).not.toBeVisible();
      expect(queryByText('Prompt 1')).toBeInTheDocument();
      expect(queryByText('Prompt 2')).not.toBeInTheDocument();
    });

    fireEvent.click(getByTestId('resolve-button1'));
    await waitFor(() => {
      expect(button).toHaveAttribute('disabled');
      expect(queryByText('Prompt 0')).not.toBeVisible();
      expect(queryByText('Prompt 1')).not.toBeVisible();
      expect(queryByText('Prompt 2')).toBeInTheDocument();
    });

    fireEvent.click(getByTestId('resolve-button2'));
    await waitFor(() => {
      expect(button).not.toHaveAttribute('disabled');
    });
  });
});
