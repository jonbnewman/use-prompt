import React, { FC, Fragment, HTMLAttributes } from 'react';
import usePrompt from '../../../src';
import { Prompt } from '../Prompt';

import Button from './Button';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  type?: 'modal' | 'inline';
}

export const MultiPrompter: FC<Props> = (storybookProps) => {
  const prompts = [usePrompt(), usePrompt(), usePrompt()];

  async function triggerPrompts() {
    for (let x = 0; x < prompts.length; x++) {
      const [, showPrompt] = prompts[x];
      try {
        await showPrompt((props) => (
          <Prompt {...props} type="inline" {...storybookProps} index={x} />
        ));
      } catch (reject) {
        // do nothing
      }
    }
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
      {prompts.map(([prompt], index) => (
        <Fragment key={index}>{prompt}</Fragment>
      ))}
    </>
  );
};
