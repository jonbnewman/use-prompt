import React, { ReactNode, useEffect, useState } from 'react';
import ModalPrompt from './Prompt';

export type PromptComponent = (props: PromptProps) => JSX.Element | null;

export interface PromptProps {
  visible: boolean;
  resolve: () => void;
  reject: () => void;
}

interface PendingPrompt {
  state: 'pending';
  renderer: PromptComponent;
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
}

interface NoPrompt {
  state: 'hidden';
  renderer: PromptComponent;
}

export type RenderCallback = (
  renderer: (props: PromptProps) => JSX.Element
) => Promise<unknown>;

/**
 * Use prompt hook
 * @param Prompt The Prompt component to display
 * @returns [prompt, showPrompt, visible]
 */
export default function usePrompt(
  Prompt: PromptComponent = ModalPrompt
): [ReactNode, RenderCallback, boolean] {
  const [prompt, setPrompt] = useState<NoPrompt | PendingPrompt>({
    state: 'hidden',
    renderer: () => null,
  });

  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (prompt.state === 'pending') {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [prompt]);

  function resolve(value?: any) {
    if (prompt.state === 'pending') {
      prompt.resolve(value);
      setPrompt({ ...prompt, state: 'hidden' });
    }
  }

  function reject(value?: any) {
    if (prompt.state === 'pending') {
      prompt.reject(value);
      setPrompt({ ...prompt, state: 'hidden' });
    }
  }

  return [
    prompt.renderer({ visible, resolve, reject }),
    (renderer: (props: PromptProps) => JSX.Element) =>
      new Promise((resolve, reject) =>
        setPrompt({
          resolve,
          reject,
          renderer,
          state: 'pending',
        })
      ),
    visible,
  ];
}
