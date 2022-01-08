---
layout: default
title: Persistant prompts
nav_order: 5
parent: Examples
---

# Persistant prompts

You might want to use the `persist` option to more directly control hiding/displaying the prompt. Doing this will allow you to display and hide the prompt when/how you choose.

- **persist**

  `false`: The prompt is completely added and removed from the DOM (default).

  `true`: The prompt will remain in the DOM always...letting you control how and when the prompts display is changed.

<iframe src="https://codesandbox.io/embed/useprompt-persistant-dd2wn?autoresize=1&fontsize=14&hidenavigation=1&theme=light&view=editor"
  style="width:100%; height:700px; border:0; border-radius: 4px; overflow:hidden;"
  title="usePrompt persistant"
  allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
  sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
></iframe>

As shown here, each prompt will display one after the other and remain on screen after the user clicks the `Ok` button.
