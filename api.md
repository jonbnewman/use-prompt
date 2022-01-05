---
layout: default
title: API Details
nav_order: 2
---

# API Details

```javascript
usePrompt(
  options?: {
    persist?: boolean;
  }
): [ReactNode, (renderer: Renderer) => Promise<Response>, boolean]
```

React hook used to create a prompt, returning an `Array` containing:

- The prompt display/rendered output
- The render callback used to trigger/open the prompt
- Boolean flag indicating whether or not the prompt is visible or not

```javascript
import usePrompt from "use-prompt";
const [prompt, showPrompt, visible] = usePrompt({ persist: true });
```

## Parameters

- **options** `Object`

  - **persist**

    `false`: The prompt is completely added and removed from the DOM (default).

    `true`: The prompt will remain in the DOM always...letting you control how and when the prompts display is changed.
