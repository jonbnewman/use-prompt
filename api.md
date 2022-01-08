---
layout: default
title: API Details
nav_order: 2
---

# usePrompt

React hook used to create a prompt, returning an `Array` containing:

- The prompt display/rendered output
- The render callback used to trigger/open the prompt
- Boolean flag indicating whether or not the prompt is visible or not

```javascript
import usePrompt from "use-prompt";
const [prompt, showPrompt, visible, clearPrompt] = usePrompt(
  options?: {
    persist?: boolean;
  }
): [RenderedPrompt, ShowPrompt, IsVisible, ClearPrompt]
```

## Parameters

- **options** `Object`

  - **persist**

    `false`: The prompt is completely added and removed from the DOM (default).

    `true`: The prompt will remain in the DOM always...letting you control how and when the prompts display is changed.

## Returns

- `RenderedPrompt` The rendered output. You should place this somewhere in the DOM.

  ```javascript
  type RenderedPrompt = ReactNode;
  ```

- `ShowPrompt` Callback used to trigger/show the prompt.

  ```javascript
  type ShowPrompt = (renderer: Renderer) => Promise<Response>;
  ```

  This takes a component or callback function as an argument and returns a promise as its result.

- `IsVisible` Boolean indicating whether or not the prompt is currently visible.

  ```javascript
  type IsVisible = boolean;
  ```

- `ClearPrompt` Callback which clears/resets the prompt.

  ```javascript
  type ClearPrompt = () => void;
  ```
