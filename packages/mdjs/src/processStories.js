/** @typedef {import('./types').MarkdownResult} MarkdownResult */

const { parse: parseJs } = require('@babel/parser');
const { default: traverse } = require('@babel/traverse');
const { Node } = require('commonmark');

function extractStoryData(codeString) {
  const codeAst = parseJs(codeString, { sourceType: 'module' });
  let key;
  let name;
  traverse(codeAst, {
    ExportNamedDeclaration(path) {
      key = path.node.declaration.declarations[0].id.name;
      // TODO: check if there is an override
      name = key;
    },
  });
  return { key, name, codeAst, codeString };
}

/**
 * @param {MarkdownResult} data
 * @returns {MarkdownResult}
 */
function processStories(data) {
  const stories = [];

  const walker = data.mdAst.walker();
  let event = walker.next();
  while (event) {
    const { node } = event;
    if (event.entering && node.type === 'code_block') {
      if (node.info === 'js story') {
        const storyData = extractStoryData(node.literal);
        const htmlBlock = new Node('html_block');
        htmlBlock.literal = `<Story name="${storyData.name}"></Story>`;
        node.insertAfter(htmlBlock);

        stories.push({
          ...storyData,
          displayedCode: node.literal,
        });
        node.unlink();
      }
      if (node.info === 'js preview-story') {
        const storyData = extractStoryData(node.literal);
        const htmlBlock = new Node('html_block');
        htmlBlock.literal = `<Preview><Story name="${storyData.name}"></Story></Preview>`;
        node.insertAfter(htmlBlock);

        stories.push({
          ...storyData,
          displayedCode: node.literal,
        });
        node.unlink();
      }
    }
    event = walker.next();
  }

  return { ...data, stories };
}

module.exports = {
  processStories,
};
