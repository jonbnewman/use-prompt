import React, { ReactNode, useState } from 'react';
import ModalPrompt from './Prompt';

export type PromptComponent = (props: PromptProps) => JSX.Element | null;

export interface PromptProps {
  visible: boolean;
  props: any;
  resolve: () => void;
  reject: () => void;
}

interface PendingPrompt {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  props: any;
  state: 'pending';
}

interface NoPrompt {
  props?: any;
  state: 'hidden';
}

const noPrompt: NoPrompt = {
  state: 'hidden',
};

/**
 * Use prompt hook
 * @param Prompt The Prompt component to display
 * @returns [prompt, showPrompt, visible]
 */
export default function usePrompt(
  Prompt: PromptComponent = ModalPrompt
): [ReactNode, (props?: any) => Promise<any>, boolean] {
  const [prompt, setPrompt] = useState<NoPrompt | PendingPrompt>(noPrompt);
  const visible = prompt.state === 'pending';

  function hidePrompt() {
    setPrompt({ ...prompt, ...noPrompt });
  }

  function resolve(value?: any) {
    if (prompt.state === 'pending') {
      prompt.resolve(value);
      hidePrompt();
    }
  }

  function reject(value?: any) {
    if (prompt.state === 'pending') {
      prompt.reject(value);
      hidePrompt();
    }
  }

  return [
    <Prompt
      resolve={resolve}
      reject={reject}
      visible={visible}
      {...prompt?.props}
    />,
    (props?: any) =>
      new Promise((resolve, reject) =>
        setPrompt({ resolve, reject, props, state: 'pending' })
      ),
    visible,
  ];
}
