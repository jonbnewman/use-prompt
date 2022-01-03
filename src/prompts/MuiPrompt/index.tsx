import React, { MouseEvent, ReactNode } from 'react';
import Modal from '@mui/material/Modal';

import './style.css';

export interface MuiPromptProps {
  type?: 'modal' | 'inline';
  visible: boolean;
  resolve: (value?: any) => void;
  reject: (value?: any) => void;
  message?: ReactNode;
  resolveLabel?: string;
  rejectLabel?: string;
  escapable?: boolean;
}

function stopEvent(event: MouseEvent<HTMLDivElement>) {
  event.stopPropagation();
}

export function MuiPrompt(props: MuiPromptProps) {
  const {
    visible,
    resolve,
    reject,
    escapable = true,
    message = 'Are you sure?',
    resolveLabel = 'Confirm',
    rejectLabel = 'Cancel',
  } = props;

  return (
    <Modal open={visible} onClose={reject} disableEscapeKeyDown={!escapable}>
      <div className="prompt-dialog" onClick={stopEvent}>
        <div className="prompt-message">{message}</div>
        <div className="prompt-buttons">
          <button onClick={reject}>{rejectLabel}</button>
          <button onClick={resolve}>{resolveLabel}</button>
        </div>
      </div>
    </Modal>
  );
}
