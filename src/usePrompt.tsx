import { ReactNode, useEffect, useState } from 'react';

export type Response = any;
export type Renderer = (prompt: RenderParams) => ReactNode;

export interface RenderParams {
  visible: boolean;
  resolve: (value: Response) => void;
  reject: (value?: Response) => void;
}

interface Prompt {
  state: 'pending' | 'hidden';
  renderer: Renderer;
  resolve: (value: Response) => void;
  reject: (value?: Response) => void;
}

/**
 * Use prompt hook
 * @returns [prompt, showPrompt, visible]
 */
export function usePrompt(): [
  ReactNode,
  (renderer: Renderer) => Promise<Response>,
  boolean
] {
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState<Prompt>({
    state: 'hidden',
    renderer: () => null,
    resolve: () => {},
    reject: () => {},
  });

  function resolve(value?: Response) {
    prompt.resolve(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }
  function reject(value?: Response) {
    prompt.reject(value);
    setPrompt({ ...prompt, state: 'hidden' });
  }

  useEffect(() => {
    const setVisibleTimeout = setTimeout(() => {
      setVisible(prompt.state === 'pending');
    });
    return () => clearTimeout(setVisibleTimeout);
  }, [prompt]);

  return [
    prompt.renderer({ visible, resolve, reject }),
    (renderer) =>
      new Promise<Response>((resolve, reject) =>
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
