import React from 'react';
import * as ReactDOM from 'react-dom';
import { StandardModalPrompt } from '../stories/Prompter.stories';

describe('Modal Prompt', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<StandardModalPrompt component="standard" />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
