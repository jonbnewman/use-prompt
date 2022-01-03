import React, { MouseEvent, ReactNode } from 'react';
import Modal from '@mui/material/Modal';

import './style.css';

export interface PromptProps {
  type?: 'modal' | 'inline';
  visible: boolean;
  resolve: (value?: any) => void;
  reject: (value?: any) => void;
  message?: ReactNode;
  resolveLabel?: string;
  rejectLabel?: string;
  escapable?: boolean;
  index?: number;
}

function stopEvent(event: MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}

export function Prompt(props: PromptProps) {
  const {
    visible,
    resolve,
    reject,
    escapable = true,
    message = 'Are you sure?',
    resolveLabel = 'Confirm',
    rejectLabel = 'Cancel',
    index,
  } = props;

  return (
    <Modal open={visible} onClose={reject} disableEscapeKeyDown={!escapable}>
      <div className="prompt-dialog" onClick={stopEvent}>
        {index ? <div>Prompt {index}</div> : null}
        <div className="prompt-message">{message}</div>
        <div className="prompt-buttons">
          <button onClick={reject} data-testid="reject-button">
            {rejectLabel}
          </button>
          <button onClick={resolve} data-testid="resolve-button">
            {resolveLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
}
