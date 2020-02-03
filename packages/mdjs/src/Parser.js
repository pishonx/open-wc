import { parse as parseJs } from '@babel/parser';
import traverse from '@babel/traverse';
import { Parser as CmParser, Node, HtmlRenderer } from './commonmark/index.js';

export class Parser {
  constructor() {
    this.cmParser = new CmParser();
  }

  parse(source) {
    const mdAst = this.cmParser.parse(source);
    let jsCode = '';
    const stories = [];

    const walker = mdAst.walker();
    let event = walker.next();
    while (event) {
      const { node } = event;
      if (event.entering && node.type === 'code_block') {
        if (node.info === 'js script') {
          node.unlink();
          jsCode += node.literal;
        }
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
            // compatibilty
            code: storyAst.program.body, //   const { body: code } = ast.program;
            codeString: node.literal,
          });
          node.unlink();
        }
      }
      event = walker.next();
    }

    const jsAst = parseJs(jsCode, { sourceType: 'module' });
    // traverse(jsAst, {
    //   ImportDeclaration(path) {
    //     path.scope.rename(path.node.specifiers[0].local.name, 'IngInput');
    //     path.node.specifiers[0].imported.name = 'IngInput';
    //     path.node.source.value = 'ing-web/forms.js';
    //   }
    // });

    // const output = generate(jsAst, { /* options */ });
    // console.log(output);
    const foo = new HtmlRenderer();
    const html = foo.render(mdAst);

    return { jsCode, jsAst, mdAst, stories, html };
  }
}
