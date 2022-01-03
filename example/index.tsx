import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Prompter } from '../stories/Prompter';

const App = () => {
  return (
    <div>
      <Prompter component="mui" />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
