import React, { FC, HTMLAttributes, useState } from 'react';
import usePrompt from '../../../src';

import Prompt from './Prompt';
import Message from './Message';
import Button from './Button';
import Output from './Output';

export interface Props extends HTMLAttributes<HTMLDivElement> {
  clearable?: boolean;
}

export const Prompter: FC<Props> = ({ clearable = false }) => {
  const [prompt, showPrompt, visible, clear] = usePrompt();
  const [resolveReason, setResolveReason] = useState<null | string>(null);
  const [rejectReason, setRejectReason] = useState<null | string>(null);

  async function triggerPrompt() {
    setResolveReason(null);
    setRejectReason(null);
    try {
      const resolveReason = await showPrompt<string>((props) => {
        return <Prompt {...props} />;
      });
      setResolveReason(resolveReason);
    } catch (rejectReason) {
      setRejectReason(rejectReason as string);
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
          onClick={visible ? clear : triggerPrompt}
          disabled={visible && !clearable}
          data-testid="show-prompt"
        >
          Show prompt
        </Button>
      </div>
      {prompt}
      {resolveReason !== null && (
        <Output data-testid="resolve-reason">{resolveReason}</Output>
      )}
      {rejectReason !== null && (
        <Output data-testid="reject-reason">{rejectReason}</Output>
      )}
    </div>
  );
};
