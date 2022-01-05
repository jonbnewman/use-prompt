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

<iframe src="https://codesandbox.io/embed/useprompt-basic-example-kr18j?fontsize=14&hidenavigation=1&theme=dark"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="usePrompt Basic Example"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>
