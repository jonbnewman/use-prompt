import React, { MouseEvent, ReactNode } from 'react';
import Button from '@mui/material/Button';

import Modal from './Modal';
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
  } = props;

  return (
    <Modal onClick={reject} open={visible}>
      <Dialog onClick={stopEvent}>
        <Message>{message}</Message>
        <Buttons>
          <Button
            onClick={() => reject('clicked reject-button')}
            variant="contained"
            disableElevation
            data-testid="reject-button"
          >
            {rejectLabel}
          </Button>
          <Button
            onClick={() => resolve('clicked resolve-button')}
            variant="contained"
            disableElevation
            data-testid="resolve-button"
          >
            {resolveLabel}
          </Button>
        </Buttons>
      </Dialog>
    </Modal>
  );
}
