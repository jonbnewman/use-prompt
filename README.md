# use-prompt

![CI](https://github.com/jonbnewman/use-prompt/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/use-prompt/badge.svg?branch=main&r=1)](https://coveralls.io/github/jonbnewman/use-prompt?branch=main)

[![NPM Package](https://img.shields.io/npm/v/use-prompt.svg?logo=npm)](https://www.npmjs.com/package/use-prompt)
![Typescript](https://img.shields.io/badge/types-TypeScript-blue?logo=typescript)
![MIT License](https://img.shields.io/github/license/jonbnewman/use-prompt)

**use-prompt** is a library that lets you conveniently display a React component to a user asynchronously.

This allows you to ask a user for input, prompt for an answer, display a message, or do whatever you want in an asynchronous manner.

Features:

- Promise-based (async/await and try/catch capable).
- N-number of concurrent prompt support.
- Render anywhere you like.

---

## Installation

```bash
npm i use-prompt
```

```bash
yarn add use-prompt
```

## Basic example

```javascript
import usePrompt from 'use-prompt';

function App() {
  const [prompt, showPrompt, visible] = usePrompt();

  function showMyPrompt() {
    showPrompt(({ resolve }) => (
      <>
        <div>She sells seashells by the seashore.</div>
        <button onClick={resolve}>Ok thanks</button>
      </>
    ));
  }

  return (
    <div>
      <button onClick={showMyPrompt} disabled={visible}>
        Show prompt
      </button>
      {prompt}
    </div>
  );
}
```

### async/await and try/catch

This example demonstrates how to use async/await and try/catch in order to retrieve what their response within the prompt was.

```javascript
import { useState } from 'react';
import usePrompt from 'use-prompt';

function App() {
  const [prompt, showPrompt, visible] = usePrompt();
  const [cancelled, setCancelled] = useState(null);
  const [confirmed, setConfirmed] = useState(null);

  async function showMyPrompt() {
    try {
      const response = await showPrompt(({ resolve, reject }) => (
        <>
          <div>Are you sure?</div>
          <button onClick={() => reject('clicked cancel')}>Cancel</button>
          <button onClick={() => resolve('clicked yes')}>Yes</button>
        </>
      ));
      setConfirmed(true);
    } catch (reason) {
      setCancelled(reason);
    }
  }

  return (
    <>
      <button onClick={showMyPrompt} disabled={visible}>
        Show prompt
      </button>
      {prompt}
      {confirmed && `Prompt was confirmed: ${confirmed}`}
      {cancelled && `Prompt was cancelled: ${cancelled}`}
    </>
  );
}
```

## Multiple concurrent prompts

Rendering multiple prompts is supported.

Each new instance/use of usePrompt is separate from the rest.

```javascript
import usePrompt from 'use-prompt';

function Prompt({ resolve, message }) {
  return (
    <>
      <div>{message}</div>
      <button onClick={resolve}>Ok thanks</button>
    </>
  );
}

function App() {
  const [prompt1, showPrompt1, visible1] = usePrompt();
  const [prompt2, showPrompt2, visible2] = usePrompt();
  const [prompt3, showPrompt3, visible3] = usePrompt();

  function showPrompt1(showPrompt, message) {
    showPrompt((props) => <Prompt {...props} message="Prompt1" />);
  }
  function showPrompt2(showPrompt, message) {
    showPrompt((props) => <Prompt {...props} message="Prompt2" />);
  }
  function showPrompt3(showPrompt, message) {
    showPrompt((props) => <Prompt {...props} message="Prompt3" />);
  }

  return (
    <div>
      <button onClick={showPrompt1} disabled={visible1}>
        Show prompt 1
      </button>
      {prompt1}

      <button onClick={showPrompt2} disabled={visible2}>
        Show prompt 2
      </button>
      {prompt2}

      <button onClick={showPrompt3} disabled={visible3}>
        Show prompt 3
      </button>
      {prompt3}
    </div>
  );
}
```
