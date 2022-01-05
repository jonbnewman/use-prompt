---
layout: default
title: Render control
nav_order: 6
parent: Examples
---

# Render control

You might want to use the `persist` option to more directly control hiding/displaying the prompt. Doing this will allow you to display and hide the prompt when and how you choose.

- **persist**

  `false`: The prompt is completely added and removed from the DOM (default).

  `true`: The prompt will remain in the DOM always...letting you control how and when the prompts display is changed.

```javascript
import usePrompt from "use-prompt";

function App() {
  const [prompt, showPrompt, visible] = usePrompt({ persist: true });

  async function showPrompts() {
    await showPrompt(({ resolve, visible }) => (
      <div
        style={{
          opacity: visible ? 1 : 0,
          visibility: visible ? "visible" : "hidden",
          transition: "all 0.3s ease",
        }}
      >
        <div>To him, she was rain</div>
        <button onClick={resolve}>Ok</button>
      </div>
    ));
  }

  return (
    <div>
      <button onClick={showPrompts} disabled={visible}>
        Show prompts
      </button>
      {prompt1}
      {prompt2}
      {prompt3}
    </div>
  );
}
```

As shown here, this prompt will animate smoothly in and out. This is possible because the component remains on the page after the user clicks `Ok`, this allows us to alter the props passed to the `div` and make it fade-out.
