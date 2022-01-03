import React, { MouseEvent, ReactNode, useEffect } from 'react';

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
    type = 'modal',
    message = 'Are you sure?',
    resolveLabel = 'Confirm',
    rejectLabel = 'Cancel',
  } = props;

  useEffect(() => {
    function escapeCheck(event: KeyboardEvent) {
      if (escapable && event.key === 'Escape') {
        reject();
      }
    }
    document.addEventListener('keyup', escapeCheck);
    return () => document.removeEventListener('keyup', escapeCheck);
  }, [escapable, reject]);

  return (
    <div className={`${type} prompt-container${visible ? ' visible' : ''}`}>
      <div className="prompt-dialog" onClick={stopEvent}>
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
    </div>
  );
}
