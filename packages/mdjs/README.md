# Markdown JavaScript Format

[//]: # 'AUTO INSERT HEADER PREPUBLISH'

## Format

The format is meant to allow using JavaScript with Markdown.
It does so by "annotating" JavaScript that should execute in Markdown.

````
```js script
// execute me
```
````

## Usage

```js
import { fs } from 'fs';
import { renderReadme } from '@mdjs/core';

const reader = new Parser();
const writer = new HtmlRenderer();
const md = fs.readFileSync('./demo.md', 'utf-8');
const parsed = reader.parse(md);

const result = writer.render(parsed);
fs.writeFileSync('./index.html', html, 'utf-8');
```

<script>
  export default {
    mounted() {
      const editLink = document.querySelector('.edit-link a');
      if (editLink) {
        const url = editLink.href;
        editLink.href = url.substr(0, url.indexOf('/master/')) + '/master/packages/mdjs/src/README.md';
      }
    }
  }
</script>
