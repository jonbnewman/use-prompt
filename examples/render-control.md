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

<iframe src="https://codesandbox.io/embed/useprompt-render-control-kf3pf?autoresize=1&fontsize=13&hidenavigation=1&theme=light&view=editor&module=/src/App.js,/src/Prompt.js,/src/styles.css"
  style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
  title="usePrompt render control"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

As shown here, this prompt will animate smoothly in and out. This is possible because the component remains on the page after the user clicks `Ok`, this allows us to alter the props passed to the `div` and make it fade in and out using a class applied to its container and a small amount of CSS.
