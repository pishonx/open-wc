```js script
import { html } from 'lit-html';
import '../demo-wc-card.js';

export default { title: 'My docs' };
```

# Heading 1

Foo

```js story
export const JsStory = () =>
  html`
    <demo-wc-card>JS Story</demo-wc-card>
  `;
```

```js story
export const JsStory2 = () =>
  html`
    <demo-wc-card>JS Story with preview</demo-wc-card>
  `;
```
