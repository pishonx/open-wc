import { parse as parseJs } from '@babel/parser';
import traverse from '@babel/traverse';
import { Node } from './commonmark/index.js';

export function processStories(data) {
  const stories = [];

  const walker = data.mdAst.walker();
  let event = walker.next();
  while (event) {
    const { node } = event;
    if (event.entering && node.type === 'code_block') {
      if (node.info === 'js story') {
        const storyAst = parseJs(node.literal, { sourceType: 'module' });
        let key;
        let name;
        traverse(storyAst, {
          ExportNamedDeclaration(path) {
            key = path.node.declaration.declarations[0].id.name;
            // TODO: check if there is an override
            name = key;
          },
        });
        const htmlBlock = new Node('html_block');
        htmlBlock.literal = `<Story name="${name}"></Story>`;
        node.insertAfter(htmlBlock);

        stories.push({
          key,
          name,
          codeAst: storyAst,
          displayedCode: node.literal,
        });
        node.unlink();
      }
    }
    event = walker.next();
  }

  return { ...data, stories };
}
