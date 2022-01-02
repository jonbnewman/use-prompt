import React, { ReactNode, useEffect, useState } from 'react';

type PromptOutlet = ReactNode;
type IsVisibleBoolean = boolean;
type ValueCallback = (value?: any) => void;

export type PromptComponent = (props: {
  visible: boolean;
  resolve: ValueCallback;
  reject: ValueCallback;
}) => JSX.Element | null;

export type ShowPromptCallback = (
  renderer: (props: {
    visible: boolean;
    resolve: ValueCallback;
    reject: ValueCallback;
  }) => JSX.Element
) => Promise<unknown>;

interface NoPrompt {
  state: 'hidden';
  renderer: PromptComponent;
}
interface PendingPrompt {
  state: 'pending';
  renderer: PromptComponent;
  resolve: ValueCallback;
  reject: ValueCallback;
}

/**
 * Use prompt hook
 * @param Prompt The Prompt component to display
 * @returns [outlet, showPrompt, visible]
 */
export default function usePrompt(): [
  PromptOutlet,
  ShowPromptCallback,
  IsVisibleBoolean
] {
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
    (renderer) =>
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
