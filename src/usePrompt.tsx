import React, { ReactNode, useEffect, useState } from 'react';

type PromptOutlet = ReactNode;
type IsVisibleBoolean = boolean;
type ValueCallback = (value?: any) => void;

type PromptComponent = (props: {
  visible: boolean;
  resolve: ValueCallback;
  reject: ValueCallback;
}) => JSX.Element | null;

interface PromptState {
  renderer: PromptComponent;
  resolve: ValueCallback;
  reject: ValueCallback;
}
interface NoPrompt extends PromptState {
  state: 'hidden';
}
interface PendingPrompt extends PromptState {
  state: 'pending';
}

/**
 * Use prompt hook
 * @param Prompt The Prompt component to display
 * @returns [outlet, showPrompt, visible]
 */
export default function usePrompt(): [
  PromptOutlet,
  (
    renderer: (props: {
      visible: boolean;
      resolve: ValueCallback;
      reject: ValueCallback;
    }) => JSX.Element
  ) => Promise<unknown>,
  IsVisibleBoolean
] {
  const [prompt, setPrompt] = useState<NoPrompt | PendingPrompt>({
    state: 'hidden',
    resolve: () => {},
    reject: () => {},
    renderer: () => null,
  });

  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(prompt.state === 'pending'), [prompt]);

  function resolve(value?: any) {
    prompt.resolve(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }
  function reject(value?: any) {
    prompt.reject(value);
    setPrompt({ ...prompt, state: 'hidden' });
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
