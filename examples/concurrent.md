---
layout: default
title: Multiple concurrent prompts
nav_order: 4
parent: Examples
---

# Multiple concurrent prompts

Rendering multiple concurrent prompts is supported.

```javascript
import usePrompt from "use-prompt";

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
