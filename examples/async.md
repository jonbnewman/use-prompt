---
layout: default
title: Async/await and try/catch
nav_order: 2
parent: Examples
---

# Async/await and try/catch

This example demonstrates how to use async/await and try/catch in order to retrieve what the users response within the prompt was.

```javascript
import { useState } from "react";
import usePrompt from "use-prompt";

function App() {
  const [prompt, showPrompt, visible] = usePrompt();
  const [cancelReason, setCancelReason] = useState(null);
  const [confirmResponse, setConfirmResponse] = useState(null);

  async function showMyPrompt() {
    try {
      const response = await showPrompt(({ resolve, reject }) => (
        <>
          <div>Are you sure?</div>
          <button onClick={() => reject("clicked cancel")}>Cancel</button>
          <button onClick={() => resolve("clicked yes")}>Yes</button>
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
