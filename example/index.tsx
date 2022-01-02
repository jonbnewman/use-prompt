import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Prompt } from '../src/components/Prompt';

const App = () => {
  return (
    <div>
      <Prompt />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
