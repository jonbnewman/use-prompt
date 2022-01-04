import { ReactNode, useEffect, useState } from 'react';

export type Response = any;
export type Renderer = (props: RenderProps) => ReactNode;
export interface RenderProps {
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
 * React hook to create a prompt.
 *
 * Options:
 * * **persist** - if *true*, the resolved/rejected prompts will remain in the DOM
 *
 * Returns an Array containing:
 * * **prompt** - the rendered output
 * * **showPrompt** - callback used to trigger/open the prompt
 * * **visible** - boolean indicating if the prompt is displayed currently
 * @returns [prompt, showPrompt, visible]
 */
export function usePrompt(options: {
  persist?: boolean;
}): [ReactNode, (renderer: Renderer) => Promise<Response>, boolean] {
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
    options.persist || visible
      ? prompt.renderer({ visible, resolve, reject })
      : null,
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
