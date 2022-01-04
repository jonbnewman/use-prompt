import React, { FC, HTMLAttributes } from 'react';
import usePrompt from '../../../src';

import Prompt from './Prompt';
import Message from './Message';
import Button from './Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {}

export const Prompter: FC<Props> = (storybookProps) => {
  const [prompt, showPrompt, visible] = usePrompt();

  async function triggerPrompt() {
    try {
      const resolveReason = await showPrompt((props) => {
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
        <Button
          variant="contained"
          onClick={triggerPrompt}
          disabled={visible}
          data-testid="show-prompt"
        >
          Show prompt
        </Button>
      </div>
      {prompt}
    </div>
  );
};
