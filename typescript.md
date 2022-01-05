---
layout: default
title: Typescript
nav_order: 3
---

# Typescript

This library is written using typescript and exports all of the relevant typings you might need.

Using typescript along with `usePrompt` is pretty straightforward, here is an example:

```javascript
import usePrompt, { RenderProps } from "use-prompt";

function Prompt({ resolve, reject, visible }: RenderProps) {
  return visible ? (
    <div>
      <div>Are you sure?</div>
      <div>
        <button onClick={resolve}>Resolve</button>
        <button onClick={reject}>Reject</button>
      </div>
    </div>
  ) : null;
}

function App() {
  const [prompt, setPrompt, visible] = usePrompt({ persist: true });

  function showPrompt() {
    setPrompt((props) => <Prompt {...props} />);
  }

  return (
    <div>
      <button onClick={showPrompt} disabled={visible}>
        Show prompt
      </button>
      {prompt}
    </div>
  );
}
```

The only real difference here (compared to plain JS) is the incorporation of the `RenderProps` type in the Prompt component.

This is the interface which defines the (`resolve`, `reject`, and `visible`) properties passed into the function. You can of course extend this and add your own props as you like:

```javascript
interface PromptProps extends RenderProps {
  someProp: boolean;
}

function Prompt(props: PromptProps) {
  /* ... */
}
```
