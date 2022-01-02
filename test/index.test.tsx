import React from 'react';
import * as ReactDOM from 'react-dom';
import { ModalPrompt } from '../stories/Prompter.stories';

describe('Modal Prompt', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ModalPrompt />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
