import React, { ReactNode, useState } from 'react';
import ModalPrompt from '../prompts/modal';

export interface Prompt {
  resolve: (value: any) => void;
  reject: (reason?: any) => void;
  props: any;
}

export type PromptComponent = (props: PromptProps) => JSX.Element | null;

export interface PromptProps {
  visible: boolean;
  props: any;
  resolve: () => void;
  reject: () => void;
}

/**
 * Use prompt hook
 * @param Prompt The Prompt component to display
 * @returns [prompt, showPrompt, visible]
 */
export default function usePrompt(
  Prompt: PromptComponent = ModalPrompt
): [ReactNode, (props?: any) => Promise<any>, boolean] {
  const [prompt, setPrompt] = useState<null | Prompt>(null);
  const visible = Boolean(prompt);

  async function resolve(value?: any) {
    if (prompt) {
      prompt.resolve(value);
      setPrompt(null);
    }
  }

  async function reject(value?: any) {
    if (prompt) {
      prompt.reject(value);
      setPrompt(null);
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
      new Promise((resolve, reject) => setPrompt({ resolve, reject, props })),
    visible,
  ];
}
