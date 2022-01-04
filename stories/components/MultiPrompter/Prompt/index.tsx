import React, { MouseEvent, ReactNode } from 'react';
import Button from '@mui/material/Button';

import Container from './Container';
import Dialog from './Dialog';
import Message from './Message';
import Buttons from './Buttons';

export interface PromptProps {
  visible: boolean;
  resolve: (value?: any) => void;
  reject: (value?: any) => void;
  message?: ReactNode;
  resolveLabel?: string;
  rejectLabel?: string;
  index?: number;
}

function stopEvent(event: MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}

export default function Prompt(props: PromptProps) {
  const {
    visible,
    resolve,
    reject,
    message = 'Are you sure?',
    resolveLabel = 'Confirm',
    rejectLabel = 'Cancel',
    index,
  } = props;

  return (
    <Container onClick={reject} visible={visible}>
      <Dialog onClick={stopEvent} visible={visible}>
        <div>Prompt {index}</div>
        <Message>{message}</Message>
        <Buttons>
          <Button
            onClick={reject}
            variant="contained"
            disableElevation
            data-testid={`reject-button${index}`}
          >
            {rejectLabel}
          </Button>
          <Button
            onClick={resolve}
            variant="contained"
            disableElevation
            data-testid={`resolve-button${index}`}
          >
            {resolveLabel}
          </Button>
        </Buttons>
      </Dialog>
    </Container>
  );
}
