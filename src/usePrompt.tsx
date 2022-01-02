import React, { ReactNode, useEffect, useState } from 'react';

type PromptOutlet = ReactNode;
type IsVisibleBoolean = boolean;
type ValueCallback = (value?: any) => void;

type Renderer = (props: {
  visible: boolean;
  resolve: ValueCallback;
  reject: ValueCallback;
}) => ReactNode;

interface Prompt {
  state: 'pending' | 'hidden';
  renderer: Renderer;
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
  (renderer: Renderer) => Promise<unknown>,
  IsVisibleBoolean
] {
  const [prompt, setPrompt] = useState<Prompt>({
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
