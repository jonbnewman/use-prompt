import React, { ReactNode } from 'react';
import { PromptProps } from '../../index';

import './style.css';

export interface InlinePromptProps extends PromptProps {
  message?: ReactNode;
  resolveLabel?: string;
  rejectLabel?: string;
}

export default ({ visible }: InlinePromptProps) => {
  return visible ? <div className="container">prompt</div> : null;
};
