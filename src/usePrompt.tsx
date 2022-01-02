import React, { ReactNode, useEffect, useState } from 'react';

type PromptOutlet = ReactNode;
type IsVisibleBoolean = boolean;
type ResolveReject = (value?: any) => void;

export type PromptComponent = (props: PromptProps) => JSX.Element | null;
export interface PromptProps {
  visible: boolean;
  resolve: ResolveReject;
  reject: ResolveReject;
}
export type ShowPromptCallback = (
  renderer: (props: {
    visible: boolean;
    resolve: (value?: any) => void;
    reject: (value?: any) => void;
  }) => JSX.Element
) => Promise<unknown>;

interface NoPrompt {
  state: 'hidden';
  renderer: PromptComponent;
}
interface PendingPrompt {
  state: 'pending';
  renderer: PromptComponent;
  resolve: ResolveReject;
  reject: ResolveReject;
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
