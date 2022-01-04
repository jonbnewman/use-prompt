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

  async function showMyPrompt() {
    const response = await showPrompt(({ resolve }) => (
      <div>
        <div>Hello</div>
        <div>
          <button onClick={resolve}>Yes</button>
        </div>
      </div>
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
