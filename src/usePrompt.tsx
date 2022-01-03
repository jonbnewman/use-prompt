import { ReactNode, useEffect, useState } from 'react';

export type PromptResponse = any;
export type RendererCallback = (prompt: {
  visible: boolean;
  resolve: (value: PromptResponse) => void;
  reject: (value?: PromptResponse) => void;
}) => ReactNode;

interface Prompt {
  state: 'pending' | 'hidden';
  renderer: RendererCallback;
  resolve: (value: PromptResponse) => void;
  reject: (value?: PromptResponse) => void;
}

export type UsePrompt = [
  ReactNode,
  (renderer: RendererCallback) => Promise<PromptResponse>,
  boolean
];

/**
 * Use prompt hook
 * @returns [prompt, showPrompt, visible]
 */
export function usePrompt(): UsePrompt {
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>({
    state: 'hidden',
    renderer: () => null,
    resolve: () => {},
    reject: () => {},
  });

  function resolve(value?: PromptResponse) {
    prompt.resolve(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }
  function reject(value?: PromptResponse) {
    prompt.reject(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }

  useEffect(() => setVisible(prompt.state === 'pending'), [prompt]);

  return [
    prompt.renderer({ visible, resolve, reject }),
    (renderer) =>
      new Promise<PromptResponse>((resolve, reject) =>
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
