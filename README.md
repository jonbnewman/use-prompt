# use-prompt

![CI](https://github.com/jonbnewman/use-prompt/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/use-prompt/badge.svg?branch=main&r=1)](https://coveralls.io/github/jonbnewman/use-prompt?branch=main)
[![Codacy Badge](https://app.codacy.com/project/badge/Grade/d3122dfe36f8442894cfc239be96d056)](https://www.codacy.com/gh/jonbnewman/use-prompt/dashboard?utm_source=github.com&utm_medium=referral&utm_content=jonbnewman/use-prompt&utm_campaign=Badge_Grade)

[![NPM Package](https://img.shields.io/npm/v/use-prompt.svg?logo=npm)](https://www.npmjs.com/package/use-prompt)
![Typescript](https://img.shields.io/badge/types-TypeScript-blue?logo=typescript)
![Package size](https://img.shields.io/bundlephobia/minzip/use-prompt)
![MIT License](https://img.shields.io/github/license/jonbnewman/use-prompt)

**use-prompt** is a [React Hook](https://reactjs.org/docs/hooks-intro.html) that lets you conveniently display a component to a user asynchronously.

This allows you to ask a user for input, prompt for an answer, display a message, or do whatever you want in an asynchronous manner.

Features:

- Use your own custom components
- Promise-based (async/await and try/catch capable)
- N-number of concurrent prompt support
- Render anywhere you like for each prompt
- Typescript support
- Minimalistic, easy to use API
- Very small bundle size

---

1. [API Details](https://useprompt.jonbnewman.dev/api)
1. [Typescript](https://useprompt.jonbnewman.dev/typescript)
1. [Examples](https://useprompt.jonbnewman.dev/examples)
   - [Basic example](https://useprompt.jonbnewman.dev/examples/basic-example)
   - [Async/await and try/catch](https://useprompt.jonbnewman.dev/examples/async)
   - [Multiple sequential prompts](https://useprompt.jonbnewman.dev/examples/sequential)
   - [Multiple concurrent prompts](https://useprompt.jonbnewman.dev/examples/concurrent)
   - [Persistant prompts](https://useprompt.jonbnewman.dev/examples/persistant)
   - [Render control](https://useprompt.jonbnewman.dev/examples/render-control)

---

## Installation

```bash
npm i use-prompt
```

```bash
yarn add use-prompt
```

## Basic example

The following demonstrates a very basic example use of `usePrompt`.

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

### Async/await and try/catch

This example demonstrates how to use async/await and try/catch in order to retrieve what the users response within the prompt was.

```javascript
import { useState } from 'react';
import usePrompt from 'use-prompt';

function App() {
  const [prompt, showPrompt, visible] = usePrompt();
  const [cancelReason, setCancelReason] = useState(null);
  const [confirmResponse, setConfirmResponse] = useState(null);

  async function showMyPrompt() {
    try {
      const response = await showPrompt(({ resolve, reject }) => (
        <>
          <div>Are you sure?</div>
          <button onClick={() => reject('clicked cancel')}>Cancel</button>
          <button onClick={() => resolve('clicked yes')}>Yes</button>
        </>
      ));
      setConfirmResponse(response);
    } catch (reason) {
      setCancelReason(reason);
    }
  }

  return (
    <>
      <button onClick={showMyPrompt} disabled={visible}>
        Show prompt
      </button>
      {prompt}
      {confirmResponse && `Prompt was confirmed: ${confirmResponse}`}
      {cancelReason && `Prompt was cancelled: ${cancelReason}`}
    </>
  );
}
```

## Sequential prompts

Rendering multiple sequential prompts is supported.

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

  async function showPrompts() {
    await showPrompt1((props) => <Prompt {...props} message="Prompt1" />);
    await showPrompt2((props) => <Prompt {...props} message="Prompt2" />);
    await showPrompt3((props) => <Prompt {...props} message="Prompt3" />);
  }

  return (
    <div>
      <button onClick={showPrompts} disabled={visible1 || visible2 || visible3}>
        Show prompts
      </button>
      {prompt1}
      {prompt2}
      {prompt3}
    </div>
  );
}
```

## Multiple concurrent prompts

Rendering multiple concurrent prompts is supported.

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

  function showPrompt1() {
    showPrompt1((props) => <Prompt {...props} message="Prompt1" />);
  }
  function showPrompt2() {
    showPrompt2((props) => <Prompt {...props} message="Prompt2" />);
  }
  function showPrompt3() {
    showPrompt3((props) => <Prompt {...props} message="Prompt3" />);
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

---

**[See the full docs](https://useprompt.jonbnewman.dev)**
