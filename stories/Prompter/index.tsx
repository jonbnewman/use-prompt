import React, { FC, HTMLAttributes, ReactNode } from 'react';
import usePrompt from '../../src';
import Prompt from '../../src/prompts/Prompt';
import MuiPrompt from '../../src/prompts/MuiPrompt';

import Message from './Message';
import Button from './Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  message?: ReactNode;
  resolveLabel?: string;
  rejectLabel?: string;
  escapable?: boolean;
  type?: 'modal' | 'inline';
  component: 'standard' | 'mui';
}

const promptComponents = {
  standard: Prompt,
  mui: MuiPrompt,
};

export const Prompter: FC<Props> = ({ component, ...storybookProps }) => {
  const [prompt, showPrompt, visible] = usePrompt();

  async function triggerPrompt() {
    try {
      const resolveReason = await showPrompt((props) => {
        const Prompt = promptComponents[component];
        return <Prompt {...props} {...storybookProps} />;
      });
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
      {prompt}
    </div>
  );
};
