import React from 'react';
import * as ReactDOM from 'react-dom';
import { Default as Prompt } from '../stories/Prompt.stories';

describe('Prompt', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Prompt />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
