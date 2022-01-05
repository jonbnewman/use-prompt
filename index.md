---
layout: default
title: Introduction
nav_order: 1
---

# use-prompt

**use-prompt** is a [React Hook](https://reactjs.org/docs/hooks-intro.html) that lets you conveniently display a component to a user asynchronously.

This allows you to ask a user for input, prompt for an answer, display a message, or do whatever you want in an asynchronous manner.

Features:

- Promise-based (async/await and try/catch capable)
- N-number of concurrent prompt support
- Render anywhere you like for each prompt
- Typescript support
- Minimalistic, easy to use API
- Very small bundle size

---

## Installation

```bash
npm i use-prompt
```

```bash
yarn add use-prompt
```

[Get started: **Basic example**](/examples/basic-example){: .btn .btn-blue }

---

1. [API Details](/api)
1. [Examples](/examples)
   - [Basic example](/examples/basic-example)
   - [Async/await and try/catch](/examples/async)
   - [Multiple sequential prompts](/examples/sequential)
   - [Multiple concurrent prompts](/examples/concurrent)
   - [Persistant prompts](/examples/persistant)
   - [Render control](/examples/render-control)
   - [Typescript example](/examples/typescript)

---

![CI](https://github.com/jonbnewman/use-prompt/actions/workflows/main.yml/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/jonbnewman/use-prompt/badge.svg?branch=main&r=1)](https://coveralls.io/github/jonbnewman/use-prompt?branch=main)

[![NPM Package](https://img.shields.io/npm/v/use-prompt.svg?logo=npm)](https://www.npmjs.com/package/use-prompt)
![Typescript](https://img.shields.io/badge/types-TypeScript-blue?logo=typescript)
![MIT License](https://img.shields.io/github/license/jonbnewman/use-prompt)
