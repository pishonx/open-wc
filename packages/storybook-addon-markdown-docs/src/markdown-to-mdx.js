const { parse } = require('@babel/parser');
const { compileMdx } = require('./compile-mdx');

const { Parser } = require('../../mdjs/dist/Parser.js');
const { HtmlRenderer } = require('../../mdjs/dist/HtmlRenderer.js');

/**
 * @param {string} filePath
 * @param {string} markdown
 */
async function markdownToMdx(filePath, markdown) {
  const parser = new Parser();
  const markdownResult = parser.parse(markdown);

  markdownResult.jsAst = parse(markdownResult.jsCode, { sourceType: 'module' });
  markdownResult.html = new HtmlRenderer().render(markdownResult.mdAst);

  return compileMdx(filePath, markdownResult);
}

module.exports = { markdownToMdx };
