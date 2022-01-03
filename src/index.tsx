import React, { ReactNode, useEffect, useState } from 'react';

type PromptResponse = any;
type ValueCallback = (value?: PromptResponse) => void;
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
 * @returns [prompt, showPrompt, visible]
 */
export default function usePrompt(): [
  ReactNode,
  (renderer: Renderer) => Promise<PromptResponse>,
  boolean
] {
  const [prompt, setPrompt] = useState<Prompt>({
    state: 'hidden',
    renderer: () => null,
    resolve: () => {},
    reject: () => {},
  });

  const [visible, setVisible] = useState(false);
  useEffect(() => setVisible(prompt.state === 'pending'), [prompt]);

  function resolve(value?: PromptResponse) {
    prompt.resolve(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }
  function reject(value?: PromptResponse) {
    prompt.reject(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }

  return [
    prompt.renderer({ visible, resolve, reject }),
    (renderer) =>
      new Promise((resolve, reject) =>
        setPrompt({
          state: 'pending',
          renderer,
          resolve,
          reject,
        })
      ),
    visible,
  ];
}
