---
layout: default
title: Async/await and try/catch
nav_order: 2
parent: Examples
---

# Async/await and try/catch

This example demonstrates how to use async/await and try/catch in order to retrieve what the users response within the prompt was.

<iframe src="https://codesandbox.io/embed/async-useprompt-u50zi?fontsize=13&hidenavigation=1&theme=light&view=editor&module=/src/App.js,/src/styles.css"
  style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;"
  title="Async usePrompt"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

The essential piece to take from this is that the `showPrompt` callback returns a promise that represents the outcome of the prompt. You can either `resolve` or `reject` it and return the result to the caller as you might expect when using `try/catch`.

Note that you don't **have to** use `try/catch`, you can just always `resolve` from within your prompt and then only worry about the result returned from the promise.
