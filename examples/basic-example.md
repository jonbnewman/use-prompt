---
layout: default
title: Basic example
nav_order: 1
parent: Examples
---

# Basic example

The following demonstrates a very basic example use of `usePrompt`.

```javascript
import usePrompt from "use-prompt";

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
