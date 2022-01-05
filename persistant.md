---
layout: default
title: Persistant prompts
nav_order: 6
---

# Persistant prompts

You might want to use the `persist` option to more directly control hiding/displaying the prompt. Doing this will allow you to display and hide the prompt when/how you choose.

- `persist` is **not** `true` (the default)

  The prompt is completely added and removed from the DOM.

- `persist` is `true`

  The prompt will remain in the DOM always...letting you control if, how and when the prompts display is changed.

```javascript
import usePrompt from "use-prompt";

function Prompt({ resolve, message }) {
  return (
    <>
      <div>{message}</div>
      <button onClick={resolve}>Ok</button>
    </>
  );
}

function App() {
  const [prompt1, showPrompt1, visible1] = usePrompt({ persist: true });
  const [prompt2, showPrompt2, visible2] = usePrompt({ persist: true });
  const [prompt3, showPrompt3, visible3] = usePrompt({ persist: true });

  async function showPrompts() {
    await showPrompt1((props) => (
      <Prompt {...props} message="To him, she was rain" />
    ));
    await showPrompt2((props) => (
      <Prompt {...props} message="To her, she was sunshine" />
    ));
    await showPrompt3((props) => (
      <Prompt {...props} message="Together, they made rainbows" />
    ));
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

As shown here, each prompt will display one after the other and remain on screen after the user clicks the `Ok` button.
