---
layout: default
title: Sequential prompts
nav_order: 3
parent: Examples
---

# Sequential prompts

Rendering multiple sequential prompts is supported.

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
