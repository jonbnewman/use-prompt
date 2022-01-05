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

## Parameters

- **options** `Object`

  - `persist`

    **NOT** `true` (the default)

    The prompt is completely added and removed from the DOM.

    **IS** `true`

    The prompt will remain in the DOM always...letting you control if, how and when the prompts display is changed.
