import React, { FC, HTMLAttributes, ReactChild } from 'react';
import usePrompt from '../hooks/usePrompt';

import Message from './Message';
import Button from './Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  children?: ReactChild;
}

export const Prompter: FC<Props> = () => {
  const [prompt, showPrompt, visible] = usePrompt();

  async function triggerPrompt() {
    try {
      const resolveReason = await showPrompt();
      console.info('resolveReason', resolveReason);
    } catch (rejectReason) {
      console.info('rejectReason', rejectReason);
    }
  }

  return (
    <div>
      <Message>
        {visible ? 'Prompt is currently shown' : 'Prompt is currently hidden'}
      </Message>
      <Button variant="contained" onClick={triggerPrompt} disabled={visible}>
        Show prompt
      </Button>
      {prompt}
    </div>
  );
};
