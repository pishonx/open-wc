```js script
import { html } from 'lit-html';
import '../demo-wc-card.js';

export default { title: 'My docs' };
```

# Heading 1

Foo is great

## Story

```js story
export const JsStory = () =>
  html`
    <demo-wc-card>JS Story</demo-wc-card>
  `;
```

## Story

with preview

```js preview-story
export const JsStory2 = () =>
  html`
    <demo-wc-card>JS Story with preview</demo-wc-card>
  `;
```
