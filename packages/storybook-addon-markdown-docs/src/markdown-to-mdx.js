const { parseMarkdown } = require('./parse-markdown');
const { compileMdx } = require('./compile-mdx');

const { Parser } = require('../../mdjs/dist/Parser.js');

/**
 * @param {string} filePath
 * @param {string} markdown
 */
async function markdownToMdx(filePath, markdown) {
  const parser = new Parser();
  const markdownResult = parser.parse(markdown);
  // const markdownResult = await parseMarkdown(markdown);
  return compileMdx(filePath, markdownResult);
}

module.exports = { markdownToMdx };
