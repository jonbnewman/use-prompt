import React, { FC, HTMLAttributes, ReactNode } from 'react';
import usePrompt from '../../src';
import Prompt from '../../src/Prompt';

import Message from './Message';
import Button from './Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  message?: ReactNode;
  resolveLabel?: string;
  rejectLabel?: string;
  escapable?: boolean;
  type?: 'modal' | 'inline';
}

export const Prompter: FC<Props> = (storybookProps) => {
  const [outlet, showPrompt, visible] = usePrompt();

  async function triggerPrompt() {
    try {
      const resolveReason = await showPrompt((props) => (
        <Prompt {...props} {...storybookProps} />
      ));
    } catch (rejectReason) {
      // do nothing
    }
  }

  return (
    <div>
      <Message color={visible ? 'red' : 'slategray'}>
        {visible ? 'Prompt is currently shown' : 'Prompt is currently hidden'}
      </Message>
      <div>
        <Button variant="contained" onClick={triggerPrompt} disabled={visible}>
          Show prompt
        </Button>
      </div>
      {outlet}
    </div>
  );
};
