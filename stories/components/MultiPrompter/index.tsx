import React, { FC, HTMLAttributes } from 'react';
import usePrompt from '../../../src';
import { Prompt } from '../Prompt';

import Button from './Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: 'modal' | 'inline';
}

export const MultiPrompter: FC<Props> = (storybookProps) => {
  const prompts = [usePrompt(), usePrompt(), usePrompt()];

  function triggerPrompts() {
    prompts.forEach(async ([, showPrompt], index) => {
      try {
        await showPrompt((props) => (
          <Prompt {...props} type="inline" {...storybookProps} index={index} />
        ));
      } catch (reject) {
        // do nothing
      }
    });
  }

  return (
    <>
      <div>
        <Button
          variant="contained"
          onClick={triggerPrompts}
          data-testid="show-prompt"
        >
          Show prompt
        </Button>
      </div>
      {prompt}
    </>
  );
};
