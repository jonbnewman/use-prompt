import { ReactNode, useEffect, useState } from 'react';

export type Response = any;
export type Renderer = (props: RenderProps) => ReactNode;

export interface RenderProps {
  visible: boolean;
  resolve: (value: Response) => void;
  reject: (value?: Response) => void;
}

export type RenderedPrompt = ReactNode;
export type ShowPrompt = (renderer: Renderer) => Promise<Response>;
export type IsVisible = boolean;
export type ClearPrompt = () => void;

enum STATE {
  HIDDEN,
  OPENING,
  VISIBLE,
}

interface Prompt {
  state: STATE;
  renderer: Renderer;
  resolve: (value: Response) => void;
  reject: (value?: Response) => void;
}

const shouldRender = [STATE.OPENING, STATE.VISIBLE];
const nullPrompt: Prompt = {
  state: STATE.HIDDEN,
  renderer: () => null,
  resolve: () => {},
  reject: () => {},
};

/**
 * React hook to create a prompt.
 *
 * Options:
 * * **persist** - if *true*, resolved/rejected prompts will remain in the DOM
 *
 * Returns an Array containing:
 * * **prompt** - the rendered output
 * * **showPrompt** - callback used to trigger/open the prompt
 * * **visible** - boolean indicating if the prompt is displayed currently
 * * **clearPrompt** - clear/reset and remove the prompt
 * @param options Options object
 * @returns [prompt, showPrompt, visible, clearPrompt]
 */
export function usePrompt(options?: {
  persist?: boolean;
}): [RenderedPrompt, ShowPrompt, IsVisible, ClearPrompt] {
  const [prompt, setPrompt] = useState<Prompt>(nullPrompt);
  const rendered = options?.persist || shouldRender.includes(prompt.state);
  const visible = prompt.state === STATE.VISIBLE;

  function resolve(value: Response) {
    setPrompt({ ...prompt, state: STATE.HIDDEN });
    prompt.resolve(value);
  }
  function reject(value?: Response) {
    setPrompt({ ...prompt, state: STATE.HIDDEN });
    prompt.reject(value);
  }

  useEffect(() => {
    if (prompt.state === STATE.OPENING) {
      setPrompt({ ...prompt, state: STATE.VISIBLE });
    }
  }, [prompt]);

  return [
    rendered ? prompt.renderer({ visible, resolve, reject }) : null,
    (renderer) =>
      new Promise<Response>((resolve, reject) =>
        setPrompt({
          state: STATE.OPENING,
          renderer,
          resolve,
          reject,
        })
      ),
    visible,
    () => setPrompt(nullPrompt),
  ];
}
