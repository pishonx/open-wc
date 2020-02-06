/** @typedef {import('commonmark').Node} Node */
/** @typedef {import('./types').MarkdownResult} MarkdownResult */

const { default: generate } = require('@babel/generator');
const { HtmlRenderer } = require('./HtmlRenderer.js');

class MdJsRenderer extends HtmlRenderer {
  // constructor() {
  //   super();
  // }

  /**
   * @override
   * 
   * @param {MarkdownResult} mdJsData 
   */
  render(mdJsData) {
    const { stories, jsCode, mdAst } = mdJsData;
    const storiesJsCode = stories.map(story => story.codeString).join('\n');
    const storiesKeys = stories.map(story => story.key);

    const html = `
      <script type="module">
        import '/packages/mdjs/mdjs-story.js';
        ${jsCode}
        ${storiesJsCode}
        const stories = [${storiesKeys.join(',')}];
      </script>
      ${super.render(mdAst)}
    `;
    return html;
  }
}

// const templateStories = [${templateStories.join(',')}];
// templateStories.forEach((template, i) => {
//   render(template, document.getElementById(\`story-$\{i}\`));
// });
// const fnStories = [${fnStories.join(',')}];
// fnStories.forEach((templateFn, i) => {
//   render(templateFn(), document.getElementById(\`fn-story-$\{i}\`));
// });


module.exports = {
  MdJsRenderer,
};
