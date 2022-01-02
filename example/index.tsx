import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Prompter } from '../src/Prompter';

const App = () => {
  return (
    <div>
      <Prompter />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
