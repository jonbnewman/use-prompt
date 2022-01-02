import React, { MouseEvent, ReactNode, useEffect } from 'react';

import './style.css';

export interface PromptProps {
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

export default function Prompt(props: PromptProps) {
  const {
    visible,
    resolve,
    reject,
    escapable = true,
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
    <div
      className={`prompt-container${visible ? ' visible' : ''}`}
      onClick={reject}
    >
      <div className="prompt-dialog" onClick={stopEvent}>
        <div className="prompt-message">{message}</div>
        <div className="prompt-buttons">
          <button onClick={reject}>{rejectLabel}</button>
          <button onClick={resolve}>{resolveLabel}</button>
        </div>
      </div>
    </div>
  );
}
